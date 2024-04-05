from sqlalchemy import Boolean,Column,Integer,String,ForeignKey
from database import Base,relationship

class User(Base):
    __tablename__="users"

    id=Column(Integer,primary_key=True,index=True)
    username=Column(String(50),unique=True)
    post_r = relationship(
        "Post",
        backref="users",
        cascade="all"
    )

class Post(Base):
    __tablename__="posts"

    id=Column(Integer,primary_key=True,index=True)
    title=Column(String(50))
    content=Column(String(50))
    user_id = Column(Integer, ForeignKey("users.id"))
