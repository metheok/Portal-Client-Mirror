import React from "react";
import { useDispatch } from "react-redux";
import { logoutAndClearUser } from "../../state/auth/authSlice";
import EmployerProfileCard from "./EmployerProfileCard";
import JobseekerProfileCard from "./JobseekerProfileCard";
import RecruiterPofileCard from "./RecruiterPofileCard";
import TabletEmployerCard from '../TabletProfileCard/EmployerTabletProfileCard'
import TabletJobseekerCard from '../TabletProfileCard/JobseekerTabletProfileCard'
import CustomDashboardModal from '../CustomDasboardModal/CustomEmployerModal'

const ProfileCard = ({ location, user }) => {

  const [modalVisible, setModalVisible] = React.useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const dispatch = useDispatch();

  const handleLinkClick = () => {
    dispatch(logoutAndClearUser());
  };


  const [shouldShowTabletEmployerCard, setShouldShowTabletEmployerCard] = React.useState(false);

  React.useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth < 992) {
        setShouldShowTabletEmployerCard(true);
      } else {
        setShouldShowTabletEmployerCard(false);
      }
    };

    // Initial check
    handleWindowResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleWindowResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);



  let detailsArray = [];

  switch (user.user.userType) {
    case "recruiter":
      detailsArray = <RecruiterPofileCard handleLinkClick={handleLinkClick} location={location} user={user} />;
      break;
    case "jobseeker":
      detailsArray = shouldShowTabletEmployerCard ? (
        <TabletJobseekerCard handleLinkClick={handleLinkClick} location={location} user={user} />
      ) : (
        <JobseekerProfileCard handleLinkClick={handleLinkClick} location={location} user={user} />
      );
      break;
    case "employer":
      detailsArray = shouldShowTabletEmployerCard ? (
        <TabletEmployerCard openModal={openModal} handleLinkClick={handleLinkClick} location={location} user={user} />
      ) : (
        <EmployerProfileCard handleLinkClick={handleLinkClick} location={location} user={user} />
      );
      break;
  }
  return (
    <>
      {detailsArray}
      <CustomDashboardModal showModal={modalVisible} closeModal={closeModal} user={user} />
    </>
  );
};


export default ProfileCard;
