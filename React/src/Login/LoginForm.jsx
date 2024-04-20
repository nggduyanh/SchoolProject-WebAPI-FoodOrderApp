import { useState } from "react"
import Login from "./Login";
import RegisterForm from "./RegisterForm";
import { FaFacebook } from "react-icons/fa";
export default function LoginForm() {

    const [loginRes, setLoginRes] = useState(true);
    function changeLogin() {
        setLoginRes(prevState => !prevState);
    }

    return (
        <div className="h-screen w-full relative LogContainer flex items-center">
            <div className="containerImage w-1/2">
                <img src={`./src/assets/images/${loginRes ? "peopleEating" : "regis"}.jpg`} alt="" className="" />
            </div>
            <div className="log_regis h-screen w-1/2 py-9 px-24">
                <div className="status flex justify-end mr-10">
                    <p className={loginRes && "active"} onClick={changeLogin}>Login</p>
                    <p className={!loginRes && "active"} onClick={changeLogin}>Sign Up</p>
                </div>
                <div className="content mt-20 ">
                    <p className="text-5xl mb-4 flex items-center ">{loginRes ? "Welcome Back!" : "Welcome!"}<ion-icon name="happy-outline" className="smile"></ion-icon></p>
                    <i className="text-gray-500 block mb-10">To Keep connected with us please login with your personal information by emnail address and password</i>

                    {loginRes ? <Login /> : <RegisterForm />}

                </div>
            </div>
        </div>
    )
}