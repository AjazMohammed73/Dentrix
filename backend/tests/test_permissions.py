"""Unit tests for the pure authorization logic — no database needed. These guard the
exact privilege-escalation and tenant-isolation rules added/changed this project
(password reset locked to Super Admin, audit logs restricted, permission grants
capped at what the caller already holds)."""

import uuid

import pytest
from sqlalchemy import select

from app.dependencies import require_permission, require_super_admin, scoped
from app.models import User
from app.routers.users import _sanitize_permissions
from fastapi import HTTPException


def make_user(role: str, permissions: dict | None = None, tenant_id=None) -> User:
    u = User()
    u.role = role
    u.permissions = permissions or {}
    u.tenant_id = tenant_id
    return u


# --- require_permission / require_super_admin -------------------------------------

def test_require_permission_allows_super_admin_without_the_flag():
    checker = require_permission("canManageStaff")
    user = make_user("SUPER_ADMIN", permissions={})
    assert checker(user) is user


def test_require_permission_allows_doctor_admin_without_the_flag():
    checker = require_permission("canManageStaff")
    user = make_user("DOCTOR_ADMIN", permissions={})
    assert checker(user) is user


def test_require_permission_denies_staff_without_the_flag():
    checker = require_permission("canManageStaff")
    user = make_user("STAFF", permissions={"canManageStaff": False})
    with pytest.raises(HTTPException) as exc_info:
        checker(user)
    assert exc_info.value.status_code == 403


def test_require_permission_allows_staff_with_the_flag():
    checker = require_permission("canManageStaff")
    user = make_user("STAFF", permissions={"canManageStaff": True})
    assert checker(user) is user


def test_require_super_admin_denies_doctor_admin():
    with pytest.raises(HTTPException) as exc_info:
        require_super_admin(make_user("DOCTOR_ADMIN"))
    assert exc_info.value.status_code == 403


def test_require_super_admin_allows_super_admin():
    user = make_user("SUPER_ADMIN")
    assert require_super_admin(user) is user


# --- scoped() tenant isolation ------------------------------------------------------

def test_scoped_constrains_non_super_admin_to_own_tenant():
    tenant_id = uuid.uuid4()
    user = make_user("STAFF", tenant_id=tenant_id)
    stmt = scoped(select(User), User.tenant_id, user)
    compiled = str(stmt.compile(compile_kwargs={"literal_binds": False}))
    assert "WHERE" in compiled


def test_scoped_does_not_constrain_super_admin():
    user = make_user("SUPER_ADMIN", tenant_id=None)
    stmt = scoped(select(User), User.tenant_id, user)
    compiled = str(stmt.compile(compile_kwargs={"literal_binds": False}))
    assert "WHERE" not in compiled


# --- _sanitize_permissions: caller can't grant a permission they don't hold ---------

def test_sanitize_permissions_admin_caller_can_grant_anything():
    admin = make_user("DOCTOR_ADMIN", permissions={})
    result = _sanitize_permissions({"canManageStaff": True, "canViewRevenue": True}, admin)
    assert result == {"canManageStaff": True, "canViewRevenue": True}


def test_sanitize_permissions_staff_caller_cannot_grant_permission_they_lack():
    # A staff member who does NOT hold canManageStaff must not be able to grant it
    # to someone else, even by explicitly requesting it — privilege escalation block.
    staff = make_user("STAFF", permissions={"canManageStaff": False, "canViewRevenue": True})
    result = _sanitize_permissions({"canManageStaff": True, "canViewRevenue": True}, staff)
    assert result["canManageStaff"] is False
    assert result["canViewRevenue"] is True


def test_sanitize_permissions_drops_unknown_keys():
    admin = make_user("DOCTOR_ADMIN", permissions={})
    result = _sanitize_permissions({"canManageStaff": True, "isSuperUser": True}, admin)
    assert "isSuperUser" not in result
