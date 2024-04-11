from fastapi import FastAPI, HTTPException,Depends,status
from pydantic import BaseModel
from typing import Annotated
import models
from database import engine,SessionLocal
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()

origins=[
    'http://localhost:3000',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

models.Base.metadata.create_all(bind=engine)

class FoodBase(BaseModel):
    name:str
    description:str
    price:int
    # id_restaurant:int
    # id_category:int

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency=Annotated[Session,Depends(get_db)]

@app.get("/foods/",status_code=status.HTTP_200_OK)
async def getall_food(db:db_dependency):
    food = db.query(models.Food).all()
    if food is None:
        raise HTTPException(status_code=404,detail='Dont have any food')
    return food

@app.get("/foods/{food_id}",status_code=status.HTTP_200_OK)
async def get_food_by_id(food_id:int,db:db_dependency):
    food = db.query(models.Food).filter(models.Food.id_food==food_id).first()
    if food is None:
        raise HTTPException(status_code=404,detail='Food not found')
    return food

@app.post("/foods/",status_code=status.HTTP_201_CREATED)
async def post_food(food:FoodBase,db:db_dependency):
    db_food=models.Food(**food.dict())
    db.add(db_food)
    db.commit()
    db.refresh(db_food)

@app.put("/foods/{food_id}",status_code=status.HTTP_200_OK)
async def put_food(food_id:int,food:FoodBase,db:db_dependency):
    db_food=db.query(models.Food).filter(models.Food.id_food==food_id)
    db_food.update(food.dict())
    db.commit()
    db.refresh(db_food.first()) 

@app.delete("/foods/{food_id}",status_code=status.HTTP_200_OK)
async def delete_food_by_id(food_id:int,db:db_dependency):
    food=db.query(models.Food).filter(models.Food.id_food==food_id).first()
    if food is None:
        raise HTTPException(status_code=404,detail="Food not found")
    db.delete(food)
    db.commit()