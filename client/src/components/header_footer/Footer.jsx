import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 max-w-[1300px] mx-auto text-gray-600 py-6 px-5 font-sans tracking-wide">
      <div className="flex justify-between items-center max-lg:flex-col text-center flex-wrap gap-4">
        <p className="text-[15px] leading-loose">
          © <span className="font-semibold text-primary">Linkidea</span>. All rights reserved.
        </p>

        <ul className="flex space-x-6 gap-y-2 max-lg:justify-center flex-wrap">
          <li>
            <a href="#" className="text-[15px] hover:text-primary transition-colors">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="#" className="text-[15px] hover:text-primary transition-colors">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="text-[15px] hover:text-primary transition-colors">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
