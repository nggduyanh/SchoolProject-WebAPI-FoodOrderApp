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

class PostBase(BaseModel):
    title: str
    content: str
    user_id: int

class UserBase(BaseModel):
    username: str

#Admin
class AdminBase(BaseModel):
    name: str
    id_user: int

#Categories
class CategoryBase(BaseModel):
    name: str
    description: str

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency=Annotated[Session,Depends(get_db)]

@app.get("/users/",status_code=status.HTTP_200_OK)
async def getall_user(db:db_dependency):
    user = db.query(models.User).all()
    if user is None:
        raise HTTPException(status_code=404,detail='Dont have any user')
    return user

@app.get("/users/{user_id}",status_code=status.HTTP_200_OK)
async def get_user_by_id(user_id:int,db:db_dependency):
    user = db.query(models.User).filter(models.User.id==user_id).first()
    if user is None:
        raise HTTPException(status_code=404,detail='User not found')
    return user

@app.post("/users/",status_code=status.HTTP_201_CREATED)
async def post_user(user:UserBase,db:db_dependency):
    db_user=models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

@app.delete("/user/{user_id}",status_code=status.HTTP_200_OK)
async def delete_user_by_id(user_id:int,db:db_dependency):
    user=db.query(models.User).filter(models.User.id==user_id).first()
    if user is None:
        raise HTTPException(status_code=404,detail="Post not found")
    db.delete(user)
    db.commit()

@app.get("/posts/",status_code=status.HTTP_200_OK)
async def getall_post(db:db_dependency):
    post=db.query(models.Post).all()
    if post is None:
        raise HTTPException(status_code=404,detail="Post not found")
    return post

@app.get("/posts/{post_id}",status_code=status.HTTP_200_OK)
async def get_post_by_id(post_id:int,db:db_dependency):
    post=db.query(models.Post).filter(models.Post.id==post_id).first()
    if post is None:
        raise HTTPException(status_code=404,detail="Post not found")
    return post

@app.post("/posts/",status_code=status.HTTP_201_CREATED)
async def post_post(post:PostBase,db:db_dependency):
    db_post=models.Post(**post.dict())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)

@app.delete("/post/{post_id}",status_code=status.HTTP_200_OK)
async def delete_post(post_id:int,db:db_dependency):
    post=db.query(models.Post).filter(models.Post.id==post_id).first()
    if post is None:
        raise HTTPException(status_code=404,detail="Post not found")
    db.delete(post)
    db.commit()
    db.refresh(post)

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
async def put_admin(admin_id: int, admin: AdminBase, db: db_dependency):
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
async def put_category(category_id: int, category: CategoryBase, db: db_dependency):
    db_category = db.query(models.Category).filter(models.Category.id_category == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail='Category not found')
    
    db_category.name = category.name
    db_category.description = category.description
    
    db.commit()
    db.refresh(db_category)
    return db_category