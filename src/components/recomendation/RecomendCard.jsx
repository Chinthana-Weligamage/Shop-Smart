import React from "react";

const RecomendCard = ({ index, item }) => {
  // Define a grid layout mapping based on index
  const gridClasses = [
    "col-span-2 row-span-1", // index 0
    "col-span-1 row-span-2", // index 1
    "col-span-2 row-span-2", // index 2
    "col-span-1 row-span-1", // index 3
  ];

  const randomGridClasses = [...gridClasses].sort(() => 0.5 - Math.random());

  return (
    <div
      className={`card bg-base-100 image-full shadow-sm w-full ${
        randomGridClasses[index % randomGridClasses.length]
      }`}
    >
      <figure>
        <img
          // src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          src={item.imageUrl}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.title}</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default RecomendCard;
