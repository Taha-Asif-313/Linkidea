import React from "react";

const InfoCard = ({ icon, heading, info }) => {
  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all">
        <div className="p-8">
          {icon}

          <h3 className="text-xl font-bold mb-3 text-primary">{heading}</h3>

          <p className="text-sm leading-relaxed">{info}</p>
        </div>
      </div>
    </>
  );
};

export default InfoCard;
