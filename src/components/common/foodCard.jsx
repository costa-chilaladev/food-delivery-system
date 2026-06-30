function FoodCard(props) {
    return (
        <article className="relative w-70 h-96 overflow-hidden rounded-xl border">
            <img
                src={`/src/assets/images/${props.imageName}`}
                className="absolute top-0 left-0 w-full h-1/2 object-cover"
            />
            <div className="absolute bottom-0 h-1/2 p-2 flex flex-col justify-between">
                <h2>{props.title}</h2>
                <p>{props.descr}</p>
                <span className="bottom-0">{props.price}Kzs</span>
                <button className="border rounded-md hover:bg-amber-600">
                    Encomendar
                </button>
            </div>
        </article>
    )
}

export default FoodCard