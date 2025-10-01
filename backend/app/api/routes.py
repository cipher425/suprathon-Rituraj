from fastapi import APIRouter

from app.api.v1 import ingestion, predict, risks, health


api_router = APIRouter()
api_router.include_router(health.router, prefix="/health", tags=["health"]) 
api_router.include_router(predict.router, prefix="/predict", tags=["predict"]) 
api_router.include_router(ingestion.router, prefix="/ingest", tags=["ingestion"]) 
api_router.include_router(risks.router, prefix="/risks", tags=["risks"]) 

