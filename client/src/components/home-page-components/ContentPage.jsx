import React from "react";

const ContentPage = () => {
  return (
    <div class="bg-white mx-auto max-w-screen-2xl px-5 md:px-10">
      <h2 class="text-gray-800 text-3xl md:text-4xl font-extrabold text-center my-16">
        Exclusive Features
      </h2>
      <div class="w-full px-3 mx-auto">
        <div class="grid md:grid-cols-2 gap-12">
          <div class="text-left">
            <h2 class="bg-clip-text bg-gradient-green-black text-transparent text-3xl font-bold mb-4">
              Share Your Ideas
            </h2>
            <p class="mb-4 text-sm text-gray-500">
              Welcome to our LinkIdea! platform, where individuals come together
              to share ideas and explore the countless benefits of various
              practices. Whether you're looking to improve your health, boost
              your productivity, or make a positive impact on the environment,
              this space is designed to help you learn from others and
              contribute your own experiences.
            </p>

            {/* <button type="button" class="bg-gradient-green-black mt-6 px-5 py-2.5 rounded-full text-white text-sm tracking-wider font-medium border border-current outline-none bg-blue-700 hover:bg-blue-800 active:bg-blue-700">Get started</button> */}
          </div>
          <div class="max-h-72">
            <img
              src="https://readymadeui.com/management-img.webp"
              alt="Placeholder Image"
              class="hue-rotate-[300deg]  rounded-lg object-contain w-full h-full"
            />
          </div>
        </div>
        <hr class="border-gray-300 my-12" />
        <div class="grid md:grid-cols-2 gap-12">
          <div class="max-h-72 max-md:order-1">
            <img
              src="https://readymadeui.com/analtsis.webp"
              alt="Placeholder Image"
              class="hue-rotate-[300deg]  rounded-lg object-contain w-full h-full"
            />
          </div>
          <div class="text-left">
            <h2 class="text-transparent bg-gradient-green-black bg-clip-text text-3xl font-bold mb-4">
              Unlock Your Potential
            </h2>
            <p class="mb-4 text-sm text-gray-500">
              Everyone has different strategies for staying productive. Some of
              us thrive with structured schedules, while others prefer flexible
              routines. In this space, you can share what productivity
              techniques have worked for you, whether it's time management tips,
              goal-setting methods, or strategies to stay focused. Read others'
              stories on how they stay productive, and maybe you'll discover a
              new approach that helps you accomplish more with less stress.
            </p>

            {/* <button type="button" class="bg-gradient-green-black mt-6 px-5 py-2.5 rounded-full text-white text-sm tracking-wider font-medium border border-current outline-none bg-blue-700 hover:bg-blue-800 active:bg-blue-700">Get started</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
