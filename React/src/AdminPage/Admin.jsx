import Header from "../HomePage/Header";
import Button from "../Button";
import SliderDesc from "../HomePage/Slider/SliderDesc";
import LayoutSlider from "../HomePage/Slider/LayoutSlider";
import SliderImage from "../HomePage/Slider/SliderImage";
import AdminFunct from "./AdminFunct";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { REGISTER_ADMIN } from "../data/ApiUrl"
const AdminPage = () => {
    const { adId } = useParams();
    const [idAdmin, setIdAdmin] = useState(null);
    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(REGISTER_ADMIN);
            const data = await response.data;
            const filterArr = data.filter(items => {
                return items.id_user === parseInt(adId);
            })
            const objAdmin = filterArr[0];
            setIdAdmin(objAdmin);
        };
        getData();
    }, [adId])
    return (
        <div className="bgFood">
            <Header />
            <LayoutSlider className="flex justify-between items-center px-10 ">
                <SliderDesc>
                    <div className="text-6xl font-bold">
                        <p className="mb-4">Admin Page</p>
                    </div>
                    <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br /> sed do eiusmod tempor.</p>
                    <div className="explore flex mt-10 justify-between">
                        <input type="text" placeholder="Find something" className="border-2 grow p-2 rounded-md border-orange-200 mr-2" />
                        <Button className="btnExplore">
                            <svg className="svgIcon" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg>
                            Explore
                        </Button>
                    </div>
                </SliderDesc>
                <SliderImage img="Admin.png" />
            </LayoutSlider>
            <AdminFunct
                id={idAdmin?.id_admin}
                idUser={idAdmin?.id_user} />
        </div>
    )
}
export default AdminPage;