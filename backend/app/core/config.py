from functools import lru_cache
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    MONGODB_URI: str = "mongodb://mongo:27017"
    MONGODB_DB: str = "rockfall"

    CORS_ALLOW_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost",
    ]

    ALERT_SMS_ENABLED: bool = False
    ALERT_EMAIL_ENABLED: bool = False
    ALERT_RISK_THRESHOLD: float = 0.8

    # Optional external services
    TWILIO_ACCOUNT_SID: str | None = None
    TWILIO_AUTH_TOKEN: str | None = None
    TWILIO_FROM_NUMBER: str | None = None

    SENDGRID_API_KEY: str | None = None
    SENDGRID_FROM_EMAIL: str | None = None

    class Config:
        env_file = ".env"


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()


settings = get_settings()

