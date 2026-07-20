import { getCategories as getCategoriesService } from "/src/services/menuService.js";
import { useState, useEffect } from "react";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0)

  useEffect(() => {
    const getCategories = async () => {
      const categories = await getCategoriesService();
      setCategories(categories.data);
    };

    getCategories();
  }, []);

  function handleOpenModal(category) {
    setSelectedCategory(category)
    setOpenModal(true);
  }

  return (
    <main>
      <section className="text-center">
        <h1>Cardapio</h1>
      </section>

      <section className="flex flex-wrap w-[60%] mx-auto p-5 gap-5">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.name}
            categoryId={category.id}
            img_url={category.img_url}
            handleOpenModal={handleOpenModal}
          />
        ))}
      </section>

      {openModal && <Modal categoryId={selectedCategory}/>}
    </main>
  );
}

function CategoryCard({ title, categoryId, img_url, handleOpenModal }) {
  const baseImagesPath = "/src/assets/images/";

  return (
    <section
      onClick={() => handleOpenModal(categoryId)}
      className="group relative border rounded-3xl text-center p-10 cursor-pointer "
    >
      <img
        className="w-full h-full object-cover transition duration-500 group-hover:brightness-90"
        src={baseImagesPath + img_url}
        alt={"img: " + title}
      />

      <div
        className="absolute inset-0 flex items-end p-6
           opacity-0 translate-y-8
           transition-all duration-500 ease-out
           group-hover:opacity-100
           group-hover:translate-y-0"
      >
        <h1 className="font-semibold">{title}</h1>
      </div>
    </section>
  );
}

function Modal({ categoryId }) {
  return <section></section>;
}
