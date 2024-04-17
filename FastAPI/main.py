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
#User
class UserBase(BaseModel):
    username:str
    password:str
    role:str
#Customer
class CustomerBase(BaseModel):
    name:str
    address:str
    phone:str
    id_user:int

class CustomerUpdate(BaseModel):
    name:str
    address:str
    phone:str
#Food
class FoodBase(BaseModel):
    name: str
    description: str
    price: int
    image: str
    id_restaurant:int
    id_category:int

class FoodUpdate(BaseModel):
    name: str
    description: str
    price: int
    image: str
#Order
class OrderBase(BaseModel):
    quantity: int
    total_price: int
    id_restaurant:int  
    id_customer:int
    id_food:int

class OrderUpdate(BaseModel):
    quantity: int
    total_price: int
#Restaurant
class RestaurantBase(BaseModel):
    name: str
    address: str
    phone: int
    id_user:int

class RestaurantUpdate(BaseModel):
    name: str
    address: str
    phone: int

#Admin
class AdminBase(BaseModel):
    name: str
    id_user: int

class AdminUpdate(BaseModel):
    name: str

#Categories
class CategoryBase(BaseModel):
    name: str
    description: str
    id_admin:int

class CategoryUpdate(BaseModel):
    name: str
    description: str

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency=Annotated[Session,Depends(get_db)]

#User
@app.get("/users/",status_code=status.HTTP_200_OK)
async def getall_user(db:db_dependency):
    user = db.query(models.User).all()
    if user is None:
        raise HTTPException(status_code=404,detail='Dont have any user')
    return user

@app.get("/users/{user_id}",status_code=status.HTTP_200_OK)
async def get_user_by_id(user_id:int,db:db_dependency):
    user = db.query(models.User).filter(models.User.id_user==user_id).first()
    if user is None:
        raise HTTPException(status_code=404,detail='User not found')
    return user

@app.get("/users/{user_username}/{user_password}",status_code=status.HTTP_200_OK)
async def get_user_by_account(user_username:str,user_password:str,db:db_dependency):
    user = db.query(models.User).filter(models.User.username==user_username,models.User.password==user_password).first()
    if user is None:
        raise HTTPException(status_code=404,detail='Your Username or password is incorrect')
    return user

@app.post("/users/",status_code=status.HTTP_201_CREATED)
async def post_user(user:UserBase,db:db_dependency):
    db_user=models.User(**user.dict())
    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
    except:
        raise HTTPException(status_code=404,detail="This username already exist")

@app.put("/users/{user_id}",status_code=status.HTTP_200_OK)
async def put_user(user_id:int,user:UserBase,db:db_dependency):
    db_user=db.query(models.User).filter(models.User.id_user==user_id)
    db_user.update(user.dict())
    db.commit()
    db.refresh(db_user.first())

@app.delete("/users/{user_id}",status_code=status.HTTP_200_OK)
async def delete_user_by_id(user_id:int,db:db_dependency):
    user=db.query(models.User).filter(models.User.id_user==user_id).first()
    if user is None:
        raise HTTPException(status_code=404,detail="User not found")
    db.delete(user)
    db.commit()

#Customer
@app.get("/customers/",status_code=status.HTTP_200_OK)
async def getall_customer(db:db_dependency):
    customer = db.query(models.Customer).all()
    if customer is None:
        raise HTTPException(status_code=404,detail='Dont have any customer')
    return customer

@app.get("/customers/{customer_id}",status_code=status.HTTP_200_OK)
async def get_customer_by_id(customer_id:int,db:db_dependency):
    customer = db.query(models.Customer).filter(models.Customer.id_customer==customer_id).first()
    if customer is None:
        raise HTTPException(status_code=404,detail='Customer not found')
    return customer

@app.post("/customers/",status_code=status.HTTP_201_CREATED)
async def post_customer(customer:CustomerBase,db:db_dependency):
    db_customer=models.Customer(**customer.dict())
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)

