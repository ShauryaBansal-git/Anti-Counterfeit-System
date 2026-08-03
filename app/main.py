from fastapi import FastAPI
from app.schemas import ArbiterRequest, ArbiterResponse

# 1. Initialize the FastAPI app
app = FastAPI(title="ARBITER Detection Engine")

# 2. Global Import: Only load the lightweight hardware tools at startup
from app.hardware_tools import check_hardware_anomalies

@app.post("/api/evaluate", response_model=ArbiterResponse)
async def evaluate_note(payload: ArbiterRequest):
    base_score = 0
    all_reasons = []
    
    # STEP 1: The Lightweight Hardware Check
    hw_score, hw_reasons = check_hardware_anomalies(payload.blockchainStatus)
    base_score += hw_score
    all_reasons.extend(hw_reasons)
    
    # THE EARLY EXIT (Guard Clause)
    if base_score >= 100:
        return ArbiterResponse(
            currencyId=payload.currencyId,
            riskScore=100,
            status="COUNTERFEIT",
            flaggedReasons=all_reasons,
            actionRequired="Seize note and alert authorities"
        )

    # ==========================================
    # STEP 2: Lazy Load the Heavy Modules 
    # (Only runs if the hardware check passes)
    # ==========================================
    from app.geo_tools import calculate_travel_feasibility
    from app.behavior_tools import evaluate_behavior
    from app.vector_math import calculate_synergy_multiplier
    
    # Execute Geography Check
    tvl_score, tvl_reasons = calculate_travel_feasibility(payload.currentScan, payload.historicalContext)
    base_score += tvl_score
    all_reasons.extend(tvl_reasons)
    
    # Execute Behavioral Check
    beh_score, beh_reasons = evaluate_behavior(payload.historicalContext, payload.currentScan)
    base_score += beh_score
    all_reasons.extend(beh_reasons)
    
    # Calculate Synergistic Multiplier
    multiplier = calculate_synergy_multiplier(all_reasons)
    final_score = int(base_score * multiplier)
    
    # Clip Score at 100
    final_score = min(final_score, 100)
    
    # Determine Final Status Bracket
    if final_score < 30:
        status = "NORMAL"
    elif final_score < 60:
        status = "WATCH"
    elif final_score < 100:
        status = "SUSPICIOUS"
    else:
        status = "COUNTERFEIT"
        
    return ArbiterResponse(
        currencyId=payload.currencyId,
        riskScore=final_score,
        status=status,
        flaggedReasons=all_reasons,
        actionRequired="Log transaction" if status == "NORMAL" else "Prompt manual verification"
    )