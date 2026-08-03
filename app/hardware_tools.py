from typing import Tuple, List
from app.schemas import BlockchainStatus

def check_hardware_anomalies(blockchain_data: BlockchainStatus) -> Tuple[int, List[str]]:
    """
    Evaluates hardware-level cryptographic signals and ledger records.
    Returns a score tuple: (penalty_score, list_of_reasons).
    
    If the NFC signature is invalid, it assigns an immediate +100 score,
    which triggers the Early Exit in main.py.
    """
    score = 0
    reasons = []

    # 1. Cryptographic Hardware Signature Check (Insta-Kill)
    if not blockchain_data.nfcSignatureValid:
        score += 100
        reasons.append("Invalid NFC Signature")

    # 2. Immutable Ledger Check
    if blockchain_data.isAlreadyFlagged:
        score += 50
        reasons.append("Note Already Flagged on Blockchain")

    return score, reasons