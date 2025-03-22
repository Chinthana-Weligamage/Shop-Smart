import React from "react";
import Section from "../Section";
import RecomendCard from "../recomendation/RecomendCard";
import { SampleSugestions } from "../../reference/SampleData";

const ProductSuggest = () => {
  const SampleData = [...SampleSugestions].sort(() => 0.5 - Math.random());

  return (
    <Section bgColor="base-100">
      <h2 className="text-2xl font-bold w-full text-center my-5">
        Best Deals for Trending Products
      </h2>
      <div className="w-full bg-base-200 grid gap-3 p-5 grid-cols-10 grid-rows-10 max-h-[calc(100vh*3)]">
        {SampleData.map((item, index) => (
          <RecomendCard key={item.id} index={index} item={item} />
        ))}
      </div>
    </Section>
  );
};

export default ProductSuggest;
