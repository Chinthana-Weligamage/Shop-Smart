import React from "react";
import { motion } from "framer-motion";

const RecomendCard = ({ index, item, randomClass }) => {
  const handleNavigate = () => {
    window.location.assign("/new-request/" + item.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: Math.random() * 1.5 }}
      className={`card rounded-xl bg-blue-100 shadow-sm lg:min-h-80 ${randomClass}`}
      style={{
        backgroundImage: `url(${item.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0,0,0,0.5)",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="card-body text-white flex flex-col justify-between">
        <div className="flex flex-row items-start gap-1">
          <div className="badge badge-secondary max-w-fit">{item.category}</div>
          <div className="badge badge-soft badge-accent font-semibold  max-w-fit">
            {item.price}
          </div>
        </div>
        <div className=" flex flex-col flex-1">
          <h3 className="card-title">
            {item.title.length > 30
              ? item.title.substring(0, 27) + "..."
              : item.title}
          </h3>
          <p className="text-sm">
            {item.description.length > 40
              ? item.description.substring(0, 37) + "..."
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
