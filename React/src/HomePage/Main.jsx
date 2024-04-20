import LayoutSlider from "./Slider/LayoutSlider"
import Popular from "./PopularDish/Popular"
import Restaurants from "./Restaurents/Restaurent"
import Button from "../Button"
import SliderImage from "./Slider/SliderImage"
import SliderDesc from "./Slider/SliderDesc"
import Advert from "./Utility/Advert"
import Card from "./Utility/Card"
export default function Main({ children }) {
    return (
        <main className="">
            {children}
        </main>
    )
}