import React from "react";

const RecomendCard = ({ index, item }) => {
  const gridClasses = [
    "col-span-2 row-span-1", // index 0
    "col-span-1 row-span-2", // index 1
    "col-span-2 row-span-2", // index 2
    "col-span-1 row-span-1", // index 3
  ];

  const randomGridClasses = [...gridClasses].sort(() => 0.5 - Math.random());

  const handleNavigate = () => {
    window.location.assign("/new-request/" + item.id);
  };

  return (
    <div
      className={`card bg-base-100 image-full shadow-sm w-full ${
        randomGridClasses[index % randomGridClasses.length]
      }`}
    >
      <figure>
        <img src={item.imageUrl} alt={item.title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.title}</h2>
        <p>
          {item.description.length > 100
            ? item.description.substring(0, 97) + "..."
            : item.description}
        </p>
        <div className="card-actions justify-between">
          <div className="flex flex-row h-full items-end gap-1">
            <div className="badge badge-secondary">{item.category}</div>
            <div className="badge badge-soft badge-accent font-semibold w-full">
              {item.price}
            </div>
          </div>
          <button
            className="btn btn-primary text-white font-semibold "
            onClick={handleNavigate}
          >
            Create Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecomendCard;
