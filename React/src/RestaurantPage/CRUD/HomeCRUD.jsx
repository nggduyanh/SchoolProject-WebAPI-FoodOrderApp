import { useState, useEffect } from "react";
import Navigate from "../../HomePage/HeaderFunct/Navigate";
import Button from "../../Button";
import ReadCate from "./ReadCate";
import CreateCate from "./CreateCate";
import UpdateCate from "./UpdateCate";
import DeleteCate from "./DeletCate";
import { REGISTER_FOOD, REGISTER_CATE, REGISTER_URL, REGISTER_Res, REGISTER_ORDERS, REGISTER_Cus } from "../../data/ApiUrl"
import axios from "axios";
export default function HomeCRUD(props) {
    const [selectedItems, setSelectedItems] = useState("food");
    const [dataFood, setData] = useState([]);
    const [dataOrder, setDataOrder] = useState([]);
    const [idCurRes, setIdCurRes] = useState(null);
    // ! lstRead
    console.log("idCurRes", idCurRes);
    useEffect(() => {
        const getId = async () => {
            try {
                const response = await axios.get(REGISTER_Res);
                const data = await response.data;
                const filterId = data.filter(items => {
                    return items.id_user === parseInt(props.idRes);
                })
                console.log(filterId);
                console.log(data);
                setIdCurRes(filterId[0].id_restaurant);
            } catch (error) {
                if (!error.responseCate) {
                    alert("Something about id when wrong");
                }
            }
        }
        getId();
    }, [props.idRes]);

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
                }).filter(items => items.id_restaurant === idCurRes);
                console.log(perfectFood);
                setData(perfectFood);
            } catch (error) {
                if (!error.responseCate) {
                    alert("Something about Cate when wrong");
                    console.log(error);
                }
                if (!error.responseFood) {
                    alert("Something about Food when wrong");
                    console.log(error);
                }
            }
        }

        getFood();


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
                }).filter(items => items.id_restaurant === parseInt(idCurRes));
                setDataOrder(filterOrder);
                console.log("filterOrder", filterOrder);
            } catch (error) {
                if (!error.response) {
                    alert("Something wrong about orders");
                    console.log(error)
                }
            }
        };
        getOrders();
    }, [idCurRes]);
    console.log("dataOrder", dataOrder);
    const setListRes = dataFood.map(items => {
        return <ReadCate
            key={items.id}
            {...items}
        />
    })
    const setListOrders = dataOrder.map(items => {
        return <ReadCate
            order={true}
            {...items}
        />
    })
    // ! Btn CRUD
    const arr = ["food", "create", "update", "order"];
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
        <main className="p-14 bg-white ">
            <Navigate className="px-2 flex">
                {newListDB}
            </Navigate>
            <div className="w-full p-2">
                {selectedItems === "food" && setListRes}
                {selectedItems === "create" && <CreateCate id={idCurRes} on={true} />}
                {selectedItems === "update" && <CreateCate on={false} id={idCurRes} />}
                {selectedItems === "order" && setListOrders}
            </div>
        </main>
    )
}



// useEffect(() => {
//     const getOrders = async () => {
//         try {
//             const response = await axios.get(REGISTER_ORDERS);
//             const responseFood = await axios.get(REGISTER_FOOD);
//             const responseRes = await axios.get(REGISTER_Res);
//             const responseCus = await axios.get(REGISTER_Cus);
//             const data = await response.data;
//             const dataFood = await responseFood.data;
//             const dataRes = await responseRes.data;
//             const dataCus = await responseCus.data;
//             const filterOrder = data.map(items => {
//                 const food = dataFood.filter(foodItems => foodItems.id_food === filterOrder.id_food);
//                 const res = dataRes.filter(resItems => resItems.id_restaurant === filterOrder.id_restaurant);
//                 const cus = dataCus.filter(cusItems => cusItems.id_customer === filterOrder.id_customer);
//                 return {
//                     ...items,
//                     image: food.image,
//                     retaurant: res.name,
//                     customer: cus.name,
//                 }
//             })
//             console.log("filterOrder", filterOrder);
//             setDataOrder(filterOrder);
//         } catch (error) {
//             if (!error.response) {
//                 alert("Something wrong about orders");
//             }
//         }
//     };
//     getOrders();
// }, [idCurRes]);