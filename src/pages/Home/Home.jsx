import { useState, useEffect } from "react";
import {
  getCategories as getCategoriesService,
  getProductsByCategoryId,
} from "/src/services/menuService.js";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { HiShoppingCart } from "react-icons/hi";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [openCart, setOpenCart] = useState(() => {
    return false;
  });

  function addToCart(info) {
    setCart((prev) => {
      const prodExist = prev.some((item) => item.id === info.id);

      if (prodExist) {
        return prev.map((item) =>
          item.id === info.id ? { ...item, qtd: item.qtd + info.qtd } : item,
        );
      }

      return [...prev, info];
    });
  }

  function isProductOnCart(id) {
    return cart.some((item) => item.id === id);
  }

  function deleteProductFromCart(id) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await getCategoriesService();
        setCategories(response.data || []);
      } catch (error) {
        console.error("Erro ao carregar categorias", error);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <main className="min-h-screen pb-10">
      <header className="text-center py-6">
        <h1 className="text-3xl font-bold">Cardápio</h1>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-[90%] max-w-5xl mx-auto p-5">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.name}
            categoryId={category.id}
            img_url={category.img_url}
            onSelect={setSelectedCategory}
          />
        ))}
      </section>

      {selectedCategory !== null && (
        <Modal
          closeModal={() => setSelectedCategory(null)}
          categoryId={selectedCategory}
          addToCart={addToCart}
          isProductOnCart={isProductOnCart}
        />
      )}

      {openCart && (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <section className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
            <button
              type="button"
              className="absolute top-4 right-4 text-xl text-gray-500 hover:text-black"
              onClick={() => setOpenCart(false)}
            >
              ✕
            </button>

            <h2 className="mb-4 text-xl font-bold">Carrinho</h2>

            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 border-b pb-2 font-semibold">
              <p>Produto</p>
              <p>Unitário</p>
              <p>qtd</p>
              <p>Total</p>
              <p></p>
            </div>

            <div className="mt-2 space-y-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] items-center gap-4 border-b py-2"
                >
                  <p>{item.name}</p>
                  <p>{item.price} kz</p>
                  <p>x{item.qtd}</p>
                  <p>{item.price * item.qtd} kz</p>

                  <button
                    onClick={() => deleteProductFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button>Finalizar Compra</button>
          </section>
        </section>
      )}

      <p onClick={() => setOpenCart(true)} className="w-full flex p-10 justify-end">
        <span>
          <HiShoppingCart className="text-5xl hover:scale-125 transition-transform duration-200 cursor-pointer" />
        </span>
      </p>
    </main>
  );
}

function CategoryCard({ title, categoryId, img_url, onSelect }) {
  const imageSrc = `/src/assets/images/${img_url}`;

  return (
    <button
      type="button"
      onClick={() => onSelect(categoryId)}
      className="group relative border rounded-3xl text-center overflow-hidden cursor-pointer p-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <img
        className="w-full h-48 object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-90"
        src={imageSrc}
        alt={title}
      />

      <div
        className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/60 to-transparent
                   opacity-0 translate-y-4
                   transition-all duration-300 ease-out
                   group-hover:opacity-100 group-hover:translate-y-0"
      >
        <h2 className="text-white text-lg font-semibold">{title}</h2>
      </div>
    </button>
  );
}

function Modal({ closeModal, categoryId, addToCart, isProductOnCart }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      try {
        const fetchedProducts = await getProductsByCategoryId(categoryId);
        setProducts(fetchedProducts.data || []);
      } catch (error) {
        console.error("Erro ao carregar produtos", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, [categoryId]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="w-full h-[90vh] p-6 bg-white rounded-t-[20px] relative overflow-y-auto">
        <button
          type="button"
          className="absolute top-4 right-4 p-2 font-bold text-gray-500 hover:text-black"
          onClick={closeModal}
          aria-label="Fechar modal"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Produtos</h2>

        {isLoading ? (
          <p className="text-center py-10">A carregar produtos...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                img_url={product.img_url}
                addToCart={addToCart}
                isProductOnCart={isProductOnCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ id, name, price, img_url, addToCart, isProductOnCart }) {
  const imageSrc = `/src/assets/images/products/${img_url}`;
  const [qtd, setQtd] = useState(1);

  function incrementQtd() {
    setQtd((prev) => prev + 1);
  }

  function decrementQtd() {
    if (qtd == 1) return;
    setQtd((prev) => prev - 1);
  }

  return (
    <article className="border rounded-xl p-3 flex flex-col items-center">

      <img
        className="w-[150px] h-[150px] object-cover rounded-lg mb-2"
        src={imageSrc}
        alt={name}
      />
      <h3 className="font-medium text-sm">{name}</h3>
      <span className="text-green-600 font-bold text-sm">{price}</span>

      <div className="inline-flex items-center border rounded-lg overflow-hidden">
        <button onClick={decrementQtd} className="px-3 py-2 hover:bg-gray-500">
          {" "}
          <IoIosArrowBack />{" "}
        </button>
        <span className="w-12 text-center">{qtd}</span>
        <button onClick={incrementQtd} className="px-3 py-2 hover:bg-gray-500">
          {" "}
          <IoIosArrowForward />{" "}
        </button>
      </div>

      <button
        className="flex justify-center border rounded-md transition w-full p-2 duration-500"
        onClick={() => {
          addToCart({ id, name, qtd, price, img_url });
        }}
      >
        {isProductOnCart(id) ? "Added in Cart" : "Add to Cart"}
        {isProductOnCart(id) &&  <HiShoppingCart className="text-2xl text-green-600 animate-bounce" />}
      </button>
    </article>
  );
}
