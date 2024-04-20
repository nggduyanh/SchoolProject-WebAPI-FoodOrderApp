import { useEffect, useRef, useState } from "react"
import { REGISTER_FOOD, REGISTER_CATE, REGISTER_URL, REGISTER_Res } from "../../data/ApiUrl"
import axios from "axios";
import SearchCate from "./SearchCate";
import Button from "../../Button";
import { FaSearch } from "react-icons/fa";
import { storage } from "../../Firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
const CreateCate = (props) => {
    const imgRef = useRef();
    let objImage = {};
    // ! state about cate, restaurantsl
    const [dataCate, setDataCate] = useState([]);
    const [dataRes, setDataRes] = useState([]);
    const [Food, setFood] = useState([]);
    // ! state about idFood to filter
    const [idFood, setId] = useState(0);
    // ! state about data that filter by idFood;
    const [updateData, setUpdate] = useState([]);
    const [CreateForm, setCreateForm] = useState({
        name: "",
        description: "",
        price: 0,
        image: "",
        id_restaurant: props.id,
        id_category: 0,
    })
    const [imageUpload, setImageUpload] = useState();
    const upLoadFile = async () => {
        if (!imageUpload) return;

        const imageRef = ref(storage, `${imageUpload.name + v4()}`);
        try {
            const snapshot = await uploadBytes(imageRef, imageUpload);
            const url = await getDownloadURL(snapshot.ref);
            setCreateForm(prevForm => {
                return {
                    ...prevForm,
                    image: url,
                }
            });
            return url;
        } catch (error) {
            console.error("Error uploading file:", error);
            // Xử lý lỗi tại đây nếu cần thiết
        }
    }
    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "id_restaurant" || name === "id_category") {
            const transValues = parseInt(value);
            setCreateForm(prevForm => {
                return {
                    ...prevForm,
                    [name]: transValues
                }
            })
        }
        else {
            setCreateForm(prevForm => {
                return {
                    ...prevForm,
                    [name]: value
                }
            })
        }

    }
    // ! Load Data Categories and restaurants
    useEffect(() => {
        const loadCateRes = async () => {
            try {
                const responseRes = await axios.get(REGISTER_Res);
                const responseCate = await axios.get(REGISTER_CATE);
                const restaurant = await responseRes.data;
                const Category = await responseCate.data;
                setDataCate(Category);
                setDataRes(restaurant.filter(items => items.id_restaurant === parseInt(props.id)));
            } catch (error) {
                if (!error.response) {
                    alert("Something went wrong about taking Cate, res");
                }
            }
        };
        loadCateRes();


        const getFood = async () => {
            try {
                const response = await axios.get(REGISTER_FOOD);
                const data = await response.data;
                const filterData = data.filter(items => items.id_restaurant === props.id);
                setFood(filterData);
            } catch (error) {
                if (!error.response) {
                    alert("Something wrong about food");
                }
                console.log(error);
            }
        }
        getFood();
    }, []);
    // ! HandleSubmit
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (CreateForm.name === "" && CreateForm.description === "" && CreateForm.image === "" && CreateForm.id_restaurant === "" && CreateForm.id_category === "") {
                alert("Please sign in full");
            }
            else {
                const imgUrl = await upLoadFile();
                setCreateForm(prevForm => {
                    return {
                        ...prevForm,
                        image: imgUrl
                    }
                })
                if (props.on) {
                    const responseFood = await axios.post(REGISTER_FOOD, JSON.stringify({
                        name: CreateForm.name,
                        description: CreateForm.description,
                        price: CreateForm.price,
                        image: imgUrl,
                        id_restaurant: props.id,
                        id_category: CreateForm.id_category,
                    }), {
                        headers: { 'Content-Type': 'application/json' },
                    });
                }
                else {
                    const responseFood = await axios.put(REGISTER_FOOD + `${idFood}`, JSON.stringify({
                        name: CreateForm.name,
                        description: CreateForm.description,
                        price: CreateForm.price,
                        image: imgUrl,
                        id_restaurant: props.id,
                        id_category: CreateForm.id_category,
                    }), {
                        headers: { 'Content-Type': 'application/json' },
                    });
                }
                alert("Success");
                window.location.reload();
            }
        } catch (error) {
            if (!error.response) {
                alert("Something wrong about Create");
            }
        }
    }
    // ! HandleChangeFolder: save images

    function handleChangeFolder(event) {
        const files = (event.target.files);
        objImage = files[0];
        setImageUpload(objImage);

        proccessImageFiles(objImage);
    }
    function proccessImageFiles(objImage) {
        const imgContainer = imgRef.current;
        imgContainer.src = URL.createObjectURL(objImage);
    }
    // !Handle Search
    function FoodUpdate(event) {
        const id = parseInt(event.target.value);

        setId(id);
    }
    const handleClick = async () => {
        try {
            console.log("id", idFood);
            const responseFood = await axios.get(REGISTER_FOOD);
            const responseCate = await axios.get(REGISTER_CATE);
            const foodData = await responseFood.data;
            const cateData = await responseCate.data;
            const perfectFood = foodData.map(foodItems => {
                const categories = cateData.filter(cateItems => cateItems.id_category === foodItems.id_category);
                const objCate = categories[0];
                return {
                    ...foodItems,
                    category: objCate,
                }
            }).filter(items => items.id_restaurant === props.id).filter(items => items.id_food === parseInt(idFood));
            console.log(perfectFood);
            if (perfectFood.length !== 0) {
                setUpdate(perfectFood[0]);
                setCreateForm(perfectFood[0]);
            }
            else {
                alert("Not found with this idRestaurants");
            }
        } catch (error) {
            if (!error.response) {
                alert("Something went wrong with search");
            }
        }
    }
    return (
        <div className="creatCate">
            {props.on === false && <>
                <br />
                <div className="flex ">
                    {/* <SearchCate onChange={handleSearch} >Search for name</SearchCate> */}
                    <select onChange={FoodUpdate} className="w-1/2 border border-orange-500 text-gray-500 px-2" style={{ height: "50px" }}>
                        <option value="" >Choose Food to Update</option>
                        {Food.map(items => {
                            return <option value={items.id_food}>{items.name}</option>
                        })}
                    </select>
                    <Button onClick={handleClick} className="text-xl bg-orange-500 text-white w-fit p-15  mb-2  cursor-pointer text-center hover:bg-orange-700 transition-all ease-linear "><span><FaSearch /></span></Button>
                </div>
                <br />
                <hr className="w-full border border-orange-200" />
                <br />
            </>}
            <form action="" className="createForm" onSubmit={handleSubmit}>
                <input onChange={handleChange} name="name" type="text" placeholder="Name" value={props.on ? CreateForm.name : CreateForm.name} />
                <input onChange={handleChange} name="description" type="text" placeholder="Description" value={props.on ? CreateForm.description : CreateForm.description} />
                <input onChange={handleChange} name="price" type="text" placeholder="Price" value={props.on ? CreateForm.price : CreateForm.price} />
                <select onChange={handleChange} name="id_restaurant" value={props.on ? CreateForm.id_restaurant : CreateForm.id_restaurant}>
                    <option value={dataRes[0]?.id_restaurant}>{dataRes[0]?.name}</option>
                </select>
                <select onChange={handleChange} name="id_category" value={props.on ? CreateForm.id_category : CreateForm.id_category}>
                    <option>Choose Categories</option>
                    {dataCate.map(items => {
                        return <option value={items.id_category}>{items.name}</option>
                    })}
                </select>
                <input type="file" accept="image/jpeg, image/png, image/jpg" onChange={handleChangeFolder} placeholder="Choose file" />
                <img src={!props.on && CreateForm.image} alt="" ref={imgRef} className="w-40 h-40 border border-orange-400" />
                <br />
                <button className="inline-block order min-w-32 text-center seeAll"><span>Create</span></button>
            </form>
        </div>
    )
}

export default CreateCate;