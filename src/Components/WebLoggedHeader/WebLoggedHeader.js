import React from "react";
import { Image, Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import Logo from "../../images/Header/logo.svg";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/AvatarProfile";
import css from './WebLoggedHeader.module.css'

const WebLoggedHeader = ({ navDetails, profileDetails, user }) => {

  const [tablet, setTablet] = React.useState(window.innerWidth <= 992);

  React.useEffect(() => {
    const handleResize = () => {
      setTablet(window.innerWidth <= 992);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const AvatarSize = tablet ? 35 : 40

  return (
    <>
      <Navbar expand="sm" className="bg-body-tertiary">
        <Container fluid="sm">
          <Link to="/">
            <Navbar.Brand >
              <Image
                alt="logo"
                src={Logo}
                className={`${css.logo}`}
              />{" "}
              <span className={`${css.brandTitle} brand`}>Securing Digital World!</span>
            </Navbar.Brand>
          </Link>
          <Nav>
            {navDetails.map((detail, index) => (
              <Link key={index} to={`/${detail.Link}`}>
                <div className={css.ImageContainer} key={detail.name}>
                  <Image
                    alt="Img"
                    src={detail.icon}
                    className="d-block mx-auto"
                  />{" "}
                  <Nav.Link className={css.ImageText}>{detail.name}</Nav.Link>
                </div>
              </Link>
            ))}
            <div>
              <div>
                <Avatar user={user.user} size={AvatarSize} />
              </div>
              <NavDropdown
                title="My Profile"
                className={css.ImageText}
                id="dropdown-menu-align-responsive-1"
                align={{ sm: "end" }}
              >
                {profileDetails.map((detail, index) => (
                  <NavDropdown.Item
                    key={index}
                    className="mb-3"
                    href={detail.href ? `#action${detail.href}` : null}
                    onClick={
                      detail.clickHandler ? () => detail.clickHandler() : null
                    }
                  >
                    <Link key={detail.name} to={`/${detail.link}`}>
                      <div onClick={detail.handleLogOut}>
                        <Image
                          alt="Img"
                          src={detail.icon}
                          width="22"
                          height="21"
                          className="d-line-block me-2"
                        />{" "}
                        {detail.name}
                      </div>
                    </Link>
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </div>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default WebLoggedHeader;
