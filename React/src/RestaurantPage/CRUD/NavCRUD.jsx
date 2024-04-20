import { useState } from "react";
import LiFunction from "../../HomePage/HeaderFunct/Li";
import Navigate from "../../HomePage/HeaderFunct/Navigate";

export default function NavCRUD() {
    const [selectedItems, setSelectedItems] = useState("Read");
    return (
        <Navigate>
            <p>Read Categories1</p>
            <p>Create Categories</p>
            <p>Update Categories</p>
            <p>Delete Categories</p>
            {/* <LiFunction>Read Categories</LiFunction>
            <LiFunction>Create Categories</LiFunction>
            <LiFunction>Update Categories</LiFunction>
            <LiFunction>Delete Categories</LiFunction> */}
        </Navigate>
    )
}