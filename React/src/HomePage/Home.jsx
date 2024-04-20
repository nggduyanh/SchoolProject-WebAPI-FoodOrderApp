import Header from "./Header"
import Main from "./Main"
import LayoutSlider from "./Slider/LayoutSlider"
import Button from "../Button";
import SliderImage from "./Slider/SliderImage";
import SliderDesc from "./Slider/SliderDesc";
import { useNavigate, useParams } from "react-router-dom";
import Popular from "./PopularDish/Popular"
import Restaurants from "./Restaurents/Restaurent"
import Advert from "./Utility/Advert"
import Card from "./Utility/Card"
import { useState, useEffect } from "react";
import axios from "axios";
import { REGISTER_CATE, REGISTER_Cus, REGISTER_FOOD, REGISTER_Res, REGISTER_URL } from "../data/ApiUrl"
import Footer from "./Footer";
const HomePage = () => {
    const { userId } = useParams();
    const [FoodList, setFoodList] = useState([]);
    const [idCustomer, setIdCustomer] = useState(null);
    const [orderList, setOrderList] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(REGISTER_Cus);
                const data = await response.data;
                console.log('data', data);
                const filterData = data.filter(items => items.id_user === parseInt(userId));
                console.log("filterData", filterData);
                setIdCustomer(filterData[0]?.id_customer);
            } catch (error) {
                if (!error.response) {
                    alert("Server has problems")
                }
                console.log(error);
            };
        }
        getData();


        const getFoodData = async () => {
            try {
                const responseFood = await axios.get(REGISTER_FOOD);
                const responseCate = await axios.get(REGISTER_CATE);
                const responseRes = await axios.get(REGISTER_Res);
                const dataFood = await responseFood.data;
                const cateData = await responseCate.data;
                const resData = await responseRes.data;
                const perfectFood = dataFood.map(foodItems => {
                    const categories = cateData.filter(cateItems => cateItems.id_category === foodItems.id_category);
                    const restaurants = resData.filter(res => res.id_restaurant === foodItems.id_restaurant);
                    const objCate = categories[0].name;
                    const objRes = restaurants[0].name;
                    return {
                        ...foodItems,
                        category: objCate,
                        restaurant: objRes,
                    }
                });
                console.log("perfectFood", perfectFood);
                setFoodList(perfectFood);
            }
            catch (error) {
                if (!error.response) {
                    alert("something went wrong about taking food");
                }
            }
        }
        getFoodData();
    }, []);
    console.log("FoodList", idCustomer);
    function handleClick() {
        setOrderList(prevOrder => !prevOrder);
    }
    return (
        <div className="bgFood h-screen ">
            <Header />
            <LayoutSlider className="flex justify-between items-center px-10 ">
                <SliderDesc>
                    <div className="text-6xl font-bold ">
                        <p className="mb-4">The Best</p>
                        <p className="mb-4">Restaurants</p>
                        <p className="mb-4">In Your Home</p>
                    </div>
                    <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br /> sed do eiusmod tempor.</p>
                    <div className="explore flex mt-10 justify-between z-50">
                        <input type="text" placeholder="Find something" className="border-2 grow p-2 rounded-md border-orange-200 mr-2 z-50" />
                        <Button className="btnExplore z-50">
                            <svg className="svgIcon" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg>
                            Explore
                        </Button>
                    </div>
                </SliderDesc>
                <SliderImage img="GrabFoodpng.png" />
            </LayoutSlider>
            <br />
            <Main>
                <Advert className="flex gap-3 px-14">
                    <Card
                        name="Quality Food"
                        img="goodFood.png"
                        desc="Have a luxurious dine-in with best ambience with nature"
                    />
                    <Card
                        name="Quality Food"
                        img="pickUp.png"
                        desc="Have a luxurious dine-in with best ambience with nature"
                    />
                    <Card
                        name="Quality Food"
                        img="goodFood.png"
                        desc="Have a luxurious dine-in with best ambience with nature"
                    />
                </Advert>

                <Popular
                    idCus={idCustomer}
                    dataFood={FoodList}
                    onOrder={orderList} />

                <Restaurants />
                <br />
                <LayoutSlider className="flex items-center px-10 bgFood">
                    <SliderImage img="userFood.png" />
                    <SliderDesc>
                        <div className="text-6xl font-bold">
                            <p className="mb-4">Food from your</p>
                            <p className="mb-4">favorite restaurants</p>
                            <p className="mb-4">to your table</p>
                        </div>
                        <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br /> sed do eiusmod tempor.</p>
                        <div className="explore flex mt-10 justify-between">
                            <Button className="order" onClick={handleClick}>
                                <span>Order Now</span>
                            </Button>
                        </div>
                    </SliderDesc>

                </LayoutSlider>
            </Main>
            <Footer />
        </div>
    )
}

export default HomePage;