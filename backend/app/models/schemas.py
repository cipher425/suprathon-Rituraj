from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class SensorData(BaseModel):
    displacement_mm: Optional[float] = None
    strain_micro: Optional[float] = None
    pore_pressure_kpa: Optional[float] = None
    vibration_mm_s: Optional[float] = None


class WeatherData(BaseModel):
    rainfall_mm: Optional[float] = None
    temperature_c: Optional[float] = None


class PredictRequest(BaseModel):
    image_base64: Optional[str] = None
    dem_url: Optional[str] = None
    sensor: Optional[SensorData] = None
    weather: Optional[WeatherData] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)


class RiskSummary(BaseModel):
    image_id: str
    timestamp: datetime
    low_count: int
    medium_count: int
    high_count: int
    max_probability: float


class PredictResponse(BaseModel):
    image_id: str
    risk_map_url: Optional[str] = None
    summary: RiskSummary
    alerts: List[str] = Field(default_factory=list)

