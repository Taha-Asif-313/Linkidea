import React from "react";

const About = () => {
  return (
    <div className="min-h-screen py-10 px-5">
      <section className="max-w-4xl mx-auto bg-slate-100 p-8 rounded-lg shadow-lg">
        <p className="mb-6 text-lg">
          Welcome to <strong>Blog Master</strong>, your ultimate platform to
          express your thoughts and read inspiring content from others. Our
          mission is to provide a space where users can share their ideas,
          stories, and insights with a global audience.
        </p>
        <h2 className="text-2xl font-semibold text-primary mb-4">
          What We Offer
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>
            <strong>Write Blogs:</strong> Easily create and publish your own
            blog posts.
          </li>
          <li>
            <strong>Read Blogs:</strong> Explore a diverse range of blogs
            written by other users.
          </li>
          <li>
            <strong>Engage:</strong> Comment on and share your favorite blogs.
          </li>
          <li>
            <strong>Personalize:</strong> Customize your profile and follow
            other writers.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold text-primary mb-4">Our Story</h2>
        <p className="mb-6 text-lg">
          Blog Master was founded in 2024 by a group of passionate writers and
          tech enthusiasts who wanted to create a seamless and user-friendly
          platform for blogging. Since then, we've grown into a vibrant
          community of writers and readers from all around the world.
        </p>
      </section>
    </div>
  );
};

export default About;
