from datetime import datetime, timezone
from typing import Any

from fastapi import APIRouter, UploadFile, File, Form

from app.db.mongo import get_database


router = APIRouter()


@router.post("/image")
async def upload_image(
    file: UploadFile = File(...),
    site_id: str = Form(default="unknown"),
) -> dict[str, Any]:
    db = get_database()
    contents = await file.read()
    doc = {
        "filename": file.filename,
        "site_id": site_id,
        "size_bytes": len(contents),
        "uploaded_at": datetime.now(timezone.utc),
    }
    res = db["raw_images"].insert_one(doc)
    return {"id": str(res.inserted_id), "filename": file.filename}

