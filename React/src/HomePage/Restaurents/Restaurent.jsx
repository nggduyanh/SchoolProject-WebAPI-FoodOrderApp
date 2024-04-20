import { useState } from "react"
import Restaurents from "../../data/ResData"
import ResItem from "./Resitem";
import Button from "../../Button";
import { FaArrowRight } from "react-icons/fa6";
export default function Restaurants() {
    const [ResData, setResData] = useState(Restaurents);
    const newListRes = ResData.map(items => {
        return <ResItem {...items} />
    })

    return (
        <div className="py-14">
            <div className="Restaurents grid grid-cols-2 grid-rows-2 px-10 gap-8">
                <div className="p-4 col-span-1">
                    <p className="font-bold text-5xl">12 Best Restaurants in <br />  Your City</p>
                    <p className="mt-5 text-gray-500 text-2xl">Magna sit amet purus gravida quis blandit turpis <br /> cursus Venenatis tellus in metus vulputate</p>
                </div>
                {newListRes}
            </div>
            <br />
            <div className="flex justify-center ">
                <Button className="order seeAll"><span className="flex items-center uppercase"><p className="mr-2">See All</p> <FaArrowRight /></span> </Button>
            </div>
        </div>
    )
}