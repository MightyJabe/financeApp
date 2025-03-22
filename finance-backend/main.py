from fastapi import FastAPI, Depends, HTTPException, Security, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from database import SessionLocal, engine, FinancialData, Base, User
from auth import (
    verify_password,
    get_password_hash,
    create_access_token,
    SECRET_KEY,
    ALGORITHM
)
from pydantic import BaseModel
from datetime import timedelta
from jose import JWTError, jwt
from typing import List

# ===== Create / Migrate DB Tables =====
Base.metadata.create_all(bind=engine)

# ===== CORS =====
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust for your environment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===== OAuth2 Setup =====
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# ===== DB Dependency =====
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ===== Models / Schemas =====
class FinancialDataRequest(BaseModel):
    name: str
    category: str
    amount: float

# ===== JWT: Get Current User (Using ID in 'sub') =====
def get_current_user(token: str = Security(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")

        user = db.query(User).filter(User.id == int(user_id)).first()
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ===== Routes =====
@app.get("/")
def read_root():
    return {"message": "Welcome to the Finance Dashboard API"}

@app.post("/signup/")
def signup(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Register a new user by username/password."""
    user_exists = db.query(User).filter(User.username == form.username).first()
    if user_exists:
        raise HTTPException(status_code=400, detail="Username already registered")

    hashed_password = get_password_hash(form.password)
    user = User(username=form.username, hashed_password=hashed_password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"msg": "User created", "user_id": user.id}

@app.post("/token/")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Log in, return JWT token with user ID in 'sub'."""
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Store user.id in token
    access_token = create_access_token({"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/add-financial-data/")
def add_financial_data(
    request: FinancialDataRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Add a new financial record (protected)."""
    new_entry = FinancialData(
        name=request.name,
        category=request.category,
        amount=request.amount
    )
    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)
    return {"status": "success", "data": new_entry}

@app.get("/net-worth/")
def get_net_worth(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Calculate total net worth from all records (protected)."""
    total = db.query(FinancialData).all()
    net_worth = sum(entry.amount for entry in total)
    return {"net_worth": net_worth}

@app.get("/financial-records/")
def get_records(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Fetch all financial records (protected)."""
    return db.query(FinancialData).all()
