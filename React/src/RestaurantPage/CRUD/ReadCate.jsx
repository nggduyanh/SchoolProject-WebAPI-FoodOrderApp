import axios from "axios";
import Button from "../../Button";
import { FaPlusCircle } from "react-icons/fa";
import { FaCircleMinus } from "react-icons/fa6";
import { DELETE_FOOD } from "../../data/ApiUrl";
export default function ReadCate(props) {
    function handleUpdate(updateAmount, updatePrice) {
        props.onUpdateCart({
            category: props.category,
            name: props.name,
            image: props.image,
            price: updatePrice,
            price_temp: props.price,
            id_category: props.id_category,
            id_food: props.id_food,
            id_restaurant: props.id_restaurant,
            delete: false,
            amount: updateAmount,
        })
    }
    function handleIncr() {
        const updateAmount = props.amount + 1;
        const updatePrice = props.price + props.price_temp;
        handleUpdate(updateAmount, updatePrice);
    }
    function handleDecr() {
        if (props.amount > 0) {
            const updateAmount = props.amount - 1;
            console.log("Update", updateAmount);
            const updatePrice = props.price - props.price_temp;
            console.log("Price", updatePrice)
            handleUpdate(updateAmount, updatePrice);
        }
    }
    // function handleDelete() {
    //     props.onUpdateCart({
    //         category: props.category,
    //         name: props.name,
    //         image: props.image,
    //         price: props.price,
    //         id_category: props.id_category,
    //         id_food: props.id_food,
    //         id_restaurant: props.id_restaurant,
    //         delete: true,
    //     })
    // }
    const handleDelete = async (event) => {
        const id = parseInt(event.target.id);
        try {
            const response = await axios.delete(DELETE_FOOD + `${id}`);
            alert("Success");
            window.location.reload();
        } catch (error) {
            if (!error.response) {
                alert("Error something about Delete food");
                console.log(error);
            }
        }
    }
    return (
        <>
            <div className="flex p-3 border-4 rounded-xl justify-between">
                <div className="inforFood flex items-center justify-between">
                    {props.order ? <img src={`${props.img}`} alt="" className="w-20 h-20 rounded-xl mr-5" /> : <img src={`${props.image}`} alt="" className="w-20 h-20 rounded-xl mr-5" />}

                    <div className="descFood">
                        <p className="text-xl font-bold">{props.name} </p>
                        {props.order && <div>
                            <p className="text-xl font-bold">{props.food} </p>
                            <p className="text-xl font-bold">{props.retaurant} </p>
                            <p className="text-xl font-bold">{props.customer} </p></div>}
                        <p className="text-gray-500">{props.description}</p>
                        <p>{props.price}</p>
                    </div>

                </div>
                <div className="createDel flex items-center">
                    <Button onClick={handleDelete} className="block p-2 text-center cursor-pointer bg-red-500 min-w-3 text-white rounded-lg "><span id={props.id_food}>Delete</span></Button>
                    {/* <Button className="order min-w-28 text-center "><span>Update</span></Button>
                    <Button className="block p-2 text-center cursor-pointer bg-red-500 min-w-28 text-white rounded-lg ">Delete</Button> */}
                    {/* {props.quantity &&
                        <div>
                            <div className="text-center flex items-center mb-4" >
                                <FaPlusCircle onClick={handleIncr} className="mr-2" />
                                <p>{props.amount}</p>
                                <FaCircleMinus onClick={handleDecr} className="ml-2" />
                            </div>
                            <Button onClick={handleDelete} className="block p-2 text-center cursor-pointer bg-red-500 min-w-3 text-white rounded-lg ">Delete</Button>
                        </div>
                    } */}
                </div>
            </div>
        </>
    )
}