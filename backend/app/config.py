from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )

    database_url: str
    jwt_secret: str
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    refresh_token_expire_days: int = 30
    cors_origins: str = ""
    env: str = "development"

    bootstrap_superadmin_email: str | None = None
    bootstrap_superadmin_password: str | None = None
    bootstrap_superadmin_name: str = "Platform Admin"

    # Audit-log retention (see app/retention.py — run on a schedule, not in-process).
    audit_retention_days: int = 90
    audit_archive_dir: str = "audit_archive"
    audit_archive_s3_bucket: str | None = None
    audit_archive_s3_endpoint: str | None = None  # set for Cloudflare R2 / non-AWS S3

    @property
    def sqlalchemy_url(self) -> str:
        """SQLAlchemy wants the psycopg3 dialect prefix; Neon hands out plain postgresql://."""
        url = self.database_url
        if url.startswith("postgresql://"):
            url = "postgresql+psycopg://" + url[len("postgresql://") :]
        return url

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()  # type: ignore[call-arg]
