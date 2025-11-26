from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from .calculation import perform_normality_test

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DataItem(BaseModel):
    xi: float
    fi: float

class CalculateRequest(BaseModel):
    data: List[DataItem]

@app.post("/calculate")
async def calculate(request: CalculateRequest):
    try:
        # Build input with keys expected by perform_normality_test: 'xi' and 'fi'
        data_input = [{"xi": item.xi, "fi": item.fi} for item in request.data]
        result = perform_normality_test(data_input)
        return result
    except Exception as e:
        import traceback
        error_detail = traceback.format_exc()
        print(error_detail)
        # Return an HTTP error so the frontend doesn't treat this as a successful response
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Normify Backend API"}