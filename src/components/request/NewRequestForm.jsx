import React from "react";
import Section from "../Section";

const NewRequestForm = () => {
  return (
    <Section bgColor="white">
      <div className="bg-base-200 flex flex-row">
        <div className="w-1/2 p-5">
          <h1 className="text-2xl font-bold">New Request</h1>
          <p className="text-lg font-semibold mt-2">
            Fill out the form below to submit a new request.
          </p>
          <div className="flex flex-col gap-4 mt-5">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">What is your name?</legend>
              <input type="text" className="input" placeholder="Type here" />
              <p className="fieldset-label">Optional</p>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">What is your name?</legend>
              <input type="text" className="input" placeholder="Type here" />
              <p className="fieldset-label">Optional</p>
            </fieldset>
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-4 mt-5">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">What is your name?</legend>
            <input type="text" className="input" placeholder="Type here" />
            <p className="fieldset-label">Optional</p>
          </fieldset>
        </div>
      </div>
    </Section>
  );
};

export default NewRequestForm;
