from datetime import datetime
from typing import Tuple, List
from app.schemas import CurrentScan, HistoricalContext

# 1. Device Trust & Circulation Checks
def evaluate_device_trust(history: HistoricalContext) -> Tuple[int, List[str]]:
    """
    Evaluates how the hardware scanning the note is behaving, 
    and checks the historical ledger attributes of the note itself.
    """
    score = 0
    reasons = []
    
    # Bulk-testing by a single device
    if history.scansByDeviceToday > 150:
        score += 30
        reasons.append("Suspicious Device Velocity")
        
    # Impatient user or glitchy hardware (often synergistic with laundering)
    if history.scansInLast5Min >= 5:
        score += 20
        reasons.append("Too Many Scans in 5 Min")
        
    # Systemic risk from the backend database
    if history.isHighRiskBatch:
        score += 20
        reasons.append("High-Risk Batch Watchlist")
        
    # Checking for old notes suddenly hitting high-frequency circulation
    if history.monthsSinceIssue > 60 and history.scansByDeviceToday > 10:
        score += 35
        reasons.append("Dormant Note Resurrection")
        
    return score, reasons

# 2. Regional & Spatial Risk
def assess_regional_risk(lat: float, lon: float) -> Tuple[int, List[str]]:
    """
    Checks if the scan falls within a known high-risk geographic bounding box.
    """
    # Defining a high-risk bounding box (e.g., coordinates roughly spanning an industrial/commercial sector)
    # Latitude: 26.40 to 26.50, Longitude: 80.30 to 80.40
    min_lat, max_lat = 26.40, 26.50
    min_lon, max_lon = 80.30, 80.40

    if min_lat <= lat <= max_lat and min_lon <= lon <= max_lon:
        return 25, ["Suspicious Activity Area"]
    
    return 0, []

# 3. Temporal Anomalies
def check_dead_hours(timestamp_str: str) -> Tuple[int, List[str]]:
    """
    Flags transactions occurring during statistically dead hours for cash exchanges.
    """
    try:
        # Parse ISO string safely
        scan_time = datetime.fromisoformat(timestamp_str.replace('Z', '+00:00'))
        
        # Assuming operations primarily in IST, dead hours (2 AM to 5 AM IST)
        # translates to roughly 20:30 to 23:30 UTC. 
        # Using a simplified UTC hour check for the prototype:
        if 20 <= scan_time.hour <= 23:
            return 15, ["Dead-Hour Scanning"]
            
    except Exception as e:
        print(f"Dead-hour parsing error: {e}")
    
    return 0, []

# 4. The Main Tool Wrapper
def evaluate_behavior(history: HistoricalContext, current: CurrentScan) -> Tuple[int, List[str]]:
    """
    Executes all behavioral checks and aggregates the baseline score and flags.
    This output is what gets sent to vector_math.py for synergy calculation.
    """
    total_score = 0
    all_reasons = []

    # Run Device Check
    trust_score, trust_reasons = evaluate_device_trust(history)
    total_score += trust_score
    all_reasons.extend(trust_reasons)

    # Run Regional Check
    regional_score, regional_reasons = assess_regional_risk(current.latitude, current.longitude)
    total_score += regional_score
    all_reasons.extend(regional_reasons)

    # Run Time Check
    time_score, time_reasons = check_dead_hours(current.timestamp)
    total_score += time_score
    all_reasons.extend(time_reasons)

    return total_score, all_reasons