import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import css from './TestimonialSection.module.css'
import cost from '../../images/EmployerSection/cost.svg'


const testimonials = [
	{
		name: "",
		position: "HR Head of a Company",
		quote: "Our recruitment process time reduced to 1/5th after partnering with them. Their efficient approach saved us costs and got us top-notch talents effortlessly."
	},
	{
		name: "",
		position: "Founder of a Startup",
		quote: "Hiring at 10x speed now, all thanks to their cutting-edge technology and minimalistic UX. Finding the right fit is a breeze with them!"
	},
	{
		name: "",
		position: "Head of a Recruitment Agency",
		quote: "With them, our talent pool enjoys curated opportunities, leading to a remarkable rise in monthly placements. Their tech works wonders!"
	},
	{
		name: "",
		position: "Freelance HR",
		quote: "Thriving as a freelance HR, earning 3x more and closing 2x roles monthly! Their platform makes collaboration seamless, a dream come true."
	},
	{
		name: "",
		position: "C-Level Executive",
		quote: "Abundant opportunities matching my specialization and experience. I landed a job quickly and effortlessly, thanks to their precise curation."
	},
	{
		name: "",
		position: "IT Developer",
		quote: "No more sifting through unrelated job postings! Their AI-enabled process is streamlined, and notifications for perfectly-suited openings are a boon. Got my dream job fast!"
	},
	{
		name: "",
		position: "Recruiter from a Small Business",
		quote: "Partnering with them has transformed my business! Access to validated openings has multiplied my placements, and their support is exceptional."
	},
	{
		name: "",
		position: "Jobseeker",
		quote: "I'm delighted with the personalized job recommendations and quick application process. Within weeks, I found the perfect job that aligned with my aspirations."
	},
	{
		name: "",
		position: "Corporate HR Manager",
		quote: "Their extensive candidate screening process and accurate matches have elevated the quality of hires in our organization. We rely on them for top talent!"
	},
	{
		name: "",
		position: "Recruitment Agency Owner",
		quote: "Our collaboration with them opened doors to high-profile clients and opportunities. Their platform has been a game-changer for us."
	},
	{
		name: "",
		position: "Jobseeker",
		quote: "Finally, a platform that understands my skills and career goals! I landed an exciting job opportunity that complements my professional journey."
	},
	{
		name: "",
		position: "Employer - Mid-sized Company",
		quote: "Their expertise in narrowing down candidates for our unique roles has saved us valuable time. Our team is now stronger than ever, all thanks to them!"
	},
];


const TestimonialSection = () => {
	const [dot2Color, setDot2Color] = useState('rgba(19, 61, 122, 1)');
	const [dot3Color, setDot3Color] = useState('white');


	useEffect(() => {
		const dot2Interval = setInterval(() => {
			setDot2Color(prevColor => prevColor === 'white' ? 'rgba(19, 61, 122, 1)' : 'white');
		}, 3000);

		/* 	const dot3Interval = setInterval(() => {
				setDot3Color(prevColor => prevColor === 'white' ? 'rgba(19, 61, 122, 1)' : 'white');
			}, 3000); */

		return () => {
			clearInterval(dot2Interval);
			/* clearInterval(dot3Interval); */
		};
	}, []);

	useEffect(() => {
		if (dot2Color === 'white') {
			setDot3Color('rgba(19, 61, 122, 1)');
		} else {
			setDot3Color('white');
		}
	}, [dot2Color]);

	const settings = {
		infinite: true,
		autoplay: true,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		customPaging: function (i) {
			return <div className={css.customDot}></div>;
		}
	};


	return (
		<>
			<div className={css.testimonialContainer}>
				<div className={` ${css.backgroundImage}  p-0 `}>

					<Container >
						<Row >
							<div className={`text-center ${css.Heading}`}>
								<p className={`${css.para}`}>Hear from our Partners</p>
								<h2 className={css.paraHead} >Success stories and Experiences</h2>
							</div>
							<Col sm={12} md={7} >
								<section className={`${css.testimonials} `} >
									<span className={css.comma}>“</span>
									<div className={css.sliderContainer}>
										<Slider {...settings}>
											{testimonials.map((testimonial, index) => (
												<div key={index} className={`${css.testimonialSlide}`}>
													<Row className="align-items-center">
														<h2 className={css.sliderHead}>Company Name</h2>
														<div className={css.sliderContent}>
															<p className="testimonial-quote">&ldquo;{testimonial.quote}&rdquo;</p>
														</div>
														<div >
															<Row className={css.testimonialCenter}>
																<Col xs={12} className={`d-flex align-items-center ${css.column}`}>
																	<div className={css.testimonialImg}>
																		<img src={cost} style={{ borderRadius: '50%', width: '80px' }} alt='img' />
																	</div>
																	<div >
																		<p className={`${css.testimonialName} m-0`}>Client Name</p>
																		<p className={`${css.testimonialPosition}`}>{testimonial.position}</p>
																	</div>
																</Col>
															</Row>
														</div>
													</Row>
												</div>
											))}
										</Slider>
									</div>
									<span className={css.commaRight}>&rdquo;</span>
								</section>
								<div className={css.dotSection}>
									<div className={`${css.firstDot}`}
									/>
									<div
										className={`${css.secondDot}`}
										style={{ backgroundColor: dot2Color }}
									/>
									<div
										className={`${css.thirdDot}`}
										style={{ backgroundColor: dot3Color }}
									/>
								</div>
							</Col>

							{/* 	<Col md={6} className={css.rightImg}>

									<img src={illustration} style={{ width: '100%' }} alt="Left" className={`${css.firstImg} mb-4`} />

								</Col> */}
						</Row>
					</Container>

				</div>
			</div>
		</>);
}

export default TestimonialSection;
