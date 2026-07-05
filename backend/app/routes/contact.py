"""
Contact form router — POST /api/contact
GET  /api/contact  (admin listing, paginated)
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import ContactMessage
from ..schemas import ContactCreate, ContactResponse, SuccessResponse

router = APIRouter(prefix="/contact", tags=["contact"])


@router.post(
    "",
    response_model=SuccessResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit a contact form message",
)
async def submit_contact(payload: ContactCreate, db: Session = Depends(get_db)):
    """
    Accept a message from the portfolio contact form and persist it.
    Returns a success confirmation — no sensitive data echoed back.
    """
    msg = ContactMessage(
        name=payload.name,
        email=str(payload.email),
        subject=payload.subject,
        message=payload.message,
    )
    db.add(msg)
    db.commit()
    db.refresh(msg)

    return SuccessResponse(
        success=True,
        message="Thank you! Your message has been received. I'll reply soon.",
    )


@router.get(
    "",
    response_model=List[ContactResponse],
    summary="List contact messages (admin)",
)
async def list_contacts(
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db),
):
    """
    Returns paginated contact messages, newest first.
    In production this endpoint should be protected by authentication.
    """
    if limit > 100:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Limit cannot exceed 100",
        )
    messages = (
        db.query(ContactMessage)
        .order_by(ContactMessage.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
    return messages
