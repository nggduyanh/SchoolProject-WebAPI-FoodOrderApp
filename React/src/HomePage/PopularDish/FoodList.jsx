import { useState } from "react"
import Button from "../../Button"
import { TiTickOutline } from "react-icons/ti";
export default function FoodList(props) {
    const [clicked, setClicked] = useState(false);
    function handleAddToCart() {
        props.onAddToCart({
            category: props.category,
            name: props.name,
            image: props.image,
            price: props.price,
            price_temp: props.price,
            id_category: props.id_category,
            id_food: props.id_food,
            id_restaurant: props.id_restaurant,
            description: props.description,
            restaurant: props.restaurant,
            amount: 1,
        })
        setClicked(true);
        handleBtnVisible();
    }
    function handleBtnVisible() {
        props.toggleVisible();
    }
    return (
        <div className="FoodItems p-4 rounded-full " >
            <img src={`${props.image}`} alt="" className=" w-full min-h-80 imgFood bg-gray-300 rounded-md " />
            <div className="shadow-2xl p-5 rounded-md bg-white">
                <div className="inforFood text-center">
                    <p className=" mt-3 text-2xl mb-3">{props.name}</p>
                    <p className="text-gray-400 mb-2">{props.category}</p>
                    <p className="text-gray-400 mb-2">{props.restaurant}</p>
                </div>
                <div className="Price flex items-center justify-between mt-5">
                    <p className="text-2xl font-bold">${props.price}</p>
                    <Button onClick={handleAddToCart} className={`btnCart px-4 py-2 ${clicked && "pointer-events-none"} border border-orange-500 
                    text-orange-400 w-fit text-orange rounded-full cursor-pointer hover:bg-orange-500 hover:text-white`}>
                        {(!clicked || props.delete) ? "Add to Cart" : <span><TiTickOutline /></span>}
                    </Button>
                </div>
            </div>
        </div>
    )
}