import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import company1 from "../../images/ClientSection/company1.svg";
import company2 from "../../images/ClientSection/company2.svg";
import company3 from "../../images/ClientSection/company3.svg";
import company4 from "../../images/ClientSection/company4.svg";
import { Button, Row, Col } from "react-bootstrap";
import { IoIosArrowForward } from "react-icons/io";
import Recruiter from "../../images/ClientSection/Recruiter.svg";
import Employer from "../../images/ClientSection/Employer.svg";
import Talent from "../../images/ClientSection/Talents.svg";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import css from "./ClientSection.module.css";

const ClientSection = () => {
  const sliderRef = useRef(null);
  const [ref, inView] = useInView();

  const carouselSettings = {
    /* dots: true, */
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  /* 	const handlePrevSlide = () => {
			if (sliderRef.current) {
				sliderRef.current.slickPrev();
			}
		}; */

  const handleNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <>
      <style>
        {`
				.slick-prev {
	left: -25px;
	display: none !important;
}

.slick-next {
	display: none !important;
}
				`}
      </style>
      <div className={` ${css.clientContainer}'`} ref={ref}>
        <Row>
          <Col xs={12} md={12} lg={6}>
            <Row>
              <div className="d-flex justify-content-center align-item-center text-center">
                <div className={css.imageItem}>
                  <img src={Employer} alt="Employer" />
                  <div className={css.counter}>
                    {inView && <CountUp start={0} end={100} duration={4} />}{" "}
                    <span>+</span>
                  </div>
                  <p className={css.paraHead}>Employers</p>
                </div>
                <div className={css.imageItem}>
                  <img src={Recruiter} alt="Recruiter" />
                  <div className={css.counter}>
                    {inView && <CountUp start={0} end={99} duration={4} />}{" "}
                    <span>+</span>
                  </div>
                  <p className={css.paraHead}>Recruiters</p>
                </div>
                <div className={css.imageItem}>
                  <img src={Talent} alt="Talent" />
                  <div className={css.counter}>
                    {inView && <CountUp start={0} end={50} duration={4} />}{" "}
                    <span>+</span>
                  </div>
                  <p className={css.paraHead}>Talents</p>
                </div>
              </div>
            </Row>
          </Col>
          <Col sm={12} md={12} lg={6}>
            <div className={`${css.carouselControls}`}>
              <p className={css.paraHead}>Our Clients</p>
              <h3>Trusted by Industry Leaders - Our Clients Include</h3>
              <Slider ref={sliderRef} {...carouselSettings}>
                <div className={css.controlImg}>
                  <img
                    src={company1}
                    alt="Client 1"
                    style={{ height: "100px", width: "100px" }}
                  />
                </div>
                <div className={css.controlImg}>
                  <img
                    src={company2}
                    alt="Client 2"
                    style={{ height: "100px", width: "100px" }}
                  />
                </div>
                <div className={css.controlImg}>
                  <img
                    src={company3}
                    alt="Client 3"
                    style={{ height: "100px", width: "100px" }}
                  />
                </div>
                <div className={css.controlImg}>
                  <img
                    src={company4}
                    alt="Client 4"
                    style={{ height: "100px", width: "100px" }}
                  />
                </div>
              </Slider>
              <div>
                <Button
                  className={`next-button ${css.nextButton}`}
                  onClick={handleNextSlide}
                >
                  <IoIosArrowForward size={20} className={css.arrowSize} />
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ClientSection;
