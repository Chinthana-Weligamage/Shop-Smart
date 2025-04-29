import React, { useState, useEffect } from "react";
import Section from "../Section";
import {
  ImportCountries,
  ProduuctCategories,
  Conditions,
} from "../../reference/RequestFormConsts";
import { getCurrentLoggedinUser } from "../../appwrite/auth";
import Swal from "sweetalert2";
import { createOffer, getCreatorIdByRequestId } from "../../appwrite/database";

const NewOfferForm = () => {
  const requestId = window.location.pathname.split("/").pop();
  const [currentUser, setCurrentUser] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const response = await getCurrentLoggedinUser();
      setCurrentUser(response);
    };
    getUser();
  }, []);

  useEffect(() => {
    const getCreatorId = async () => {
      const response = await getCreatorIdByRequestId(requestId);
      setFormData({ ...formData, receiverId: response[0].creatorId });
    };
    getCreatorId();
  }, [requestId]);

  const initialFormStructure = {
    creatorId: "",
    receiverId: "",
    productRequests: requestId,
    offerTitle: "",
    offerPrice: 0.0,
    estDelivery: "",
    offerMsg: "",
    condition: "",
    importCountry: "",
    offerStatus: "Pending",
    offerImageUrl:
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setButtonDisabled(true);

    formData.offerPrice = parseInt(formData.offerPrice);

    try {
      if (
        formData.productName === "" ||
        formData.minPrice <= 0 ||
        formData.maxPrice <= 0
      ) {
        throw new Error("Please fill in all the required fields.");
      }

      if (formData.userId === "") {
        throw new Error("Your Login has been expired. Please login again.");
      }

      console.log(formData);

      const response = await createOffer(formData);

      if (response.$id === "") {
        throw new Error("Failed to create request.");
      } else {
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
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    } finally {
      setButtonDisabled(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (currentUser) {
      setFormData({ ...formData, creatorId: currentUser.$id });
    }
  }, [currentUser]);

  return (
    <Section bgColor="base-100">
      <form onSubmit={handleFormSubmit}>
        <div className="bg-green-200 flex flex-col lg:flex-row rounded-xl">
          <div className="lg:w-1/2 p-8">
            <h1 className="text-2xl font-bold">Create New Offer</h1>
            <p className="text-sm font-semibold my-2">
              You are now creating an offer for the product request:{" "}
              {requestId.toUpperCase()}
            </p>
            <div className="flex flex-col gap-1 mt-5">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Give a title for your offer message.
                </legend>
                <input
                  type="text"
                  name="offerTitle"
                  className="input input-success w-full validator"
                  placeholder="Offer title"
                  pattern="[A-Za-z][A-Za-z0-9\- ]*"
                  minLength="3"
                  maxLength="90"
                  required
                  value={formData.offerTitle}
                  onChange={handleInputChange}
                />
                <p className="validator-hint">
                  Must be 3 to 90 characters containing only letters, numbers or
                  dash
                </p>
              </fieldset>

              <fieldset className="flex flex-col gap-2">
                <legend className="fieldset-legend text-xs">
                  Describe all specifications of the product you offer
                </legend>
                <textarea
                  type="text"
                  name="offerMsg"
                  placeholder="Offer Message"
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minLength="10"
                  maxLength="500"
                  className="textarea validator textarea-success flex-1 min-h-60 lg:min-h-40 w-full"
                  value={formData.offerMsg}
                  onChange={handleInputChange}
                ></textarea>
                <p className="validator-hint">
                  Must be at least 10 to 500 characters containing only letters,
                  numbers or dash
                </p>
              </fieldset>
            </div>
          </div>
          <div className="lg:w-1/2  p-8">
            <div className="grid grid-cols-2 gap-4 mb-7">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  From which country you could fulfil this request?
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
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  What condition is the product you are offering in?
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

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col justify-between h-full">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    When can you deliver the product?
                  </legend>
                  <input
                    type="date"
                    name="estDelivery"
                    className="input input-success validator w-full"
                    placeholder="Estimated Delivery Date"
                    min={new Date().toISOString().split("T")[0]}
                    required
                    value={formData.estDelivery}
                    onChange={handleInputChange}
                    onKeyDown={(event) => {
                      if (event.key === "t" || event.key === "T") {
                        event.preventDefault();
                        const todayDate = new Date()
                          .toISOString()
                          .split("T")[0];
                        setFormData({ ...formData, estDelivery: todayDate });
                      }
                    }}
                  />
                  <p className="validator-hint col-span-2 text-red-500">
                    {formData.estDelivery === "" && (
                      <span className="text-red-500">
                        Please select an estimated delivery date.
                      </span>
                    )}
                  </p>
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    What is the price you are offering in US Dollars? ($)
                  </legend>
                  <input
                    type="number"
                    name="offerPrice"
                    className="input input-success validator w-full"
                    placeholder="Offer Price"
                    pattern="[0-9]*"
                    min={10}
                    required
                    value={formData.offerPrice > 0 ? formData.offerPrice : ""}
                    onChange={handleInputChange}
                  />
                  <p className="validator-hint col-span-2 text-red-500">
                    Minimum Amount must be greater than $10
                  </p>
                </fieldset>
              </div>
              <fieldset className="fieldset flex flex-col bg-green-200 border border-base-300 p-2 rounded-lg flex-1/2">
                <legend className="fieldset-legend">
                  Add photo of the product you offer
                </legend>

                {image ? (
                  <div className="p-3 border-2 h-48 border-dashed border-primary rounded-lg bg-base-100 flex flex-col items-center justify-center text-gray-400">
                    <img
                      src={image}
                      alt="Product Preview"
                      className="h-full w-full object-contain rounded-lg "
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
              <button
                className="btn btn-secondary"
                type="submit"
                name="submit"
                disabled={buttonDisabled}
              >
                Send Offer
              </button>
            </fieldset>
          </div>
        </div>
      </form>
    </Section>
  );
};

export default NewOfferForm;
