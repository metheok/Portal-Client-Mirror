import React from "react";
import Header from "../../components/Header/Header";
import { Container, Row } from "react-bootstrap";
import Loading from "../../components/Loading/Loading";
import MobileFooter from "../../components/MobileFooter/MobileFooter";
export default function LoadingScreen({ auth, user, isMobile }) {
  return (
    <div
      style={{
        overflow: "hidden",
      }}
    >
      <Row xs={12}>
        <Header auth={auth} user={user} responsive={isMobile} />
      </Row>
      <Container style={{ height: "150vh" }} className="mt-4 mb-4">
        <Loading />
      </Container>
      {isMobile && <MobileFooter />}
    </div>
  );
}
