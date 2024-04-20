import { useEffect, useState } from "react";
import api from '../data/api';
import { Link, useNavigate, useParams } from "react-router-dom";
import { REGISTER_URL, REGISTER_Cus, REGISTER_Res } from "../data/ApiUrl"
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [Login, setLogin] = useState({
        username: "",
        password: "",
        role: "Admin",
    })
    function handleChangeData(event) {
        const { name, value, type } = event.target;
        setLogin(prevLogin => {
            return {
                ...prevLogin,
                [name]: value,
            }
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(REGISTER_URL);
            const getData = await response.data;
            const checkData = getData.some(items => {
                return items.username === Login.username && items.password === Login.password && items.role === Login.role;
            })
            const filterData = getData.filter(items => {
                return items.username === Login.username && items.password === Login.password && items.role === Login.role;
            })
            console.log(filterData);
            if (checkData) {
                if (filterData[0].role === "Admin") {
                    navigate(`/Admin/${filterData[0].id_user}`);
                }
                else if (filterData[0].role === "Restaurant") {

                    navigate(`/Res/${filterData[0].id_user}`);
                }
                else if (filterData[0].role === "Customer") {
                    navigate(`/Home/${filterData[0].id_user}`);
                }
            }
            else {
                alert("Login failed because username or password or role wrong")
            }
        }
        catch (error) {
            if (!error.response) {
                alert("No server response");
            }
        }
    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit} >
                <input onChange={handleChangeData} type="text" name="username" placeholder="Enter your username" className="w-3/4 border-2 p-3 rounded-xl block mb-2" />
                <input onChange={handleChangeData} type="password" name="password" placeholder="Enter your password" className="w-3/4 border-2 p-3 rounded-xl block" />
                <div className="flex items-center mt-4 ">
                    <select onChange={handleChangeData} className="border border-orange-400 p-2 w-3/4 rounded-lg mr-6" name="role">
                        <option value="Admin">Admin</option>
                        <option value="Customer">Customer</option>
                        <option value="Restaurant">Restaurant</option>
                    </select>
                </div>
                <button className="p-3  bg-blue-500 relative text-white mr-5 mt-8 rounded-full transition-all ease-in shadow-lg hover:bg-blue-800">Login Now</button>
            </form>
        </div>
    )
}
export default Login;