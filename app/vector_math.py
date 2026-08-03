import numpy as np
from typing import List

def calculate_synergy_multiplier(triggered_reasons: List[str]) -> float:
    """
    Calculates a threat multiplier based on the cosine similarity 
    between the current scan's anomaly vector and known fraud typologies.
    """
    if not triggered_reasons:
        return 1.0
        
    # 1. The Master Vector Dictionary (All possible non-hardware triggers)
    # Hardware triggers are excluded since they already trigger an Early Exit.
    master_flags = [
        "Impossible Travel Detected",
        "Too Many Scans in 5 Min",
        "Suspicious Device Velocity",
        "Suspicious Activity Area",
        "Dead-Hour Scanning",
        "High-Risk Batch Watchlist",
        "Dormant Note Resurrection"
    ]
    
    # 2. Vectorize the Current Scan (One-Hot Encoding)
    # Creates an array like [0, 1, 1, 0, 0, 0, 0]
    current_vector = np.array([1 if any(flag in reason for reason in triggered_reasons) else 0 for flag in master_flags])
    
    # 3. Define Known Fraud Typology Vectors
    # "The Localized Laundering Ring": Spamming scans in a suspicious area at weird hours
    laundering_vector = np.array([0, 1, 0, 1, 1, 0, 0])
    
    # "The Bulk Tester": High device velocity on a high-risk batch
    bulk_tester_vector = np.array([0, 0, 1, 0, 0, 1, 0])
    
    # "The Teleporter": Impossible travel combined with rapid scanning
    teleporter_vector = np.array([1, 1, 0, 0, 0, 0, 0])
    
    fraud_typologies = {
        "Laundering Ring": laundering_vector,
        "Bulk Tester": bulk_tester_vector,
        "Teleporter": teleporter_vector
    }
    
    highest_similarity = 0.0
    
    # 4. Calculate Cosine Similarity against all known profiles
    norm_a = np.linalg.norm(current_vector)
    
    # Prevent ZeroDivisionError if a vector has 0 magnitude
    if norm_a == 0:
        return 1.0
        
    for name, typology_vector in fraud_typologies.items():
        norm_b = np.linalg.norm(typology_vector)
        
        if norm_b == 0:
            continue
            
        # Compute dot product and cosine similarity
        dot_product = np.dot(current_vector, typology_vector)
        similarity = dot_product / (norm_a * norm_b)
        
        if similarity > highest_similarity:
            highest_similarity = similarity

    # 5. Apply Synergistic Multipliers Based on the Highest Match
    # A similarity of 1.0 means a perfect match to a known fraud vector.
    if highest_similarity >= 0.8:
        return 1.4  # Critical match: 40% penalty increase
    elif highest_similarity >= 0.5:
        return 1.2  # Partial match: 20% penalty increase
    elif highest_similarity > 0.0:
        # Very weak match or random glitch: actually reduce the penalty to prevent false positives
        return 0.9 
        
    return 1.0