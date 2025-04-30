import React from "react";
import Section from "../Section";

const Hero = () => {
  return (
    <Section bgColor="base-100">
      <div className="bg-base-200 flex flex-row">
        <div className="w-1/2 p-16">
          <h1 className="text-5xl font-bold">Welcome to Shop Smart!</h1>
          <p className="text-2xl font-semibold mt-5">
            Shop Smart connects shoppers and travelers to help each other access
            the world
          </p>
          <div className="flex gap-4 mt-10">
            <a className="btn btn-lg btn-primary" href="/new-request">
              Place a Request
            </a>
            <a className="btn btn-lg btn-secondary" href="/all-requests">
              Fulfill a Request
            </a>
          </div>
        </div>
        <div className="w-1/2">
          <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2094&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </div>
      </div>
    </Section>
  );
};

export default Hero;
