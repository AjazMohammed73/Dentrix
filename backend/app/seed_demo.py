"""Optional demo data: one clinic + staff + services + patients + appointments.

Run:  python -m app.seed_demo     (no-op if the demo clinic already exists)
"""

from datetime import date, timedelta

from sqlalchemy import select

from .billing import build_appointment_invoice
from .database import SessionLocal
from .models import (
    DEFAULT_STAFF_PERMISSIONS,
    FULL_PERMISSIONS,
    Appointment,
    Patient,
    Service,
    Tenant,
    User,
)
from .security import hash_password

SLUG = "apex-dental"
PW = "Password123!"

_SERVICES = [
    ("D0120", "Periodic Oral Evaluation", "Preventive", 30, 500),
    ("D1110", "Prophylaxis (Adult Cleaning)", "Preventive", 45, 1200),
    ("D2391", "Resin Composite - 1 Surface (Posterior)", "Restorative", 60, 2000),
    ("D2740", "Porcelain/Ceramic Crown", "Restorative", 90, 8500),
    ("D3330", "Molar Endodontic Therapy (Root Canal)", "Endodontics", 90, 6500),
    ("D7140", "Extraction of Erupted Tooth", "Oral Surgery", 45, 1500),
    ("D4341", "Periodontal Scaling & Root Planing", "Periodontics", 60, 3000),
    ("D8080", "Comprehensive Orthodontic Consultation", "Orthodontics", 45, 2500),
]


def main() -> None:
    with SessionLocal() as db:
        if db.scalar(select(Tenant).where(Tenant.slug == SLUG)):
            print("Demo clinic already exists; nothing to do.")
            return

        tenant = Tenant(
            name="Apex Dental Studio",
            slug=SLUG,
            address="742 Evergreen Terrace, Austin, TX",
            phone="(512) 555-0198",
            email="contact@apexdental.com",
            status="active",
            doctor_admin_name="Dr. Sarah Vance, DDS",
            doctor_admin_email="dr.vance@apexdental.com",
            plan="Professional",
            subscription={
                "plan": "Professional",
                "status": "Active",
                "billingCycle": "Monthly",
                "monthlyFee": 15999,
                "chairLimit": 6,
                "renewalDate": (date.today() + timedelta(days=30)).isoformat(),
                "autoRenew": True,
            },
        )
        db.add(tenant)
        db.flush()

        doctor = User(
            tenant_id=tenant.id,
            name="Dr. Sarah Vance, DDS",
            email="dr.vance@apexdental.com",
            role="DOCTOR_ADMIN",
            title="Lead Dental Surgeon & Clinic Owner",
            password_hash=hash_password(PW),
            permissions=dict(FULL_PERMISSIONS),
            status="active",
        )
        receptionist = User(
            tenant_id=tenant.id,
            name="Emma Robinson",
            email="emma.reception@apexdental.com",
            role="STAFF",
            title="Lead Front Desk Coordinator",
            password_hash=hash_password(PW),
            permissions=dict(DEFAULT_STAFF_PERMISSIONS),
            status="active",
        )
        db.add_all([doctor, receptionist])
        db.flush()

        services = [
            Service(
                tenant_id=tenant.id,
                code=code,
                name=name,
                category=category,
                duration_minutes=duration,
                base_price=price,
                description="",
                is_active=True,
            )
            for code, name, category, duration, price in _SERVICES
        ]
        db.add_all(services)
        db.flush()

        patients = [
            Patient(
                tenant_id=tenant.id,
                first_name="Eleanor",
                last_name="Rigby",
                email="eleanor.rigby@example.com",
                phone="(512) 839-4412",
                date_of_birth=date(1988, 6, 14),
                gender="Female",
                address="4502 South Congress Ave, Austin, TX",
                insurance={"provider": "Delta Dental Premier", "policyNumber": "DEL-8839210", "groupNumber": "GRP-9901"},
                emergency_contact={"name": "Thomas Rigby", "phone": "(512) 839-4413", "relationship": "Spouse"},
                medical_alerts=["Penicillin Allergy"],
                balance=0,
                status="Active",
            ),
            Patient(
                tenant_id=tenant.id,
                first_name="David",
                last_name="Holloway",
                email="dholloway@example.com",
                phone="(512) 991-3044",
                date_of_birth=date(1976, 11, 23),
                gender="Male",
                address="1802 Barton Springs Rd, Austin, TX",
                insurance={"provider": "MetLife Dental", "policyNumber": "MET-4410294", "groupNumber": "TECH-400"},
                emergency_contact={"name": "Sarah Holloway", "phone": "(512) 991-3045", "relationship": "Wife"},
                medical_alerts=["Hypertension"],
                balance=0,
                status="Active",
            ),
            Patient(
                tenant_id=tenant.id,
                first_name="Chloe",
                last_name="Kowalski",
                email="chloe.k@example.com",
                phone="(512) 420-9118",
                date_of_birth=date(1995, 3, 8),
                gender="Female",
                address="908 East 6th Street, Austin, TX",
                insurance={"provider": "Cigna Dental", "policyNumber": "CIG-1002934", "groupNumber": "CIG-882"},
                emergency_contact={"name": "Jan Kowalski", "phone": "(512) 420-9119", "relationship": "Father"},
                medical_alerts=[],
                balance=0,
                status="Active",
            ),
        ]
        db.add_all(patients)
        db.flush()

        appts = [
            Appointment(
                tenant_id=tenant.id,
                patient_id=patients[0].id,
                patient_name="Eleanor Rigby",
                patient_phone=patients[0].phone,
                doctor_id=doctor.id,
                doctor_name=doctor.name,
                service_id=services[1].id,
                service_name=services[1].name,
                procedure_code=services[1].code,
                date=date.today(),
                start_time="09:00",
                end_time="09:45",
                duration_minutes=45,
                operatory_chair="Chair 1 - Hygiene",
                status="Scheduled",
                notes="Routine cleaning.",
                fee=services[1].base_price,
            ),
            Appointment(
                tenant_id=tenant.id,
                patient_id=patients[1].id,
                patient_name="David Holloway",
                patient_phone=patients[1].phone,
                doctor_id=doctor.id,
                doctor_name=doctor.name,
                service_id=services[2].id,
                service_name=services[2].name,
                procedure_code=services[2].code,
                date=date.today(),
                start_time="10:00",
                end_time="11:00",
                duration_minutes=60,
                operatory_chair="Chair 2 - Surgery",
                status="Scheduled",
                notes="Composite restoration on tooth #19.",
                fee=services[2].base_price,
            ),
        ]
        db.add_all(appts)
        db.flush()

        by_id = {p.id: p for p in patients}
        for appt in appts:
            db.add(build_appointment_invoice(db, appt))
            db.flush()  # so the next invoice number sees this one
            by_id[appt.patient_id].balance += appt.fee

        db.commit()
        print(
            f"Seeded '{tenant.name}'.\n"
            f"  Doctor Admin : dr.vance@apexdental.com / {PW}\n"
            f"  Receptionist : emma.reception@apexdental.com / {PW}"
        )


if __name__ == "__main__":
    main()
