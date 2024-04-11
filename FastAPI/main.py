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
    id_restaurant:int
    id_category:int

class OrderBase(BaseModel):
    quantity: int
    total_price: int
    id_restaurant:int  
    id_customer:int
    id_food:int

class RestaurantBase(BaseModel):
    name: str
    address: str
    phone: int
    id_user:int

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency=Annotated[Session,Depends(get_db)]

#Food
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

@app.delete("/food/{food_id}",status_code=status.HTTP_200_OK)
async def delete_food_by_id(food_id:int,db:db_dependency):
    food=db.query(models.Food).filter(models.Food.id_food==food_id).first()
    if food is None:
        raise HTTPException(status_code=404,detail="Food not found")
    db.delete(food)

# Order
@app.post("/orders/",status_code=status.HTTP_201_CREATED)
async def post_order(order:OrderBase,db:db_dependency):
    db_order=models.Order(**order.dict())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)

@app.get("/orders/",status_code=status.HTTP_200_OK)
async def getall_order(db:db_dependency):
    order = db.query(models.Order).all()
    if order is None:
        raise HTTPException(status_code=404,detail='Dont have any order')
    return order

@app.get("/orders/{order_id}",status_code=status.HTTP_200_OK)
async def get_order_by_id(order_id:int,db:db_dependency):
    order = db.query(models.Order).filter(models.Order.id_order==order_id).first()
    if order is None:
        raise HTTPException(status_code=404,detail='Order not found')
    return order

@app.put("/orders/{order_id}",status_code=status.HTTP_200_OK)
async def put_order(order_id:int,order:OrderBase,db:db_dependency):
    db_order=db.query(models.Order).filter(models.Order.id_order==order_id)
    db_order.update(order.dict())
    db.commit()
    db.refresh(db_order.first())

@app.delete("/order/{order_id}",status_code=status.HTTP_200_OK)
async def delete_order_by_id(order_id:int,db:db_dependency):
    order=db.query(models.Order).filter(models.Order.id_order==order_id).first()
    if order is None:
        raise HTTPException(status_code=404,detail="Post not found")
    db.delete(order)
    db.commit()

# Restaurant
@app.post("/restaurants/",status_code=status.HTTP_201_CREATED)
async def post_restaurant(restaurant:RestaurantBase,db:db_dependency):
    db_restaurant=models.Restaurant(**restaurant.dict())
    db.add(db_restaurant)
    db.commit()
    db.refresh(db_restaurant)

@app.get("/restaurants/",status_code=status.HTTP_200_OK)
async def getall_restaurant(db:db_dependency):
    restaurant = db.query(models.Restaurant).all()
    if restaurant is None:
        raise HTTPException(status_code=404,detail='Dont have any restaurant')
    return restaurant

@app.get("/restaurants/{restaurant_id}",status_code=status.HTTP_200_OK)
async def get_restaurant_by_id(restaurant_id:int,db:db_dependency):
    restaurant = db.query(models.Restaurant).filter(models.Restaurant.id_restaurant==restaurant_id).first()
    if restaurant is None:
        raise HTTPException(status_code=404,detail='Restaurant not found')
    return restaurant

@app.put("/restaurants/{restaurant_id}",status_code=status.HTTP_200_OK)
async def put_restaurant(restaurant_id:int,restaurant:RestaurantBase,db:db_dependency):
    db_restaurant=db.query(models.Restaurant).filter(models.Restaurant.id_restaurant==restaurant_id)
    db_restaurant.update(restaurant.dict())
    db.commit()
    db.refresh(db_restaurant.first())

@app.delete("/restaurant/{restaurant_id}",status_code=status.HTTP_200_OK)
async def delete_restaurant_by_id(restaurant_id:int,db:db_dependency):
    restaurant=db.query(models.Restaurant).filter(models.Restaurant.id_restaurant==restaurant_id).first()
    if restaurant is None:
        raise HTTPException(status_code=404,detail="Restaurant not found")
    db.delete(restaurant)
    db.commit()