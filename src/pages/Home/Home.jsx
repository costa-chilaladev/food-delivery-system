import heroImage from "./assets/images/heroImage.jpg";
import FoodCard from "../../components/common/foodCard.jsx";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate()

  return (
    <section>
      <section
        className="w-full min-h-screen bg-cover bg-center text-white relative"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10">
          <header className="flex justify-between items-center px-6 py-4">
            <span className="font-bold text-lg">Food Delivery</span>
            <div className="flex gap-6 text-sm">
              <span className="cursor-pointer hover:underline">Ajuda</span>
              <span className="cursor-pointer hover:underline" onClick={() => navigate("/signup")}>Conta</span>
            </div>
          </header>
          <div className="flex flex-col items-center justify-center text-center px-6 mt-24">
            <h1 className="text-4xl md:text-6xl font-bold max-w-2xl">
              Comida rápida, quente e entregue à sua porta
            </h1>
            <p className="mt-6 text-sm md:text-base max-w-xl text-gray-200">
              Encomende dos melhores restaurantes da sua cidade com entrega
              rápida e simples.
            </p>
            <button className="mt-8 bg-red-500 hover:bg-red-600 px-6 py-3 rounded-full font-medium">
              Pedir agora
            </button>
          </div>
        </div>
      </section>

      <section className="text-center my-5">
        <h1 className="my-5">Mais pedidos</h1>
        <section className="flex w-[80%] justify-center flex-wrap gap-6 m-auto">
          <FoodCard
            title="Hámburguer"
            imageName="example.jpg"
            descr="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, iure nemo?"
            price="400"
          />
          <FoodCard
            title="Hámburguer"
            imageName="example.jpg"
            descr="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, iure nemo?"
            price="400"
          />
          <FoodCard
            title="Hámburguer"
            imageName="example.jpg"
            descr="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, iure nemo?"
            price="400"
          />
          <FoodCard
            title="Hámburguer"
            imageName="example.jpg"
            descr="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, iure nemo?"
            price="400"
          />
          <FoodCard
            title="Hámburguer"
            imageName="example.jpg"
            descr="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, iure nemo?"
            price="400"
          />
          <FoodCard
            title="Hámburguer"
            imageName="example.jpg"
            descr="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, iure nemo?"
            price="400"
          />
          <FoodCard
            title="Hámburguer"
            imageName="example.jpg"
            descr="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, iure nemo?"
            price="400"
          />
          <FoodCard
            title="Hámburguer"
            imageName="example.jpg"
            descr="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, iure nemo?"
            price="400"
          />
        </section>
      </section>
    </section>
  );
}

export default Home;
