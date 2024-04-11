from sqlalchemy import Boolean,Column,Integer,String,ForeignKey
from database import Base,relationship

class Food(Base):
    __tablename__='foods'

    id_food=Column(Integer,primary_key=True,index=True)
    name=Column(String(50))
    description=Column(String(50))
    price=Column(Integer)
    # id_restaurant=Column(Integer,ForeignKey('restaurants.id_restaurant'))
    # id_category=Column(Integer,ForeignKey('categories.id_category'))
    # food_order=relationship('Order',backref='foods',cascade=all)

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
