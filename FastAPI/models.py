from sqlalchemy import Boolean,Column,Integer,String,ForeignKey
from database import Base,relationship

class User(Base):
    __tablename__='users'

    id_user=Column(Integer,primary_key=True,index=True)
    username=Column(String(50),unique=True)
    password=Column(String(50))
    role=Column(String(50))
    user_customer=relationship("Customer",backref="users",cascade="all")
    user_restaurant=relationship("Restaurant",backref="users",cascade="all")
    user_admin=relationship("Admin",backref="users",cascade="all")

class Customer(Base):
    __tablename__="customers"   

    id_customer=Column(Integer,primary_key=True,index=True)
    name=Column(String(50))
    address=Column(String(50))
    phone=Column(String(20))
    id_user=Column(Integer,ForeignKey("users.id_user"))
    customer_order=relationship("Order",backref="customers",cascade="all")

class Food(Base):
    __tablename__='foods'

    id_food= Column(Integer,primary_key=True,index=True)
    name=Column(String(50))
    description=Column(String(255))
    price=Column(Integer)
    image=Column(String(255))
    id_restaurant=Column(Integer,ForeignKey("restaurants.id_restaurant"))
    id_category=Column(Integer,ForeignKey("categories.id_category"))
    food_order=relationship("Order",backref="foods",cascade="all")

class Order(Base):
    __tablename__="orders"

    id_order=Column(Integer,primary_key=True,index=True)
    quantity=Column(Integer)
    total_price=Column(Integer)
    id_customer=Column(Integer,ForeignKey("customers.id_customer"))
    id_restaurant=Column(Integer,ForeignKey("restaurants.id_restaurant"))
    id_food=Column(Integer,ForeignKey("foods.id_food"))

class Restaurant(Base):
    __tablename__="restaurants"

    id_restaurant=Column(Integer,primary_key=True,index=True)
    name=Column(String(50),unique=True)
    address=Column(String(100),unique=True)
    phone=Column(Integer,unique=True)
    id_user=Column(Integer,ForeignKey("users.id_user"))
    restaurant_order=relationship("Order",backref="restaurants",cascade="all")

#Admin class
class Admin(Base):
    __tablename__ = "admins"

    id_admin = Column(Integer, primary_key=True, index=True)
    name = Column(String(50))
    id_user = Column(Integer, ForeignKey("users.id_user"))
    admin_category = relationship("Category",backref="admins",cascade="all")

#Categories class
class Category(Base):
    __tablename__ = "categories"

    id_category = Column(Integer, primary_key=True, index=True)
    name = Column(String(50))
    description = Column(String(255))
    id_admin = Column(Integer, ForeignKey("admins.id_admin"))

