import { React, useState, useEffect } from "react";
import "./App.css";
import "./Mobile.css";
import Header from "./components/Header/Header";
import { Row } from "react-bootstrap";
import LoadingScreen from "./screens/LoadingScreen/LoadingScreen.js";
import { useDispatch, useSelector } from "react-redux";
import { userFetch } from "./state/user/userActions";
import Routing from "./routes/Routing";
import Footer from "./components/Footer/Footer";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { auth, user } = state;
  useEffect(() => {
    dispatch(userFetch());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    // Check initial window size
    setIsMobile(window.innerWidth <= 767);

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const { loading } = auth;
  const { userLoading } = user;
  if (loading || userLoading) {
    return <LoadingScreen isMobile={isMobile} user={user} auth={auth} />;
  }
  return (
    <>
      <div
        style={{
          overflow: "hidden",
        }}
      >
        <Row xs={12}>
          <Header auth={auth} user={user} responsive={isMobile} />
        </Row>
        <div>
          <Routing />
        </div>
        <Footer isMobile={isMobile} auth={auth} user={user} />
      </div>
    </>
  );
}

export default App;
