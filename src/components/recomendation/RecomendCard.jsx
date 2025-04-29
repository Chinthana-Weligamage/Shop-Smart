import React from "react";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa6";

const RecomendCard = ({ index, item, randomClass, rowHeight }) => {
  const handleNavigate = () => {
    window.location.assign("/new-request/" + item.id);
  };

  const bgColorList = [
    "rgba(22, 121, 255, 0.4)",
    "rgba(161, 80, 226, 0.4)",
    "rgba(50, 174, 38, 0.4)",
    "rgba(232, 9, 105, 0.4)",
    "rgba(250, 93, 4, 0.4)",
    "rgba(243, 38, 72, 0.4)",
    "rgba(224, 190, 42, 0.4)",
  ];

  const bgColorListOnHover = ["rgba(0, 0, 0, 0.5)"];

  const [randomColor, setRandomColor] = React.useState(
    bgColorList[Math.floor(Math.random() * bgColorList.length)] ||
      "rgba(22, 121, 255, 0.6)"
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: Math.random() * 1.5 }}
      className={`card rounded-xl shadow-sm ${randomClass}`}
      onHoverStart={() => {
        setRandomColor(bgColorListOnHover[0]);
      }}
      onHoverEnd={() => {
        setRandomColor(
          bgColorList[Math.floor(Math.random() * bgColorList.length)]
        );
      }}
      style={{
        backgroundImage: `url(${item.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: `${randomColor}`,
        backgroundBlendMode: "multiply",
      }}
    >
      <div
        className={`card-body text-white flex flex-col justify-between h-60`}
      >
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
            {item.description.length > 100
              ? item.description.substring(0, 97) + "..."
              : item.description}
          </p>
        </div>

        <div className="card-actions justify-end">
          <div className="tooltip">
            <div className="tooltip-content">
              <div className="animate-bounce text-amber-400 bg-none text-lg font-black">
                Request Now
              </div>
            </div>
            <button
              className="btn btn-primary text-white font-semibold"
              onClick={handleNavigate}
            >
              <FaHeart /> I Want This
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecomendCard;
