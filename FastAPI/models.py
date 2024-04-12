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
#    admin = relationship("Admin",backref="user",uselist=False)

class Post(Base):
    __tablename__="posts"

    id=Column(Integer,primary_key=True,index=True)
    title=Column(String(50))
    content=Column(String(50))
    user_id = Column(Integer, ForeignKey("users.id"))

#Admin class
class Admin(Base):
    __tablename__ = "admins"

    id_admin = Column(Integer, primary_key=True, index=True)
    name = Column(String(50))
#    id_user = Column(Integer, ForeignKey("users.id"))
    category = relationship("Category",backref="admin",cascade="all")

#Categories class
class Category(Base):
    __tablename__ = "categories"

    id_category = Column(Integer, primary_key=True, index=True)
    name = Column(String(50))
    description = Column(String(255))
    id_admin = Column(Integer, ForeignKey("admins.id_admin"))