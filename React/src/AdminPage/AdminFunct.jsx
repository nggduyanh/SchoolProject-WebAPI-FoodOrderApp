import Navigate from "../HomePage/HeaderFunct/Navigate"
import Button from "../Button";
import { useEffect, useState } from "react";
import ReadCate from "../RestaurantPage/CRUD/ReadCate";
import AddAdmin from "./AddAdmin";
import AddTypeCate from "./AddTypeCate";
import { REGISTER_FOOD, REGISTER_CATE, REGISTER_URL, REGISTER_Res, REGISTER_ORDERS, REGISTER_Cus } from "../data/ApiUrl"
import axios from "axios";
import ResItem from "../HomePage/Restaurents/Resitem";
import DeleteCate from "../RestaurantPage/CRUD/DeletCate";
export default function AdminFunct(props) {
    console.log(props.id);
    const [selectedItems, setSelectedItems] = useState("food");
    const [dataFood, setData] = useState([]);
    const [dataOrder, setDataOrder] = useState([]);
    const [dataRes, setDataRes] = useState([]);
    const [dataUser, setDataUser] = useState([]);
    useEffect(() => {
        const getFood = async () => {
            try {
                const responseFood = await axios.get(REGISTER_FOOD);
                const responseCate = await axios.get(REGISTER_CATE);
                const foodData = await responseFood.data;
                const cateData = await responseCate.data;
                const perfectFood = foodData.map(foodItems => {
                    const categories = cateData.filter(cateItems => cateItems.id_category === foodItems.id_category);
                    const objCate = categories[0];
                    return {
                        ...foodItems,
                        category: objCate,
                    }
                })
                setData(perfectFood);
            } catch (error) {
                if (!error.responseCate) {
                    alert("Something about Cate when wrong");
                }
                if (!error.responseFood) {
                    alert("Something about Food when wrong");
                }
            }
        }
        getFood();


        const getRestaurants = async () => {
            try {
                console.log(props.idUser);
                const responseUser = await axios.get(REGISTER_URL);
                const responseRestaurants = await axios.get(REGISTER_Res);
                const dataUser = await responseUser.data;
                const dataRes = await responseRestaurants.data;
                const perfectRestaurants = dataRes.map(resItems => {
                    const userItems = dataUser.filter(dataItems => dataItems.id_user === resItems.id_user);
                    const objOwner = userItems[0];
                    return {
                        ...resItems,
                        Owner: objOwner
                    }
                })
                setDataRes(perfectRestaurants);
                setDataUser(dataUser);
            } catch (error) {
                if (!error.responseUser) {
                    alert("Something about User when wrong");
                }
                if (!error.responseRestaurants) {
                    alert("Something about Res when wrong");
                }
            }
        }
        getRestaurants();


        const getOrders = async () => {
            try {
                const response = await axios.get(REGISTER_ORDERS);
                const responseFood = await axios.get(REGISTER_FOOD);
                const responseRes = await axios.get(REGISTER_Res);
                const responseCus = await axios.get(REGISTER_Cus);
                const data = await response.data;
                const dataFood = await responseFood.data;
                const dataRes = await responseRes.data;
                const dataCus = await responseCus.data;
                const filterOrder = data.map(items => {
                    const food = dataFood.filter(foodItems => foodItems.id_food === items.id_food);
                    const res = dataRes.filter(resItems => resItems.id_restaurant === items.id_restaurant);
                    const cus = dataCus.filter(cusItems => cusItems.id_customer === items.id_customer);
                    return {
                        ...items,
                        food: food[0].description,
                        img: food[0].image,
                        retaurant: res[0].name,
                        customer: cus[0].name,
                    }
                })
                console.log("filterOrder", filterOrder);
                setDataOrder(filterOrder);
            } catch (error) {
                if (!error.response) {
                    alert("Something wrong about orders");
                    console.log(error)
                }
            }
        };
        getOrders();
    }, [])
    const setListOrder = dataOrder.map(items => {
        return <ReadCate
            order={true}
            {...items}
        />
    })
    const setListFood = dataFood.map(items => {
        return <ReadCate
            key={items.id}
            {...items}
        />
    })
    const setListRes = dataRes.map(items => {
        return <ResItem {...items} />
    })
    const setListuser = dataUser.map(items => {
        return <ResItem user={true} {...items} />
    })
    const arr = ["food", "add", "categories", "restaurants", "user", "order"];
    const newListDB = arr.map(items => {
        return <Button onClick={handleActive} className={`p-6 text-center min-w-32 cursor-pointer capitalize text-xl ${selectedItems.includes(items.toLowerCase()) ? "active  border border-b-orange-500" : ""}`}>
            {items}
        </Button>
    })
    function handleActive(event) {
        let filter = event.target.textContent.toLowerCase();
        let newFilter = arr.filter(items => {
            return items.toLowerCase() === filter;
        })
        setSelectedItems(newFilter[0]);
    }
    return (
        <main className="p-14 bg-white">
            <Navigate className="px-2 flex">
                {newListDB}
            </Navigate>
            <br />
            <div className="w-full p-2">
                {selectedItems === "food" && setListFood}
                {selectedItems === "add" && <AddAdmin />}
                {selectedItems === "categories" && <AddTypeCate adminID={props.id} />}
                {selectedItems === "restaurants" && setListRes}
                {selectedItems === "user" && setListuser}
                {selectedItems === "order" && setListOrder}
            </div>
        </main>
    )
}