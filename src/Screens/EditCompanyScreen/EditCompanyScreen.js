import React, { useState } from "react";

import ProfileCard from "../../components/ProfileCard/ProfileCard";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Alert, Tab, Tabs, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Loading from "../../components/Loading/Loading";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import EmployerCompanyAbout from "../../components/EmployerCompanyAbout/EmployerCompanyAbout";
import EmployerCompanyContact from "../../components/EmployerCompanyContact/EmployerCompanyContact";
import EmployerCompanyLegalInfo from "../../components/EmployerCompanyLegalInfo/EmployerCompanyLegalInfo";
import EmployerCompanyOffices from "../../components/EmployerCompanyOffices/EmployerCompanyOffices";
import { clearForm } from "../../state/employerCompany/employerCompanySlice";
import {
  employerCompanyFetch,
  employerCompanyCreate,
  employerCompanyUpdate,
} from "../../state/employerCompany/employerCompanyActions";
import css from "./EditCompanyScreen.module.css";
import OnScreenMenu from "../../components/OnScreenMenu/OnScreenMenu";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

const EditCompanyScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tab } = useParams();
  const { loading, error } = useSelector((state) => state.auth);
  const { user, userLoading } = useSelector((state) => state.user);

  const employerCompanyState = useSelector((state) => state.employerCompany);
  const tabsArray = ["about", "contact-details", "legal-info", "offices"];
  const dispatch = useDispatch();
  const [key, setKey] = useState("");

  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 767);
  const [removeEmpty, setRemoveEmpty] = React.useState(
    window.innerWidth <= 1400
  );

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      setRemoveEmpty(window.innerWidth <= 1400);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    if (!tabsArray.includes(tab)) {
      return navigate("/dashboard/company/about");
    }
    dispatch(clearForm());
    setKey(tab);
  }, [tab]);
  React.useEffect(() => {
    dispatch(employerCompanyFetch());
  }, [dispatch]);
  const nextTab = () => {
    const idx = tabsArray.indexOf(key);
    if (idx > -1) {
      const nextTabVal = tabsArray[idx + 1];
      if (nextTabVal) {
        navigate(`/dashboard/company/${nextTabVal}`);
      }
    }
  };
  if (
    location.pathname === "/dashboard/company" ||
    location.pathname === "/dashboard/company/"
  ) {
    return <Navigate to="/dashboard/company/about" />;
  }
  if (loading || userLoading) {
    return <Loading />;
  }
  if (!user.user) {
    return <Navigate to="/register" />;
  }
  console.log({ user });
  if (user.user.userType !== "employer") {
    return <Navigate to="/dashboard" />;
  }

  const showLoading =
    employerCompanyState.companyFetchLoading ||
    employerCompanyState.companySaveLoading ||
    employerCompanyState.companyUpdateLoading;
  const companyData = employerCompanyState?.data?.company;

  const createEmployerCompany = async (data) => {
    await dispatch(employerCompanyCreate(data));
  };
  const updateEmployerCompany = async (data) => {
    await dispatch(employerCompanyUpdate(data));
  };
  return (
    <>
      <style>
        {`
                
          @media (max-width: 450px) {
            .tabContainer .nav-tabs .nav-link {
              font-size: 13px;
            }
          }
          @media (max-width: 375px) {
            .tabContainer .nav-tabs .nav-link {
              font-size: 12px;
            }
          }
          @media (max-width: 350px) {
            .tabContainer .nav-tabs .nav-link {
              font-size: 11px;
            }
          }

          .tabContainer .nav-tabs {
            padding:0.2rem 0 ;
            border:1px solid rgba(0, 0, 0, 0.03);
          box-shadow: 0px 5px 5px -7px rgba(0,0,0,1);
            margin-bottom: 20px;
            border-bottom: 0
          }

          .tabContainer .nav-tabs .nav-link {
            border: none;
            background-color: #fff;
            color: #333;
            font-weight: bold;
            padding: 2px 5px;
            border-radius: 0;
            margin-right: 5px;
            cursor: pointer;
            font-family: Roboto;
            font-weight: 500;
            line-height: 24px;
            letter-spacing: 0.01em;
            text-align: center;
            transition: border-bottom-color 0.3s ease-in-out;
          }

          .tabContainer .nav-tabs .nav-link.active {
            background-color: #fff;
            color: #000;
            border-bottom: 2px solid #ddd;
            border-bottom-color: rgba(8, 43, 93, 1);
          }
  
      `}
      </style>
      <Container style={{ marginTop: "1rem" }}>
        {error && (
          <Alert variant="danger">Error occurred while loading data.</Alert>
        )}
        {!error && user?.user ? (
          <Row>
            {!isMobile && (
              <Col xs={4} md={2} lg={3} xl={3} xxl={3}>
                <ProfileCard user={user} location={location} />
              </Col>
            )}
            {isMobile ? (
              <>
                <Col xs={12} md={10} lg={9} xl={8} xxl={6}>
                  {showLoading ? (
                    <Loading />
                  ) : employerCompanyState.companyFetchError ? (
                    <Alert variant="danger">
                      Error occurred while fetching company data.
                    </Alert>
                  ) : (
                    <div className={` ${css.TabContainer} tabContainer`}>
                      <Link to="/dashboard">
                        <span className={css.backArrow}>
                          <BiArrowBack />
                        </span>
                      </Link>
                      <h1>Company Details</h1>
                      <Tabs
                        className={`${css.mobileTabs} `}
                        activeKey={key}
                        onSelect={(k) => {
                          navigate(`/dashboard/company/${k}`);
                        }}
                      >
                        <Tab
                          eventKey="about"
                          className={` ${css.tabContent}`}
                          title="About"
                        >
                          <div>
                            <EmployerCompanyAbout
                              dispatch={dispatch}
                              companyData={companyData}
                              createEmployerCompany={createEmployerCompany}
                              employerCompanyState={employerCompanyState}
                              updateEmployerCompany={updateEmployerCompany}
                              clearForm={clearForm}
                              nextTab={nextTab}
                              isMobile={isMobile}
                            />
                          </div>
                        </Tab>
                        <Tab
                          eventKey="contact-details"
                          className="tab-content"
                          title="Contact Details"
                        >
                          <div>
                            <EmployerCompanyContact
                              dispatch={dispatch}
                              companyData={companyData}
                              employerCompanyState={employerCompanyState}
                              clearForm={clearForm}
                              createEmployerCompany={createEmployerCompany}
                              updateEmployerCompany={updateEmployerCompany}
                              nextTab={nextTab}
                              isMobile={isMobile}
                            />
                          </div>
                        </Tab>
                        <Tab
                          eventKey="legal-info"
                          className="tab-content"
                          title="Legal Information"
                        >
                          <div>
                            <EmployerCompanyLegalInfo
                              dispatch={dispatch}
                              companyData={companyData}
                              employerCompanyState={employerCompanyState}
                              clearForm={clearForm}
                              createEmployerCompany={createEmployerCompany}
                              updateEmployerCompany={updateEmployerCompany}
                              nextTab={nextTab}
                              isMobile={isMobile}
                            />
                          </div>
                        </Tab>
                        <Tab
                          eventKey="offices"
                          className="tab-content"
                          title="Offices"
                        >
                          <div>
                            <EmployerCompanyOffices
                              dispatch={dispatch}
                              companyData={companyData}
                              employerCompanyState={employerCompanyState}
                              clearForm={clearForm}
                              createEmployerCompany={createEmployerCompany}
                              updateEmployerCompany={updateEmployerCompany}
                              nextTab={nextTab}
                              isMobile={isMobile}
                            />
                          </div>
                        </Tab>
                      </Tabs>
                    </div>
                  )}
                </Col>
              </>
            ) : (
              <>
                <Col xs={12} md={10} lg={9} xl={8} xxl={6}>
                  {showLoading ? (
                    <Loading />
                  ) : employerCompanyState.companyFetchError ? (
                    <Alert variant="danger">
                      Error occurred while fetching company data.
                    </Alert>
                  ) : (
                    <div className="tabs-container">
                      <Tabs
                        id="controlled-tab"
                        activeKey={key}
                        onSelect={(k) => {
                          navigate(`/dashboard/company/${k}`);
                        }}
                        className="mb-3"
                      >
                        <Tab
                          eventKey="about"
                          className="mb-2 tab-content"
                          title="About"
                        >
                          <div>
                            <EmployerCompanyAbout
                              dispatch={dispatch}
                              companyData={companyData}
                              createEmployerCompany={createEmployerCompany}
                              employerCompanyState={employerCompanyState}
                              updateEmployerCompany={updateEmployerCompany}
                              clearForm={clearForm}
                              nextTab={nextTab}
                              isMobile={isMobile}
                            />
                          </div>
                        </Tab>
                        <Tab
                          eventKey="contact-details"
                          className=" tab-content"
                          title="Contact Details"
                        >
                          <div>
                            <EmployerCompanyContact
                              dispatch={dispatch}
                              companyData={companyData}
                              employerCompanyState={employerCompanyState}
                              clearForm={clearForm}
                              createEmployerCompany={createEmployerCompany}
                              updateEmployerCompany={updateEmployerCompany}
                              nextTab={nextTab}
                            />
                          </div>
                        </Tab>
                        <Tab
                          eventKey="legal-info"
                          className="tab-content"
                          title="Legal Information"
                        >
                          <div>
                            <EmployerCompanyLegalInfo
                              dispatch={dispatch}
                              companyData={companyData}
                              employerCompanyState={employerCompanyState}
                              clearForm={clearForm}
                              createEmployerCompany={createEmployerCompany}
                              updateEmployerCompany={updateEmployerCompany}
                              nextTab={nextTab}
                            />
                          </div>
                        </Tab>
                        <Tab
                          eventKey="offices"
                          className="tab-content"
                          title="Offices"
                        >
                          <div>
                            <EmployerCompanyOffices
                              dispatch={dispatch}
                              companyData={companyData}
                              employerCompanyState={employerCompanyState}
                              clearForm={clearForm}
                              createEmployerCompany={createEmployerCompany}
                              updateEmployerCompany={updateEmployerCompany}
                              nextTab={nextTab}
                            />
                          </div>
                        </Tab>
                      </Tabs>
                    </div>
                  )}
                </Col>
              </>
            )}

            {!removeEmpty && (
              <Col xs={4} md={2} lg={3} xl={3} xxl={3}>
                <EmptyCard />
              </Col>
            )}
          </Row>
        ) : null}
        {/*  {!showLoading && <div className="mt-5 float-end" style={{
          position: 'sticky',
          bottom: '70px',
          right: '25px'
        }} >
          {isMobile && <OnScreenMenu />}
        </div>} */}
      </Container>
    </>
  );
};

export default EditCompanyScreen;
