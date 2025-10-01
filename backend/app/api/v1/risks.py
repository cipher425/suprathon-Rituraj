from typing import Any

from fastapi import APIRouter

from app.db.mongo import get_database


router = APIRouter()


@router.get("/summary")
def list_summaries() -> dict[str, Any]:
    db = get_database()
    items = list(db["risk_summary"].find({}, {"_id": 0}).sort("timestamp", -1).limit(100))
    return {"summaries": items}


@router.get("/images/{image_id}")
def get_image_overlay(image_id: str) -> dict[str, Any]:
    db = get_database()
    item = db["risk_images"].find_one({"image_id": image_id}, {"_id": 0})
    return item or {}

