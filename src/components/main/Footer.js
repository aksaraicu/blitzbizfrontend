import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content mb-[60px] md:mb-0 lg:mb-0">
      <div>
        <p>
          Copyright ©{new Date().getFullYear()} - All right reserved by Rahman
          Hasan and Arya
        </p>
      </div>
    </footer>
  );
};

export default Footer;