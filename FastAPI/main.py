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

@app.put("/users/{user_id}",status_code=status.HTTP_200_OK)
async def put_user(user_id:int,user:UserBase,db:db_dependency):
    db_user=db.query(models.User).filter(models.User.id==user_id).first()
    db_user=user
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