"""
Application configuration using Pydantic v2 Settings.
Reads from .env file automatically.
"""
from pydantic_settings import BaseSettings
from pydantic import ConfigDict
from functools import lru_cache


class Settings(BaseSettings):
    model_config = ConfigDict(env_file=".env", extra="ignore")
    
    # App
    app_name: str = "Newton Raja Portfolio API"
    app_version: str = "1.0.0"
    environment: str = "development"

    # Database
    database_url: str = "sqlite:///./portfolio.db"  # SQLite fallback for local dev

    # Security
    secret_key: str = "change-me-in-production"

    # CORS
    frontend_origins: str = "http://localhost:3000"

    @property
    def allowed_origins(self) -> list[str]:
        return [o.strip() for o in self.frontend_origins.split(",")]

    @property
    def is_production(self) -> bool:
        return self.environment.lower() == "production"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
