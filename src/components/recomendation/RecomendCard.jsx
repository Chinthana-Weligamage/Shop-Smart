import React from "react";
import { motion } from "framer-motion";

const RecomendCard = ({ index, item }) => {
  const gridClasses = [
    "col-span-3 row-span-1 h-[calc(300vh/12)]",
    "col-span-2 row-span-2 h-[calc(300vh/6)]",
    "col-span-3 row-span-2 h-[calc(300vh/6)]",
    "col-span-2 row-span-1 h-[calc(300vh/12)]",
  ];

  const randomGridClasses = [...gridClasses].sort(() => 0.5 - Math.random());

  const handleNavigate = () => {
    window.location.assign("/new-request/" + item.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: Math.random() * 1.5 }}
      className={`card bg-blue-100 image-full shadow-sm w-full  bg-cover ${
        randomGridClasses[index % randomGridClasses.length]
      }`}
    >
      <figure className="bg-red-500">
        <img src={item.imageUrl} alt={item.title} className="w-full h-full" />
      </figure>
      <div className="card-body">
        <div className="flex flex-row items-start gap-1">
          <div className="badge badge-secondary max-w-fit">{item.category}</div>
          <div className="badge badge-soft badge-accent font-semibold  max-w-fit">
            {item.price}
          </div>
        </div>
        <div className=" flex flex-col flex-1">
          <h2 className="card-title">{item.title}</h2>
          <p className="text-sm">
            {item.description.length > 100
              ? item.description.substring(0, 97) + "..."
              : item.description}
          </p>
        </div>

        <div className="card-actions justify-end">
          <button
            className="btn btn-primary text-white font-semibold"
            onClick={handleNavigate}
          >
            Create Request
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RecomendCard;
