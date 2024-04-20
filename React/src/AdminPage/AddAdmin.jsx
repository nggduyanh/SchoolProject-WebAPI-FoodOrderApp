import { useState } from "react";
import axios from "axios";
import { REGISTER_ADMIN, REGISTER_URL } from "../data/ApiUrl";
export default function AddAdmin() {
    const [AdminForm, setADminForm] = useState({
        name: "",
        password: "",
    })
    function handleChange(event) {
        const { name, value } = event.target;
        setADminForm(prevAdmin => {
            return {
                ...prevAdmin,
                [name]: value,
            }
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(AdminForm);
        try {
            const response = await axios.post(REGISTER_URL, JSON.stringify({
                username: AdminForm.name,
                password: AdminForm.password,
                role: "Admin",
            }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            })
            const responsUser = await axios.get(REGISTER_URL);
            const data = await responsUser.data;
            console.log(data);
            console.log(AdminForm.name);
            const userArray = data.filter((items) => {
                return items.username === AdminForm.name;
            })
            console.log(userArray);
            const responseUser = await axios.post(REGISTER_ADMIN, JSON.stringify({
                name: userArray[0].username,
                id_user: parseInt(userArray[0].id_user),
            }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
        } catch (error) {
            if (!error.response) {
                alert("something went wrong");
            }
        }
    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <input onChange={handleChange} name="name" value={AdminForm.name} className="block w-full border border-orange-400 p-4 rounded-md mb-5" type="text" placeholder="Username" />
                <input onChange={handleChange} name="password" value={AdminForm.password} className="block w-full border border-orange-400 p-4 rounded-md mb-5" type="password" placeholder="Password" />
                <button className="order seeAll"><span>Create Account</span></button>
            </form>
        </div>
    )
}