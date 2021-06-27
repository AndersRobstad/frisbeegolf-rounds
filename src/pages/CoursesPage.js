import React from "react";
import Courses from "../components/Courses";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const CoursesPage = () => {
  return (
    <React.Fragment>
      <Header />
      <Courses />
      <Navbar />
    </React.Fragment>
  );
};

export default CoursesPage;
