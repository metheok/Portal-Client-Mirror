import React from "react";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { Navigate } from "react-router-dom";
import axios from "axios";
import HeroSection from "../../components/HeroSection/HeroSection";
import SectionCards from "../../components/SectionCards/SectionCards";
import EmployerSection from "../../components/EmployerSection/EmployerSection";
import RecruiterSection from "../../components/RecruiterSection/RecruiterSection";
import JobseekerSection from "../../components/JobseekerSection/JobseekerSection";
import HiringSection from "../../components/HiringSection/HiringSection";
import FooterSection from "../../components/WebFooter/WebFooter";
import ClientSection from "../../components/ClientSection/ClientSection";
import TestimonialSection from "../../components/TestimonialSection/TestimonialSection";
import css from "./HomeScreen.module.css";

const Combine = () => {
  const { user, loading } = useSelector((state) => state.user);
  const { userToken } = useSelector((state) => state.auth);
  const [file, setFile] = React.useState(null);
  const [jsonData, setJsonData] = React.useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleJsonDataChange = (event) => {
    setJsonData(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("jsonData", jsonData);
    const token = userToken;

    axios
      .put("/api/employer/profile", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Handle the response data as needed
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const test = false;

  if (user?.user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className={css.landFont}>
      {test && (
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            id="fileInput"
            accept=".jpg, .png, .pdf"
            onChange={handleFileChange}
          />

          <label htmlFor="jsonDataInput">JSON Data:</label>
          <textarea
            id="jsonDataInput"
            value={jsonData}
            onChange={handleJsonDataChange}
            rows="5"
          />
          <input type="submit" value="Upload" />
        </form>
      )}
      <Row>
        {loading ? (
          <Loading />
        ) : (
          <>
            <HeroSection />
            <SectionCards />
            <TestimonialSection />
            <EmployerSection />
            <RecruiterSection />
            <JobseekerSection />
            <HiringSection />
            <ClientSection />
            <FooterSection />
          </>
        )}
      </Row>
    </div>
  );
};

export default Combine;
