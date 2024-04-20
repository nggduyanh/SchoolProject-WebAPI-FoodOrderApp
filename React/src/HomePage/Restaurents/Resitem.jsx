import axios from "axios";
import Button from "../../Button";
import { DELETE_RES, REGISTER_URL } from "../../data/ApiUrl";
export default function ResItem(props) {
    console.log(props.id_restaurant);
    const handleDel = async (event) => {
        console.log(parseInt(event.target.id));
        try {
            if (props.user === false) {
                const response = await axios.delete(DELETE_RES + `${parseInt(event.target.id)}`);
            }
            else {
                const response = await axios.delete(REGISTER_URL + `${parseInt(event.target.id)}`);
            }
            alert("Success");
            window.location.reload();
        }
        catch (error) {
            if (!error.response) {
                alert("Error delete restaurant");
                console.log(error);
            }
        }
    }
    return (
        <div className="flex mb-10 items-center justify-between">
            <div className="flex items-center">
                <img src="../../src/assets/images/logo_res.jpg" alt="" className="w-28 h-28 rounded-lg" />
                <div className="infoRes px-4">
                    <p className="text-2xl font-bold hover:text-orange-500">{props.user ? props.username : props.name}</p>
                    {props.user === false ?
                        <div>
                            <p className="mt-2 text-xl">{props.address}</p>
                            <p className="mt-2">{props.phone}</p>
                        </div> : <p className="mt-2 text-xl">{props.role}</p>}
                </div>
            </div>
            {props.user === true && <Button onClick={handleDel} className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700 transition-all ease-in cursor-pointer"><span id={props.id_user}>Delete</span></Button>}
        </div>
    )
}