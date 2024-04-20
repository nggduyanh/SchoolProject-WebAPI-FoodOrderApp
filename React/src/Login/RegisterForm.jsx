import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCreativeCommonsBy } from "react-icons/fa";
import api from "../data/api";
import axios from "axios";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "http://127.0.0.1:8000/users/";
const REGISTER_Cus = "http://127.0.0.1:8000/customers/";
const REGISTER_Res = "http://127.0.0.1:8000/restaurants/";
const RegisterForm = () => {
    const [regis, setRegis] = useState({
        username: "",
        password: "",
        phone: "",
        address: "",
        role: "Customer",
    })
    const navigate = useNavigate();
    function handleChange(event) {
        const { name, value } = event.target;
        setRegis(prevRegis => {
            return {
                ...prevRegis,
                [name]: value,
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(REGISTER_URL, JSON.stringify({
                username: regis.username,
                password: regis.password,
                role: regis.role
            }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            const getResponse = await axios.get(REGISTER_URL);
            const dataArray = await getResponse.data;
            const arrResults = dataArray.filter(items => {
                return items.username === regis.username && items.password === regis.password && items.role === regis.role;
            });
            if (arrResults[0].role === "Customer") {
                var responseCustomer = await axios.post(REGISTER_Cus, JSON.stringify({
                    name: arrResults[0].username,
                    address: regis.address,
                    phone: regis.phone,
                    id_user: arrResults[0].id_user,
                }), {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                })
            }
            if (arrResults[0].role === "Restaurant") {
                var responseCustomer = await axios.post(REGISTER_Res, JSON.stringify({
                    name: arrResults[0].username,
                    address: regis.address,
                    phone: regis.phone,
                    id_user: arrResults[0].id_user,
                }), {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                })
            }


            const filterArray = dataArray.filter(items => {
                return items.username === regis.username;
            })
            console.log(filterArray[0].id_user);
            if (filterArray[0].role === "Customer") {
                navigate(`/Home/${filterArray[0].id_user}`);
            }
            else if (filterArray[0].role === "Restaurant") {
                navigate(`/Res/${filterArray[0].id_user}`);
            }
        } catch (error) {
            if (!error.response) {
                alert("No server response");
            }

        }
    }

    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <input onChange={handleChange} value={regis.username} type="text" name="username" placeholder="username" className="w-3/4 border-2 p-3 rounded-xl block mb-2" />
                <input onChange={handleChange} value={regis.phone} name="phone" type="text" placeholder="Phone" className="w-3/4 border-2 p-3 rounded-xl block mb-2" />
                <input onChange={handleChange} value={regis.address} name="address" type="address" placeholder="Address" className="w-3/4 border-2 p-3 rounded-xl block mb-2" />
                <input onChange={handleChange} value={regis.password} name="password" type="password" placeholder="Password" className="w-3/4 border-2 p-3 rounded-xl block mb-2" />
                <select onChange={handleChange} value={regis.role} name="role" className="border border-orange-400 p-2 w-3/4 rounded-lg block mt-6" >
                    <option value="Customer">Customer</option>
                    <option value="Restaurant">Restaurant</option>
                </select>
                <br />
                <button className="p-3 btnRegis bg-white shadow-lg text-black border-2 hover:bg-orange-400 hover:text-white">Create Account</button>
            </form>
        </div>
    )
}

export default RegisterForm;