import React, { useState, useEffect } from "react";
import Section from "../Section";
import {
  ImportCountries,
  ProduuctCategories,
  Conditions,
} from "../../reference/RequestFormConsts";
import { getCurrentLoggedinUser } from "../../appwrite/auth";
import Swal from "sweetalert2";
import { createOrder } from "../../appwrite/database";

const NewOrderForm = () => {
  const offerId = window.location.pathname.split("/").pop();

  const [currentUser, setCurrentUser] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const response = await getCurrentLoggedinUser();
      setCurrentUser(response);
    };
    getUser();
  }, []);

  const initialFormStructure = {
    creatorId: "",
    offers: offerId,
    orderTitle: "",
    orderValue: 0.0,
    estDelivery: "",
    orderMsg: "",
    status: "In Progress",
    orderImageUrl:
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

    formData.orderValue = parseInt(formData.orderValue);

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

      const response = await createOrder(formData);

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

  const [priceValidation, setPriceValidation] = useState(
    "Minimum Amount must be greater than $10, Maximum Amount must be greater than Minimum Amount"
  );
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (formData.minPrice < 10) {
      setPriceValidation(" Minimum price must be at least $10");
    } else if (formData.maxPrice <= formData.minPrice) {
      setPriceValidation("Maximum price must be greater than minimum price");
    } else {
      setPriceValidation(
        "Minimum Amount must be greater than $10, Maximum Amount must be greater than Minimum Amount"
      );
    }
  };

  useEffect(() => {
    if (currentUser) {
      setFormData({ ...formData, creatorId: currentUser.$id });
    }
  }, [currentUser]);

  return (
    <Section bgColor="base-100">
      <form onSubmit={handleFormSubmit}>
        <div className="bg-blue-200 flex flex-col lg:flex-row rounded-xl">
          <div className="lg:w-1/2 p-8">
            <h1 className="text-2xl font-bold">Create New Order</h1>
            <p className="text-sm font-semibold my-2">
              Create an order for the order: {offerId.toUpperCase()}
            </p>
            <div className="flex flex-col gap-1 mt-5">
              <fieldset className="fieldset flex flex-col bg-blue-200 border border-base-300 p-2 h-full rounded-lg flex-1/2">
                <legend className="fieldset-legend">
                  Add a photo of the purchase receipt
                </legend>

                {image ? (
                  <div className="p-3 border-2 h-80 border-dashed border-primary rounded-lg bg-base-100 flex flex-col items-center justify-center text-gray-400">
                    <img
                      src={image}
                      alt="Product Preview"
                      className="h-full w-full object-contain rounded-lg "
                      onClick={() => setImage(null)}
                    />
                  </div>
                ) : (
                  <label
                    className="flex-1  min-h-80 p-5 border-2 border-dashed border-primary rounded-lg bg-base-100 flex flex-col items-center justify-center text-gray-400"
                    htmlFor="request-image"
                  >
                    Upload Purchase Receipt
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
          </div>
          <div className="lg:w-1/2 flex flex-col justify-end align-bottom  p-8">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Add a title for the order.
              </legend>
              <input
                type="text"
                name="orderTitle"
                className="input input-success w-full validator"
                placeholder={`Order for ${offerId}`}
                pattern="[A-Za-z][A-Za-z0-9\- ]*"
                minLength="3"
                maxLength="90"
                required
                value={formData.orderTitle}
                onChange={handleInputChange}
                list="order-title-suggestions"
              />
              <datalist id="order-title-suggestions">
                {formData.orderTitle.length > -1 && (
                  <option value={offerId}>Click here to Insert Offer ID</option>
                )}
              </datalist>
              <p className="validator-hint">
                Must be 3 to 90 characters containing only letters, numbers or
                dash
              </p>
            </fieldset>
            <fieldset className="flex flex-col gap-2">
              <legend className="fieldset-legend text-xs">
                Any message for the buyer?
              </legend>
              <textarea
                type="text"
                name="orderMsg"
                placeholder="Order Message"
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minLength="10"
                maxLength="500"
                className="textarea validator textarea-success flex-1 min-h-24 lg:min-h-24 w-full"
                value={formData.orderMsg}
                onChange={handleInputChange}
              ></textarea>
              <p className="validator-hint">
                Must be at least 10 to 500 characters containing only letters,
                numbers or dash
              </p>
            </fieldset>

            <div className="grid grid-cols-2 gap-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Your order price in US Dollars? ($)
                </legend>
                <input
                  type="number"
                  name="orderValue"
                  className="input input-success validator w-full"
                  placeholder="Order Price"
                  pattern="[0-9]*"
                  min={10}
                  required
                  value={formData.orderValue > 0 ? formData.orderValue : ""}
                  onChange={handleInputChange}
                />
                <p className="validator-hint col-span-2 text-red-500">
                  {priceValidation}
                </p>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Your estimated delivery date?
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
                      const todayDate = new Date().toISOString().split("T")[0];
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
            </div>
            <fieldset className="fieldset mt-3">
              <button
                className="btn btn-primary"
                type="submit"
                name="submit"
                disabled={buttonDisabled}
              >
                Create Order
              </button>
            </fieldset>
          </div>
        </div>
      </form>
    </Section>
  );
};

export default NewOrderForm;
