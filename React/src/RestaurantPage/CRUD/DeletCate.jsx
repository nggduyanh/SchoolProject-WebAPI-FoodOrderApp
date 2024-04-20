import { useState } from "react";
import Button from "../../Button";
import SearchCate from "./SearchCate";
import { FaSearch } from "react-icons/fa";
import ReadCate from "./ReadCate";
import { REGISTER_FOOD, DELETE_FOOD } from "../../data/ApiUrl"
import axios from "axios";
export default function DeleteCate({ children }) {
    const [found, setFound] = useState(false);
    const [idFood, setId] = useState(0);
    const [food, setFood] = useState({});
    function handleChangeSearch(event) {
        const id = parseInt(event.target.value);
        setId(id);
    }
    const handleClick = async () => {
        if (isNaN(idFood)) {
            alert("Your id must be a number, pls try again");
        }
        else {
            try {
                const response = await axios.get(REGISTER_FOOD);
                const data = await response.data;
                const filterData = data.filter(items => {
                    return items.id_food === idFood;
                })
                if (!filterData.length) {
                    setFound(false);
                }
                else {
                    const objData = filterData[0];
                    console.log(objData);
                    setFood(objData);
                    setFound(true);
                }
            } catch (error) {
                if (!error.response) {
                    alert("Something went wrong about Delete");
                }
            }
        }
    }
    const handleDelete = async () => {
        try {
            console.log(food.id_food);
            const response = await axios.delete(DELETE_FOOD + `${food.id_food}`);
            const data = await response.data;
            window.location.reload();
        } catch (error) {
            if (!error.response) {
                alert("Something went wrong about Delete");
            }
        }
    }
    return (
        <div>
            <br />
            <div className="flex">
                <SearchCate className="min-w-10" onChange={handleChangeSearch}>{children}</SearchCate>
                <Button onClick={handleClick} className="text-xl bg-orange-500 text-white w-fit p-15  mb-2  cursor-pointer text-center hover:bg-orange-700 transition-all ease-linear "><span><FaSearch /></span></Button>
            </div>
            <div className="">
                {found === false ? <img src="../src/assets/images/noData.jpg" className="w-1/3 translate-x-3/4" /> : <ReadCate {...food} />}
            </div>
            <Button onClick={handleDelete} className="inline-block p-2 text-center cursor-pointer bg-red-500 min-w-28 text-white rounded-lg hover:bg-red-700 transition-all ease-linear"><span >Delete</span></Button>
        </div>
    )
}