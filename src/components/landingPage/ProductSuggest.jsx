import React from "react";
import Section from "../Section";
import RecomendCard from "../recomendation/RecomendCard";

const ProductSuggest = () => {
  return (
    <Section bgColor="base-100">
      <h2 className="text-2xl font-bold w-full text-center my-5">
        Latest Requests
      </h2>
      <div className="bg-base-200 grid grid-cols-8">
        <RecomendCard colspan="2" />
      </div>
    </Section>
  );
};

export default ProductSuggest;