@app.put("/customers/{customer_id}",status_code=status.HTTP_200_OK)
async def put_customer(customer_id:int,customer:CustomerUpdate,db:db_dependency):
    db_customer=db.query(models.Customer).filter(models.Customer.id_customer==customer_id)
    db_customer.update(customer.dict())
    db.commit()
    db.refresh(db_customer.first())

@app.delete("/customers/{customer_id}",status_code=status.HTTP_200_OK)
async def delete_customer_by_id(customer_id:int,db:db_dependency):
    customer=db.query(models.Customer).filter(models.Customer.id_customer==customer_id).first()
    if customer is None:
        raise HTTPException(status_code=404,detail="Customer not found")
    db.delete(customer)
    db.commit()

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
async def put_food(food_id:int,food:FoodUpdate,db:db_dependency):
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
    db.commit()

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
async def put_order(order_id:int,order:OrderUpdate,db:db_dependency):
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
async def put_restaurant(restaurant_id:int,restaurant:RestaurantUpdate,db:db_dependency):
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

#Admin funtcion
@app.get("/admins/", status_code=status.HTTP_200_OK)
async def get_all_admins(db: db_dependency):
    admins = db.query(models.Admin).all()
    if not admins:
        raise HTTPException(status_code=404, detail='No admins found')
    return admins

# Select
@app.get("/admins/{admin_id}", status_code=status.HTTP_200_OK)
async def get_admin_by_id(admin_id: int, db: db_dependency):
    admin = db.query(models.Admin).filter(models.Admin.id_admin == admin_id).first()
    if not admin:
        raise HTTPException(status_code=404, detail='Admin not found')
    return admin

@app.post("/admins/", status_code=status.HTTP_201_CREATED)
async def create_admin(admin: AdminBase, db: db_dependency):
    db_admin = models.Admin(**admin.dict())
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return db_admin

# Delete
@app.delete("/admins/{admin_id}", status_code=status.HTTP_200_OK)
async def delete_admin(admin_id: int, db: db_dependency):
    admin = db.query(models.Admin).filter(models.Admin.id_admin == admin_id).first()
    if not admin:
        raise HTTPException(status_code=404, detail='Admin not found')
    db.delete(admin)
    db.commit()
    return {"message": "Admin deleted successfully"}

# Update
@app.put("/admins/{admin_id}", status_code=status.HTTP_200_OK)
async def put_admin(admin_id: int, admin: AdminUpdate, db: db_dependency):
    db_admin = db.query(models.Admin).filter(models.Admin.id_admin == admin_id).first()
    if not db_admin:
        raise HTTPException(status_code=404, detail='Admin not found')

    db_admin.name = admin.name
    db_admin.id_user = admin.id_user
    
    db.commit()
    db.refresh(db_admin)
    return db_admin

#Categories function
@app.get("/categories/", status_code=status.HTTP_200_OK)
async def get_all_categories(db: db_dependency):
    categories = db.query(models.Category).all()
    if not categories:
        raise HTTPException(status_code=404, detail='No categories found')
    return categories
# Select
@app.get("/categories/{category_id}", status_code=status.HTTP_200_OK)
async def get_category_by_id(category_id: int, db: db_dependency):
    category = db.query(models.Category).filter(models.Category.id_category == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail='Category not found')
    return category

@app.post("/categories/", status_code=status.HTTP_201_CREATED)
async def create_category(category: CategoryBase, db: db_dependency):
    db_category = models.Category(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category
# Delete
@app.delete("/categories/{category_id}", status_code=status.HTTP_200_OK)
async def delete_category(category_id: int, db: db_dependency):
    category = db.query(models.Category).filter(models.Category.id_category == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail='Category not found')
    db.delete(category)
    db.commit()
    return {"message": "Category deleted successfully"}

# Update
@app.put("/categories/{category_id}", status_code=status.HTTP_200_OK)
async def put_category(category_id: int, category: CategoryUpdate, db: db_dependency):
    db_category = db.query(models.Category).filter(models.Category.id_category == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail='Category not found')
    
    db_category.name = category.name
    db_category.description = category.description

    db.commit()
    db.refresh(db_category)
    return db_category

