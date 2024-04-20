import { Link } from "react-router-dom"
import Login from "./Login/Login"
export default function NoPage() {
    return (
        <div className="flex justify-between items-center">
            <img src="../src/assets/images/404.jpg" alt="" className="bg-cover w-1/2 h-screen" />
            <div className="w-1/2 ">
                <p className="font-bold text-5xl mb-10">Page Not <br /> Found </p>
                <p className="w-1/2 mb-14">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi molestias doloribus, deleniti enim aut accusantium nesciunt adipisci atque dolores a debitis distinctio nemo labore sed qui sapiente quidem, autem id.</p>
                <Link to="/Home">
                    <button className="bg-blue-500 text-white rounded-xl p-2">Go Back Login</button>
                </Link>
            </div>
        </div>
    )
}