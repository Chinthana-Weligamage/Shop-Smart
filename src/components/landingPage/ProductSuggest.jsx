import React, { useState } from "react";
import RecomendCard from "../recomendation/RecomendCard";
import { SampleSugestions } from "../../reference/SampleData";
import { BsStars } from "react-icons/bs";

const ProductSuggest = () => {
  const [SampleData, setSampleData] = useState(
    [...SampleSugestions].sort(() => 0.5 - Math.random())
  );

  const gridClasses = [
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
    // "col-span-1 row-span-2",
    // "col-span-2 row-span-2",
  ];

  function partitionGridClasses(gridClasses, targetSum) {
    const result = [];
    const recurse = (currentSum, currentPartition) => {
      if (currentSum === targetSum) {
        result.push([...currentPartition]);
        return;
      }
      if (currentSum > targetSum) {
        return;
      }
      for (let i = 0; i < gridClasses.length; i++) {
        const className = gridClasses[i];
        const [colSpan] = className
          .match(/col-span-(\d+)/)
          .slice(1)
          .map(Number);
        recurse(currentSum + colSpan, [...currentPartition, className]);
      }
    };
    recurse(0, []);
    return result;
  }

  const allowedCombinations = partitionGridClasses(gridClasses, 4);

  const generateClassAssignments = (data, combinations) => {
    const result = [];
    let i = 0;

    while (i < data.length) {
      const remainingCount = data.length - i;

      const validCombos = combinations.filter(
        (combo) => combo.length <= remainingCount
      );

      if (validCombos.length === 0) break;

      const combo = validCombos[Math.floor(Math.random() * validCombos.length)];

      for (let className of combo) {
        result.push({ item: data[i], className });
        i++;
      }
    }

    return result;
  };

  const layoutItems = allowedCombinations.length
    ? generateClassAssignments(SampleData, allowedCombinations)
    : SampleData.map((item) => ({
        item,
        className: "col-span-1 row-span-1",
      }));

  const refreshSuggestions = () => {
    // setSampleData([...SampleSugestions].sort(() => 0.5 - Math.random()));
    window.location.reload();
  };

  return (
    <div id="suggestions">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="tooltip">
          <div className="tooltip-content">
            <div className="animate-bounce bg-none text-md">
              Refresh Suggestions
            </div>
          </div>
          <button
            className="btn btn-ghost btn-circle btn-xl"
            onClick={refreshSuggestions}
          >
            <BsStars className="text-4xl text-purple-600 m-2" />
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center">
          Our Advanced AI Found these Amazing Deals for You!
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3 px-32 py-10 break-inside-avoid">
        {layoutItems.map(({ item, className }, index) => {
          const rowMatch = className.match(/row-span-(\d)/);
          const rowHeight = rowMatch ? parseInt(rowMatch[1], 10) : 1;

          return (
            <RecomendCard
              key={item.id}
              randomClass={className}
              index={index}
              item={item}
              rowHeight={rowHeight}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductSuggest;
