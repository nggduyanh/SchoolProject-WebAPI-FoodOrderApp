import { useEffect, useRef, useState } from "react"
import Button from "../../Button"
import FoodList from "./FoodList";
import { FaArrowRight } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import ReadCate from "../../RestaurantPage/CRUD/ReadCate";
import { REGISTER_ORDERS, REGISTER_CATE } from "../../data/ApiUrl";
import axios from "axios";
const Popular = (props) => {
    const [FoodData, setFoodData] = useState([]);
    const [selectedCategories, setSelected] = useState("All");
    const [cartItems, setCartItems] = useState([]);
    const [cateList, setCateList] = useState([]);
    const [isVisible, setisVisible] = useState(false);
    function handleVisible() {
        setisVisible(true)
    }
    function addToCart(items) {
        setCartItems(items);
    }
    useEffect(() => {
        const getCate = async () => {
            try {
                const response = await axios.get(REGISTER_CATE);
                const data = await response.data;
                setCateList(data);
            } catch (error) {
                if (!error.response) {
                    alert("Something wrong about Cate");
                    console.log(error);
                }
            }
        }
        getCate()
    }, []);
    const newListBtn1 = cateList.reduce((accumulate, currentValue) => {
        if (!accumulate.includes(currentValue.name)) {
            accumulate.push(currentValue.name);
        }
        return accumulate;
    }, ["All"])
    console.log(newListBtn1);
    function IncreaseCart() {
        const priceTemp = cartItems.price_temp;
        const updatePrice = cartItems.price + priceTemp;
        const updateAmount = cartItems.amount + 1;
        setCartItems(prevCart => {
            return {
                ...prevCart,
                price: updatePrice,
                amount: updateAmount,
            }
        })
    }
    function DecreaseCart() {
        const priceTemp = cartItems.price_temp;
        const updatePrice = cartItems.price - priceTemp;
        const updateAmount = cartItems.amount - 1;
        setCartItems(prevCart => {
            return {
                ...prevCart,
                price: updatePrice,
                amount: updateAmount,
            }
        })
    }
    const handleSubmit = async () => {
        try {
            console.log(props.idCus);
            const response = await axios.post(REGISTER_ORDERS, JSON.stringify({
                quantity: cartItems.amount,
                total_price: cartItems.price,
                id_customer: parseInt(props.idCus),
                id_restaurant: cartItems.id_restaurant,
                id_food: cartItems.id_food,
            }), {
                headers: { 'Content-Type': 'application/json' },
            });
        }
        catch (error) {
            if (!error.response) {
                alert("Something went wrong with orders");
            }
        }
    }


    const listFood = FoodData.map((items) => {
        return <FoodList key={items.id} {...items} toggleVisible={handleVisible} onAddToCart={addToCart} />
    })

    // const listOrder = cartItems.filter(items => items.delete === false).map(items => {
    // return <ReadCate quantity={true} {...items} />
    // })

    useEffect(() => {
        if (props.dataFood) {
            setFoodData(props.dataFood);
        }
    }, [props.dataFood]);


    let foodTemp = props.dataFood;

    const newListBtn = foodTemp.reduce((accumulate, currentValue) => {
        if (!accumulate.includes(currentValue.category)) {
            accumulate.push(currentValue.category);
        }
        return accumulate;
    }, ["All"])

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function handleClick(event) {
        let filterBtn = capitalizeFirstLetter(event.target.textContent.toLowerCase());
        if (filterBtn !== "All") {
            let result = foodTemp.filter(items => {
                return items.category === filterBtn;
            })
            setFoodData(result);
        }
        else {
            setFoodData(foodTemp);
        }
        setSelected(filterBtn);
    }
    const btnCategoriesList = newListBtn1.map((items, index) => {
        return <Button onClick={handleClick} className={`py-2 rounded-full btnCate  min-w-32 text-center cursor-pointer capitalize text-black ${selectedCategories.includes(items) ? "activeCate" : ""}`}>
            {items}
        </Button>
    })

    function handleClose() {
        setisVisible(false);
    }
    return (
        <>
            <div className="PopularDishes px-10 p-24 z-0">
                <h3 className="text-center text-3xl py-10">Popular Food</h3>
                <div className="category flex  p-2 border border-orange-500 relative left-1/2 w-fit -translate-x-1/2 border-black rounded-full shadow-2xl">
                    {btnCategoriesList}
                </div>
                <br />

                <div className="FoodList grid grid-cols-4">
                    {listFood}
                </div>
                <div className="flex justify-center mt-10">
                    <Button className="order seeAll"><span className="flex items-center uppercase"><p className="mr-2">See All</p> <FaArrowRight /></span> </Button>
                </div>

            </div>
            {isVisible && <div className=" mb-10 z-10 flex w-2/3 rounded-md showBox fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-orange-500 ">
                <div className="imgFood w-1/2 ">
                    <img src={`${cartItems?.image === undefined ? "../src/assets/images/noPic.jpg" : cartItems?.image}`} alt="" className="" />
                </div>
                <div className="inforFood grow flex justify-between">
                    <div className="p-10 z-40">
                        <p className="text-4xl font-bold">Order List</p>
                        <p className="text-red-500 mt-2 text-3xl">${cartItems.price}</p>
                        <br />
                        <p className="text-2xl ">{cartItems.description}</p>
                        <br />
                        <div className="amount flex items-center text-white ">
                            <div className="flex max-h-11 items-center min-w-24 bg-gray-400 rounded-xl text-center justify-between mr-4">
                                <button className="p-2 cursor-pointer z-20" onClick={DecreaseCart}>-</button>
                                <p>{cartItems.amount}</p>
                                <button className="p-2 cursor-pointer z-20" onClick={IncreaseCart}>+</button>
                            </div>
                            <div className="items-center flex">
                                <Button className="order" onClick={handleSubmit}><span>Add to Cart</span></Button>
                            </div>
                        </div>
                        <br />
                        <p>Category: <span>{cartItems.category}</span></p>
                        <br />
                        <p>Restaurants: <span>{cartItems.restaurant}</span></p>
                    </div>
                    <IoMdClose onClick={handleClose} className="z-40 overflow-visible text-4xl cursor-pointer" />
                </div>
            </div>}

            {/* List Order */}
            {/* {props.onOrder && <div className="fixed top-0 right-0 w-96 h-screen bg-white z-20 ">
                <p className="p-5 flex items-center justify-between">
                    <p>Your cart ({listOrder.length})</p>
                    <IoMdClose onClick={handleClose} className="z-40 overflow-visible text-4xl cursor-pointer" />
                </p>
                <hr className="w-full border border-orange-200 mb-4" />
                <div className="border border-orange-500 mx-2 h-4/6 overflow-y-auto rounded-lg p-2 ">
                    {listOrder}

                </div>
                <hr className="w-full border border-orange-200 mt-4" />
                <br />
                <div className="p-2 flex justify-between border border-orange-500 mx-2">
                    <p>Total: </p>
                    <span>{cartItems.reduce((accumulate, currentValue) => {
                        accumulate += currentValue.price;
                        return accumulate;
                    }, 0)}</span>
                </div>
                <div className="p-2">
                    <Button onClick={handleSubmit} className="order w-full text-center"><span>Check Now</span></Button>
                </div>
            </div>} */}
        </>
    )
}
export default Popular;

