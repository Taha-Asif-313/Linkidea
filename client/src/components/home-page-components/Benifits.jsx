import React from "react";
import InfoCard from "../cards/InfoCard";
import { HiMiniUsers } from "react-icons/hi2";
import { FaArrowTrendUp, FaArrowUpWideShort } from "react-icons/fa6";

const Benifits = () => {
  return (
    <>
      {/* information about this website some features and benifits */}
      <div class="bg-green-50 mt-32 ">
        <div class="w-full px-5 md:px-10 py-16 mx-auto max-w-screen-2xl">
          <h2 class="text-gray-800 text-3xl md:text-4xl font-extrabold text-center mb-16">
            Discover Our Exclusive Benefits
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-md:max-w-md mx-auto">
            <InfoCard
              icon={<HiMiniUsers className="text-[#00b503] text-4xl mb-4" />}
              heading={"Strengthened Collaboration"}
              info={
                "When knowledge is shared, it fosters teamwork and sparks new ideas, leading to more innovative solutions and stronger collaboration."
              }
            />
            <InfoCard
              icon={<FaArrowTrendUp className="text-[#00b503] text-4xl mb-4" />}
              heading={"Professional Growth"}
              info={
                "Sharing what you know not only helps others but also solidifies your own expertise, contributing to both personal and career development."
              }
            />
            <InfoCard
              icon={
                <FaArrowUpWideShort className="text-[#00b503] text-4xl mb-4" />
              }
              heading={"Enhanced Learning"}
              info={
                "Sharing knowledge allows both the giver and receiver to deepen their understanding of a subject, promoting better learning and retention."
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Benifits;
