"""
Forces safe dummy settings before any `app.*` module is imported, so the test suite
never accidentally touches the real Neon database or its JWT secret. Must run before
`app.config.get_settings()` is first called anywhere (it's `lru_cache`d).
"""

import os

os.environ["DATABASE_URL"] = "postgresql://test:test@localhost/dentrix_test_placeholder"
os.environ["JWT_SECRET"] = "pytest-only-secret-never-used-in-production-32bytes+"
os.environ["ENV"] = "test"
