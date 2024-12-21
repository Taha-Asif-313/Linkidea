import React from "react";
import HeroSection from "../components/home-page-components/HeroSection";
import ContentPage from "../components/home-page-components/ContentPage";
import Benifits from "../components/home-page-components/Benifits";
import ExplorePost from "../components/home-page-components/ExplorePost";

const Home = () => {
  return (
    <>
      <div className="main h-auto">
        <HeroSection />
        <ContentPage />
        <Benifits />
        <ExplorePost />
      </div>
    </>
  );
};

export default Home;
