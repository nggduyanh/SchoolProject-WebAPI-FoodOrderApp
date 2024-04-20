import { useState } from "react";
import { REGISTER_CATE } from "../data/ApiUrl";
import axios from "axios";
export default function AddTypeCate(props) {
    const [CateForm, setCateForm] = useState({
        name: "",
        description: "",
        id: ""
    });
    function handleChange(event) {
        const { name, value } = event.target;
        setCateForm(prevCate => {
            return {
                ...prevCate,
                [name]: value,
            }
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(REGISTER_CATE, JSON.stringify({
                name: CateForm.name,
                description: CateForm.description,
                id_admin: props.adminID,
            }), {
                headers: { 'Content-Type': 'application/json' },
            })
            const data = await response.data;
        }
        catch (error) {
            if (!error.response) {
                alert("Something went wrong");
            }
        }
    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <input onChange={handleChange} value={CateForm.name} name="name" className="block w-full border border-orange-400 p-4 rounded-md mb-5" type="text" placeholder="Name categories" />
                <input onChange={handleChange} value={CateForm.description} name="description" className="block w-full border border-orange-400 p-4 rounded-md mb-5" type="text" placeholder="Description" />
                <button className="order"><span>Add Categories</span></button>
            </form>
        </div>
    )
}