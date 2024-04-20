import { useState } from "react";
import Button from "../../Button";
import CreateCate from "./CreateCate";
import SearchCate from "./SearchCate";
import { FaSearch } from "react-icons/fa";
export default function UpdateCatre() {
    const [CreateForm, setCreateForm] = useState({
        name: "",
        description: "",
        price: 0,
        image: "",
        id_restaurant: 0,
        id_category: 0,
    })
    // const responseFood = await axios.get(REGISTER_FOOD);
    // const dataFood = await responseFood.data;
    // const combineThree = dataFood.map(foodItems => {
    //     const res = dataRes.filter(resItems => resItems.id_restaurant === foodItems.id_restaurant);
    //     const cate = dataCate.filter(cateItems => cateItems.id_category === foodItems.id_category);
    //     const resObj = res[0];
    //     const cateObj = cate[0];
    //     return {
    //         ...foodItems,
    //         name_res: resObj,
    //         name_cate: cateObj
    //     }
    // })
    // console.log(combineThree);
    return (
        <>
            <br />
            <div className="flex items-center">
                <SearchCate >Search for name</SearchCate>
                <Button className="text-xl bg-orange-500 text-white w-fit p-15  mb-2  cursor-pointer text-center hover:bg-orange-700 transition-all ease-linear "><span><FaSearch /></span></Button>
            </div>
            <br />
            <hr className="w-full border border-orange-200" />
            <br />
            <CreateCate />
        </>
    )
}