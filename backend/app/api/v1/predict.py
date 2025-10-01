from fastapi import APIRouter

from app.models.schemas import PredictRequest, PredictResponse
from app.services.prediction import run_prediction


router = APIRouter()


@router.post("/", response_model=PredictResponse)
def predict(req: PredictRequest) -> PredictResponse:
    return run_prediction(req)

