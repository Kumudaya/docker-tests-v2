from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GreetRequest(BaseModel):
    name: str

class GreetResponse(BaseModel):
    success: bool
    message: str
    timestamp: str

@app.post('/api/greet', response_model=GreetResponse)
async def greet(request: GreetRequest):
    name = request.name.strip()
    
    if name:
        return GreetResponse(
            success=True,
            message=f'Hello {name}! 👋',
            timestamp=datetime.now().isoformat()
        )
    else:
        raise HTTPException(status_code=400, detail='Please provide a name!')

@app.get('/health')
async def health():
    return {'status': 'healthy'}

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=5000)
