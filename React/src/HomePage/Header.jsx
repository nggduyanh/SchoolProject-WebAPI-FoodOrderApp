import LiFunction from "./HeaderFunct/Li"
import Navigate from "./HeaderFunct/Navigate"
import Button from "../Button"
import { useNavigate } from "react-router-dom"
export default function Header() {
    const navigate = useNavigate();
    return (
        <header className="flex justify-between p-2 items-center z-40">
            <div className="flex w-1/2 justify-end items-center z-40">
                <img src="../src/assets/images/logoBrand.png" alt="" className="logoBrand mr-10" />
                <Navigate className="nav flex p-4">
                    <LiFunction className="navigation">Home</LiFunction>
                    <LiFunction className="navigation">About us</LiFunction>
                    <LiFunction className="navigation">Restaurants</LiFunction>
                    <LiFunction className="navigation">Pages</LiFunction>
                    <LiFunction className="navigation">Contacts</LiFunction>
                </Navigate>
            </div>
            <div className="w-1/2 flex gap-2 justify-end mr-10">
                <Button className="order" onClick={() => {
                    navigate('/');
                }}><span>Log Out</span></Button>
            </div>
        </header>
    )
}