import React from "react";
import Section from "../Section";

const ProductSuggest = () => {
  return (
    <Section>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">Electronics</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">Fashion</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">Home & Kitchen</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">Beauty & Personal Care</h2>
        </div>
      </div>
    </Section>
  );
};

export default ProductSuggest;
