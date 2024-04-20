export default function Card(props) {
    return (
        <div className="p-5 flex border border-orange-400 justify-around items-center gap-2 hover:shadow-xl hover:shadow-orange-200 cardView">
            <div className="iconCard">
                <img src={`../../src/assets/images/${props.img}`} alt="" className="h-32 w-32" />
            </div>
            <div>
                <p className="font-bold text-2xl">{props.name}</p>
                <p>Have a luxurious dine-in with best ambience with nature</p>
            </div>
        </div>
    )
}