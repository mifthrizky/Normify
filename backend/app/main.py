from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import uvicorn

# Import fungsi perhitungan
from app.calculation import perform_normality_test


app = FastAPI(title="API Uji Kenormalan")

# Konfigurasi CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Schema Data
class DataRow(BaseModel):
    xi: float
    fi: float


class NormalityRequest(BaseModel):
    data: List[DataRow]


# Routes
@app.get("/")
def read_root():
    return {"message": "Backend Statistika Aktif!"}

@app.post("/calculate", status_code=200)
def calculate_endpoint(payload: NormalityRequest):
    """
    ENDPOINT UTAMA
    """
    try:
        if not payload.data:
            raise HTTPException(status_code=400, detail="Data tidak boleh kosong.")
        
        # Konversi format pydantic
        raw_data = [row.dict() for row in payload.data]

        result = perform_normality_test(raw_data)
        return result
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)