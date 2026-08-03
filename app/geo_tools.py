import math
from datetime import datetime
from typing import Tuple, List

# 1. The Haversine Distance Calculator
def calculate_haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calculates the great-circle distance between two points 
    on the Earth's surface in kilometers.
    """
    R = 6371.0 # Radius of Earth in kilometers

    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)

    dlon = lon2_rad - lon1_rad
    dlat = lat2_rad - lat1_rad

    a = math.sin(dlat / 2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    distance = R * c
    return distance

# 2. The Time Parser
def get_hours_difference(time_str1: str, time_str2: str) -> float:
    """
    Safely parses ISO timestamps and returns the absolute difference in hours.
    """
    try:
        # Replaces the standard 'Z' with explicit UTC offset for safe parsing
        t1 = datetime.fromisoformat(time_str1.replace('Z', '+00:00'))
        t2 = datetime.fromisoformat(time_str2.replace('Z', '+00:00'))
        
        diff_seconds = abs((t1 - t2).total_seconds())
        return diff_seconds / 3600.0
    except Exception as e:
        # Fallback to prevent API crash if backend sends malformed time strings
        print(f"Time parsing error: {e}")
        return 0.0

# 3. The Main Agent Tool
def calculate_travel_feasibility(current_scan, historical_context) -> Tuple[int, List[str]]:
    score = 0
    reasons = []

    # If this is the note's first scan ever, there is no travel history to calculate
    if not historical_context.previousLatitude or not historical_context.previousTimestamp:
        return score, reasons

    # Calculate Distance (km) and Time (hours)
    distance_km = calculate_haversine_distance(
        current_scan.latitude, 
        current_scan.longitude, 
        historical_context.previousLatitude, 
        historical_context.previousLongitude
    )
    
    time_diff_hours = get_hours_difference(
        current_scan.timestamp, 
        historical_context.previousTimestamp
    )

    # 4. The Physics Engine
    if time_diff_hours > 0:
        speed_kmh = distance_km / time_diff_hours
        
        # Threshold: Commercial airliners fly at ~900 km/h. 
        # Anything over 1500 km/h is physically impossible.
        if speed_kmh > 1500:
            score += 40
            reasons.append(f"Impossible Travel Detected (Speed: {int(speed_kmh)} km/h)")
            
    elif time_diff_hours == 0 and distance_km > 0:
        # Edge Case: The exact same timestamp in two different locations (Teleportation / API Spam)
        score += 40
        reasons.append("Impossible Travel Detected (Concurrent location spoofing)")

    return score, reasons