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
