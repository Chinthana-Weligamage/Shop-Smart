import React, { useState } from "react";
import Section from "../Section";
import {
  ImportCountries,
  ProduuctCategories,
  Conditions,
} from "../../reference/RequestFormConsts";
import Swal from "sweetalert2";

const NewRequestForm = () => {
  const initialFormStructure = {
    name: "",
    minPrice: "",
    maxPrice: "",
    category: "",
    condition: "",
    importCountry: "",
    description: "",
    imageUrl: "",
  };
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState(initialFormStructure);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    setFormData(initialFormStructure);
    setImage(null);
    event.target.reset();

    Swal.fire({
      title: "Success!",
      text: "Your request has been submitted successfully.",
      icon: "success",
    }).then(() => {
      window.location.href = "/";
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Section bgColor="white">
      <form onSubmit={handleFormSubmit}>
        <div className="bg-base-200 flex flex-col lg:flex-row rounded-xl">
          <div className="lg:w-1/2 p-8">
            <h1 className="text-2xl font-bold">Create New Request</h1>
            <p className="text-sm font-semibold mt-2">
              Please answer some basic questions about the product you want to
              request.
            </p>
            <div className="flex flex-col gap-2 my-5">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  What is the Product you want?
                </legend>
                <input
                  type="text"
                  name="name"
                  className="input w-full validator"
                  placeholder="Product name"
                  pattern="[A-Za-z][A-Za-z0-9\- ]*"
                  minLength="3"
                  maxLength="90"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <p className="validator-hint">
                  Must be 3 to 90 characters containing only letters, numbers or
                  dash
                </p>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  What is your expected price range in US Dollars? ($)
                </legend>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    name="minPrice"
                    className="input validator w-full"
                    placeholder="Minimum Amount"
                    pattern="[0-9]*"
                    min={10}
                    required
                    value={formData.minPrice}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    className="input validator w-full"
                    placeholder="Maximum Amount"
                    pattern="[0-9]*"
                    min={10}
                    required
                    value={formData.maxPrice}
                    onChange={handleInputChange}
                  />
                  <p className="validator-hint col-span-2">
                    Minimum Amount must be greater than $10, Maximum Amount must
                    be greater than Minimum Amount
                  </p>
                </div>
              </fieldset>
              <div className="grid grid-cols-2 gap-4">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    Pick a Category for the Product
                  </legend>
                  <select
                    defaultValue={formData.category || "Pick a Category"}
                    className="select select-success w-full"
                    name="category"
                    onChange={handleInputChange}
                    required
                  >
                    <option disabled={true}>Pick a Category</option>
                    {ProduuctCategories.map((category) => {
                      return <option key={category}>{category}</option>;
                    })}
                  </select>
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    What is your expected Condition of the Product
                  </legend>
                  <select
                    defaultValue={formData.condition || "Pick a Condition"}
                    className="select select-success w-full"
                    name="condition"
                    onChange={handleInputChange}
                    required
                  >
                    <option disabled={true}>Pick a Condition</option>
                    {Conditions.map((condition) => {
                      return <option key={condition}>{condition}</option>;
                    })}
                  </select>
                </fieldset>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2  p-8">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                From which country would you like to import the product?
              </legend>
              <select
                defaultValue={formData.importCountry || "Pick a Country"}
                className="select select-success w-full"
                name="importCountry"
                onChange={handleInputChange}
              >
                <option disabled={true}>Pick a Country</option>
                <option className="font-medium">Any Country</option>
                {ImportCountries.map((country) => {
                  return <option key={country}>{country}</option>;
                })}
              </select>
            </fieldset>
            <div className="flex flex-col lg:flex-row gap-2">
              <fieldset className="fieldset bg-base-200 border border-base-300 p-2 rounded-lg flex-1/2 flex flex-col ">
                <legend className="fieldset-legend">
                  List all specifications of the product you want
                </legend>
                <textarea
                  type="text"
                  name="description"
                  placeholder="Product Details"
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minLength="10"
                  maxLength="500"
                  className="textarea validator textarea-success flex-1 min-h-40 lg:min-h-fit w-full"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
                <p className="validator-hint">
                  Must be at least 10 to 500 characters containing only letters,
                  numbers or dash
                </p>
              </fieldset>
              <fieldset className="fieldset flex flex-col bg-base-200 border border-base-300 p-2 rounded-lg flex-1/2">
                <legend className="fieldset-legend">
                  Add a clear and descriptive picture of the product
                </legend>

                {image ? (
                  <div className="p-3 border-2 h-48 border-dashed border-primary rounded-lg bg-base-100 flex flex-col items-center justify-center text-gray-400">
                    <img
                      src={image}
                      alt="Product Preview"
                      className="max-w-full h-auto rounded-lg shadow-md"
                      onClick={() => setImage(null)}
                    />
                  </div>
                ) : (
                  <label
                    className="flex-1  min-h-48 p-5 border-2 border-dashed border-primary rounded-lg bg-base-100 flex flex-col items-center justify-center text-gray-400"
                    htmlFor="request-image"
                  >
                    Upload Product Image
                    <input
                      id="request-image"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </fieldset>
            </div>

            <fieldset className="fieldset mt-8">
              <button className="btn btn-primary" type="submit" name="submit">
                Place your Request
              </button>
            </fieldset>
          </div>
        </div>
      </form>
    </Section>
  );
};

export default NewRequestForm;
