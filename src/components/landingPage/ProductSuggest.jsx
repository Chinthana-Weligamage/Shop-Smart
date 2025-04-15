import React from "react";
import RecomendCard from "../recomendation/RecomendCard";
import { SampleSugestions } from "../../reference/SampleData";

const ProductSuggest = () => {
  const SampleData = [...SampleSugestions].sort(() => 0.5 - Math.random());

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
      // Try to find a valid combination that fits the remaining items
      const remainingCount = data.length - i;

      // Filter out only those combos that can fit in the remaining items
      const validCombos = combinations.filter(
        (combo) => combo.length <= remainingCount
      );

      if (validCombos.length === 0) break; // No valid combos left

      const combo = validCombos[Math.floor(Math.random() * validCombos.length)];

      for (let className of combo) {
        result.push({ item: data[i], className });
        i++;
      }
    }

    return result;
  };

  // Only proceed if we have valid layout combinations
  const layoutItems = allowedCombinations.length
    ? generateClassAssignments(SampleData, allowedCombinations)
    : SampleData.map((item) => ({
        item,
        className: "col-span-1 row-span-1", // fallback to simple layout
      }));

  return (
    <div>
      <h2 className="text-2xl font-bold w-full text-center my-5">
        Best Deals for Trending Products
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3 p-20 break-inside-avoid">
        {layoutItems.map(({ item, className }, index) => (
          <RecomendCard
            key={item.id}
            randomClass={className}
            index={index}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSuggest;
