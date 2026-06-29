"""
Pydantic v2 schemas for request/response validation.
"""
from datetime import datetime
from pydantic import BaseModel, EmailStr, field_validator, ConfigDict


class ContactCreate(BaseModel):
    """Schema for incoming contact form submission."""
    name: str
    email: EmailStr
    subject: str
    message: str

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 2:
            raise ValueError("Name must be at least 2 characters")
        if len(v) > 100:
            raise ValueError("Name must be under 100 characters")
        return v

    @field_validator("subject")
    @classmethod
    def validate_subject(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 3:
            raise ValueError("Subject must be at least 3 characters")
        if len(v) > 200:
            raise ValueError("Subject must be under 200 characters")
        return v

    @field_validator("message")
    @classmethod
    def validate_message(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 10:
            raise ValueError("Message must be at least 10 characters")
        if len(v) > 5000:
            raise ValueError("Message must be under 5000 characters")
        return v


class ContactResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    """Schema for returning saved contact message details."""
    id: int
    name: str
    email: EmailStr
    subject: str
    message: str
    is_read: bool
    created_at: datetime


class SuccessResponse(BaseModel):
    success: bool
    message: str
