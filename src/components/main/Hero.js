import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../public/NR.png";

const Hero = () => {
  return (
    <section className="hero h-fit bg-base-200">
      <div className="container p-2 md:p-6 lg:p-10">
        <div className="hero-content max-w-full flex-col lg:flex-row gap-x-24 gap-y-24">
          <img
            src={logo}
            alt="BlitzBiz Logo"
            className="max-w-[300px] rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">
              Tentang <i>BlitzBiz</i>
            </h1>
            <p className="py-6">
              Our online marketplace provides an easy and secure way to buy and
              sell businesses of all sizes. With our streamlined process, users
              can create an account and list their items in minutes. We also
              offer personalized consultation services to help you get the most
              out of your transaction. Join us today and unlock the potential of
              your venture!
            </p>
            <NavLink to="/listings" className="btn btn-primary">
              Explore Now
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
