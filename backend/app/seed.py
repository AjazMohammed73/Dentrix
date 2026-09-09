"""Create the bootstrap Super Admin from env vars. Idempotent.

Run once after migrations:  python -m app.seed
"""

from sqlalchemy import func, select

from .config import get_settings
from .db import SessionLocal
from .models import FULL_PERMISSIONS, User
from .security import hash_password


def main() -> None:
    settings = get_settings()
    email = (settings.bootstrap_superadmin_email or "").strip().lower()
    password = settings.bootstrap_superadmin_password or ""
    if not email or not password:
        raise SystemExit(
            "Set BOOTSTRAP_SUPERADMIN_EMAIL and BOOTSTRAP_SUPERADMIN_PASSWORD in the environment."
        )

    with SessionLocal() as db:
        existing = db.scalar(select(User).where(func.lower(User.email) == email))
        if existing is not None:
            print(f"User {email} already exists (role={existing.role}). Nothing to do.")
            return

        user = User(
            tenant_id=None,
            name=settings.bootstrap_superadmin_name,
            email=email,
            role="SUPER_ADMIN",
            title="Platform Administrator",
            password_hash=hash_password(password),
            permissions=dict(FULL_PERMISSIONS),
            status="active",
        )
        db.add(user)
        db.commit()
        print(f"Created SUPER_ADMIN {email}")


if __name__ == "__main__":
    main()
