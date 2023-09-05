import React from "react";
import { Card, Image } from "react-bootstrap";
import logo from "../../images/Header/LogoImg.svg";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const MobileSideBar = ({ closeOffcanvas }) => {
  const closeToggleOffcanvas = () => {
    closeOffcanvas(false);
  };

  return (
    <>
      <style>
        {`
        .vertical-line {
          width: 1px;
          height: 25px; 
          background-color: #ccc; 
          margin: 0 10px; 
        }

        .sideProfileTag ul {
          padding-left: 1rem;
        }

        .sideProfileTag ul li {
          margin-top: 0.7rem;
          margin-bottom: 2rem;
          list-style-type: none;
        }

        .sideProfileTag li a {
          position: relative;
          height: 100%;
          cursor: pointer;
          color: #000;
          padding-left: 16px;
        }
        `}
      </style>
      <div className="d-flex profileHead " style={{ margin: "0.7rem 0" }}>
        <div
          className="d-flex justify-content-center align-item-center"
          style={{ width: "80%" }}
        >
          <Link to='/'>
            <Image
              src={logo}
              alt="Profile"
              className="d-block mb-3"
              style={{ width: "60%" }}
            />
          </Link>
        </div>
        <div
          className="d-flex justify-content-center align-items-end mb-2"
          style={{ width: "15%" }}
        >
          <Link
            style={{ color: "rgba(19, 61, 122, 0.6)" }}
            onClick={closeToggleOffcanvas}
            className="ml-auto"
          >
            <RxCross2 size={35} />
          </Link>
        </div>
      </div>

      <Card.Body style={{ borderTop: "1px solid rgba(0, 0, 0, 0.2)" }}>
        <div className="sideProfileTag ">
          <ul
            className="d-block justify-content-center align-item-center"
            style={{ width: "100%" }}
          >
            <li>
              <Link to="/employer">For Employer</Link>{" "}
            </li>
            <li>
              <Link to="/recruiter">For Recruiter</Link>{" "}
            </li>
            <li>
              <Link to="/jobseeker">For Jobseeker</Link>{" "}
            </li>
            <li>
              <Link to="/about">About us</Link>{" "}
            </li>
            <li>
              <Link to="/faq">FAQ’s</Link>
            </li>
          </ul>
          <div
            className="d-flex justify-content-center"
            style={{ position: "fixed", bottom: 25, width: "80%" }}
          >
            <div className="Login mx-5">
              <Link to="register" state={{ to: "login" }}>
                <span style={{ fontSize: "18px" }}
                  onClick={closeToggleOffcanvas}>Login</span>
              </Link>
            </div>
            <div className="vertical-line"></div>
            <div className="Register mx-5">
              <Link to="register" state={{ to: "register" }}>
                <span
                  style={{ fontSize: "18px", color: "rgba(8, 106, 216, 1)" }} onClick={closeToggleOffcanvas}
                >
                  Register
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Card.Body>
    </>
  );
};

export default MobileSideBar;
