from __future__ import annotations

import base64
import hashlib
import io
from datetime import datetime, timezone
from typing import List

from PIL import Image

from app.db.mongo import get_database
from app.models.schemas import PredictRequest, PredictResponse, RiskSummary


def _generate_image_id(image_bytes: bytes) -> str:
    return hashlib.sha256(image_bytes).hexdigest()[:16]


def _fake_model_infer(image: Image.Image) -> float:
    # Stub: returns a deterministic probability from image size
    width, height = image.size
    return min(0.99, ((width * height) % 100) / 100.0)


def run_prediction(req: PredictRequest) -> PredictResponse:
    db = get_database()

    if req.image_base64:
        image_bytes = base64.b64decode(req.image_base64)
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    else:
        # Create a blank image as placeholder
        image = Image.new("RGB", (512, 512), color=(128, 128, 128))
        buffer = io.BytesIO()
        image.save(buffer, format="PNG")
        image_bytes = buffer.getvalue()

    image_id = _generate_image_id(image_bytes)
    probability = _fake_model_infer(image)

    # Minimal summary buckets
    low = int((1 - probability) * 1000)
    med = int(probability * 600)
    high = int(probability * 400)

    summary = RiskSummary(
        image_id=image_id,
        timestamp=datetime.now(timezone.utc),
        low_count=low,
        medium_count=med,
        high_count=high,
        max_probability=probability,
    )

    # Persist to MongoDB (simple schemas)
    db["risk_summary"].insert_one(summary.model_dump())

    overlay_url = f"/api/risk_images/{image_id}"
    db["risk_images"].insert_one({
        "image_id": image_id,
        "overlay_url": overlay_url,
        "created_at": summary.timestamp,
    })

    return PredictResponse(
        image_id=image_id,
        risk_map_url=overlay_url,
        summary=summary,
        alerts=[],
    )

