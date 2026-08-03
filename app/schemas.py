from pydantic import BaseModel, Field
from typing import List, Optional

class CurrentScan(BaseModel):
    latitude: float
    longitude: float
    timestamp: str
    deviceId: str

class HistoricalContext(BaseModel):
    # Setting safe defaults so the API doesn't crash if backend omits them
    previousLatitude: Optional[float] = None
    previousLongitude: Optional[float] = None
    previousTimestamp: Optional[str] = None
    scansInLast5Min: int = Field(default=0)
    scansByDeviceToday: int = Field(default=0)
    isHighRiskBatch: bool = Field(default=False)
    monthsSinceIssue: int = Field(default=0)

class BlockchainStatus(BaseModel):
    nfcSignatureValid: bool = Field(default=True)
    isAlreadyFlagged: bool = Field(default=False)

class ArbiterRequest(BaseModel):
    currencyId: str
    currentScan: CurrentScan
    historicalContext: HistoricalContext
    blockchainStatus: BlockchainStatus

class ArbiterResponse(BaseModel):
    currencyId: str
    riskScore: int
    status: str
    flaggedReasons: List[str]
    actionRequired: str