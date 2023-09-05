import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import Loading from "../Loading/Loading";
import { useSelector } from "react-redux";
import css from "./updateProfile.module.css";
import { cloneDeep, isEqual } from "lodash";
import UpdateProfilePicture from "../UpdateProfilePicture/UpdateProfilePicture";
import moment from "moment";
import { BsPencil } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import EmployerMobileSettings from "../EmployerSettings/EmployerMobileSettings";
import OnScreenMenu from "../OnScreenMenu/OnScreenMenu";

const UpdateProfile = ({ employerProfileUpdate, dispatch, clearErrors, isMobile }) => {
  const {
    user,
    profileLoading,
    profileUpdateLoading,
    profileUpdateSuccess,
    profileUpdateError,
  } = useSelector((state) => state.user);

  const [initialValues, setInitialValues] = useState({});
  const [formValues, setFormValues] = useState({});
  const allPlatformOptions = [
    { name: "Select One", value: "" },
    { name: "Facebook", value: "Facebook" },
    { name: "LinkedIn", value: "LinkedIn" },
    { name: "Twitter", value: "Twitter" },
    { name: "Snapchat", value: "Snapchat" },
    { name: "Instagram", value: "Instagram" },
    { name: "Quora", value: "Quora" },
    { name: "Medium", value: "Medium" },
    { name: "Other", value: "Other" },
  ];
  // social Media state variables
  const [platformName, setPlatformName] = useState("");
  const [platformLink, setPlatformLink] = useState("");
  const [platformOptions, setPlatformOptions] = useState(allPlatformOptions);
  // validations states
  const [editingField, setEditingField] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [mobileEdit, setMobileEdit] = useState(false)
  const [mediaSave, setMediaSave] = useState(false)

  // New state variables to control the success and error alerts visibility

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormChanged, setIsFromChanged] = useState(false);

  React.useEffect(() => {
    if (profileUpdateSuccess || profileUpdateError) {
      setEditingField(null);
    }
    if (profileUpdateError) {
      setFormValues(initialValues);
    }
  }, [profileUpdateSuccess, profileUpdateError, initialValues]);

  React.useEffect(() => {
    const values = {
      name: user.profile.name,
      designation: user.profile.designation,
      email: user.user.email,
      dob:
        user.profile.dob && moment(user.profile.dob).isValid()
          ? moment(user.profile.dob).format("DD/MM/YYYY")
          : "",
      contactNumber: user.profile.contactNumber,
      city: user.profile.city,
      socialMediaLinks: user.profile.socialMediaLinks,
    };
    // Deep copy the received values and set to state
    const copiedValues = cloneDeep(values);

    setInitialValues(copiedValues);
    setFormValues(copiedValues);
  }, [user]);

  React.useEffect(() => {
    setIsFromChanged(!isEqual(formValues, initialValues));
  }, [formValues, initialValues]);

  React.useEffect(() => {
    const arr = allPlatformOptions.filter((e) => {
      if (e.value == "Other") {
        return true;
      } else if (
        !(
          formValues.socialMediaLinks?.filter((each) => each.name === e.value)
            .length > 0
        )
      ) {
        return true;
      }
      return false;
    });
    setPlatformOptions(arr);
  }, [formValues.socialMediaLinks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(clearErrors());
    setShowErrorAlert(false);
    switch (name) {
      case "name":
        setFormValues({ ...formValues, name: value });
        break;
      case "designation":
        setFormValues({ ...formValues, designation: value });
        break;
      case "email":
        setFormValues({ ...formValues, email: value });
        break;
      case "dob":
        setFormValues({ ...formValues, dob: value });

        break;
      case "contactNumber":
        setFormValues({ ...formValues, contactNumber: value });
        break;
      case "city":
        setFormValues({ ...formValues, city: value });
        break;
      default:
        break;
    }
  };

  const handleEdit = (fieldName) => {
    setEditingField(fieldName);
  };

  const handleMobileEdit = () => {
    setMobileEdit(true)
  }

  const handleSave = (e) => {
    const errors = {};
    if (!formValues.name) {
      errors.name = "Please enter name";
    }
    if (formValues.dob) {
      const dobRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
      const test = dobRegex.test(formValues.dob);
      if (!test) {
        errors.dob = "Invalid format";
      } else if (!moment(formValues.dob, "DD/MM/YYYY").isValid()) {
        errors.dob = "Invalid format";
      } else if (
        moment().diff(moment(formValues.dob, "DD/MM/YYYY"), "years") < 10
      ) {
        errors.dob = "DOB should be atleast earlier than 10 years from date";
      }
    }
    if (formValues.contactNumber) {
      const contactNumberRegex = /^\d{10,14}$/;
      const test = contactNumberRegex.test(formValues.contactNumber);
      if (!test) {
        errors.contactNumber = "Invalid format";
      }
    }
    setValidationErrors(errors);
    setEditingField(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: formValues.name,
      designation: formValues.designation,
      dob:
        formValues.dob && moment(formValues.dob, "DD/MM/YYYY").isValid()
          ? moment(formValues.dob, "DD/MM/YYYY").toISOString()
          : "",
      contactNumber: formValues.contactNumber,
      city: formValues.city,
      socialMediaLinks: formValues.socialMediaLinks,
    };

    // return;
    // Check if there are validation errors
    if (Object.keys(validationErrors).length > 0) {
      setShowErrorAlert(true);
      setErrorMessage("Please fill in all the required fields correctly.");
      return;
    }

    try {
      await dispatch(employerProfileUpdate(formData));
      setMobileEdit(false)
      setMediaSave(false)
    } catch (error) {
      // Handle any errors that occur during form submission.
      console.error("Error submitting the form:", error);
      setMobileEdit(false)
      setMediaSave(false)
      setShowErrorAlert(true);
      setErrorMessage("Failed to update profile. Please try again later.");
    }
  };

  const handleCancel = () => {
    setMobileEdit(false)
    setMediaSave(false)
    setEditingField(null);
    setFormValues(initialValues);
    setValidationErrors({});
  };

  const handleAddSocialMedia = () => {
    setValidationErrors({});

    if (platformName && platformLink) {
      const newData = { name: platformName, link: platformLink };
      // Add the new social media data to formValues
      setFormValues({
        ...formValues,
        socialMediaLinks: [...formValues.socialMediaLinks, newData],
      });
      setPlatformName("");
      setPlatformLink("");
      setMediaSave(true)
    }
  };

  const handleRemoveSocialMedia = (index) => {
    // Create a copy of the socialMediaData state and remove the selected item
    let updatedSocialMediaData = [...formValues.socialMediaLinks];
    updatedSocialMediaData.splice(index, 1);
    setMediaSave(true)
    setFormValues({ ...formValues, socialMediaLinks: updatedSocialMediaData });
  };

  if (profileLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }



  return (
    <>
      {profileUpdateSuccess && (
        <SuccessAlert message="Data saved successfully!" />
      )}
      {showErrorAlert && <ErrorAlert message={errorMessage} />}
      {profileUpdateError && <ErrorAlert message={"Something went wrong"} />}
      {isMobile ?
        (
          <>   {/* -----------mobile View ------ */}
            <div className={css.basicContainer}>
              <Link to='/dashboard'>
                <span className={css.backArrow}><BiArrowBack /></span>
              </Link>
              <Form className={`${css.labelSize} p-4 mt-2`} onSubmit={handleSubmit}>

                <Button
                  className={`${css.pencilLink} float-end`}
                  type="button"
                  onClick={handleMobileEdit}
                  disabled={profileUpdateLoading}
                >
                  < BsPencil size={18} />
                </Button>
                <h1 className={css.basicHeading}>Basic Details</h1>
                <Form.Group as={Row} className="mb-2" controlId="name">
                  <Form.Label column xs={12} className={css.BasicLabel}>
                    Full Name
                  </Form.Label>

                  <Col >
                    <Form.Control
                      type="text"
                      name="name"
                      value={formValues.name}
                      onChange={handleChange}
                      isInvalid={validationErrors["name"]}
                      disabled={!mobileEdit}
                      required
                      className={css.BasicReadOnly}
                    />
                    <p style={{ color: "red" }} type="invalid">
                      {validationErrors["name"]}
                    </p>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-2" controlId="designation">
                  <Form.Label column sm={3} className={css.BasicLabel}>
                    Designation
                  </Form.Label>
                  <Col sm={6}>

                    <Form.Control
                      type="text"
                      name="designation"
                      value={formValues.designation}
                      onChange={handleChange}
                      isInvalid={validationErrors["designation"]}
                      disabled={!mobileEdit}
                      className={css.BasicReadOnly}
                      required
                    />
                    <p style={{ color: "red" }} type="invalid">
                      {validationErrors["designation"]}
                    </p>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="email">
                  <Form.Label column sm={3} className={css.BasicLabel}>
                    Email Address
                  </Form.Label>

                  <Col sm={6}>

                    <Form.Control
                      type="email"
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                      isInvalid={validationErrors["email"]}
                      disabled={!mobileEdit}
                      className={css.BasicReadOnly}
                      required
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-2 mt-4" controlId="dob">
                  <Form.Label column sm={3} className={css.BasicLabel}>
                    Date Of Birth
                  </Form.Label>

                  <Col sm={6}>
                    <Form.Control
                      type="text"
                      placeholder="dd/mm/yyyy"
                      value={formValues.dob}
                      name="dob"
                      onChange={handleChange}
                      disabled={!mobileEdit}
                      className={css.BasicReadOnly}
                      required
                    />
                    <p style={{ color: "red" }} type="invalid">
                      {validationErrors["dob"]}
                    </p>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-2" controlId="contactNumber">
                  <Form.Label column sm={3} className={css.BasicLabel}>
                    Contact Number
                  </Form.Label>

                  <Col sm={6}>
                    <Form.Control
                      type="number"
                      name="contactNumber"
                      value={formValues.contactNumber}
                      onChange={handleChange}
                      disabled={!mobileEdit}
                      className={css.BasicReadOnly}
                      required
                    />
                    <p style={{ color: "red" }} type="invalid">
                      {validationErrors["contactNumber"]}
                    </p>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-2" controlId="city">
                  <Form.Label column sm={3} className={css.BasicLabel}>
                    City
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      type="text"
                      name="city"
                      value={formValues.city}
                      onChange={handleChange}
                      isInvalid={validationErrors["city"]}
                      disabled={!mobileEdit}
                      className={css.BasicReadOnly}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {validationErrors["city"]}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-2" controlId="profilePicture">
                  <Form.Label column sm={3} className={`${css.BasicLabel} mt-2`}>
                    Profile Picture
                  </Form.Label>
                  <Col sm={6}>
                    <UpdateProfilePicture disabled={profileUpdateLoading} />
                  </Col>
                </Form.Group>

                {mobileEdit && <Form.Group className="mt-3 " as={Row}>
                  <Col >
                    <Button
                      disabled={
                        profileUpdateLoading ||
                        !isFormChanged ||
                        (validationErrors &&
                          Object.keys(validationErrors).length > 0) ||
                        editingField
                      }
                      type="submit"
                      variant="primary"
                      style={{ width: "5rem", float: 'right' }}
                    >
                      {profileUpdateLoading ? "Saving.." : "Save"}
                    </Button>{" "}
                    <Button
                      variant="primary-outline"
                      type="button"
                      className="me-4 ms-4"
                      style={{ border: "1px solid black", float: 'right' }}
                      onClick={handleCancel}
                      disabled={profileUpdateLoading}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Form.Group>}
              </Form>

              {/* ------ Social Media Code --------- */}
              <Form className={`${css.labelSize} mt-3`} style={{ padding: '2rem 1rem 1rem 1rem' }} >
                <Form.Label  >
                  <h1 className={css.basicHeading}> Social Media Platform</h1>
                </Form.Label>
                {/* Display the entered social media data in the form */}

                {formValues?.socialMediaLinks?.map((data, index) => (
                  <Row className="p-1">
                    <React.Fragment key={index + data.name}>
                      <Col >
                        <Form.Group className="mb-1">
                          <Form.Control
                            type="text"
                            plaintext
                            readOnly
                            className={`${css.BasicLabel}`}
                            defaultValue={data.name}
                          />
                        </Form.Group>
                      </Col>
                      <Col >
                        <Form.Group className="mb-1">
                          <Form.Control
                            type="text"
                            plaintext
                            readOnly
                            className={css.BasicReadOnly}
                            defaultValue={data.link}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={2} className={css.buttonCenter}>
                        <Button
                          type="button"
                          className={css.removeButton}
                          disabled={profileUpdateLoading}
                          onClick={() => handleRemoveSocialMedia(index)}
                        >
                          <GoTrash />
                        </Button>
                      </Col>
                    </React.Fragment>
                  </Row>
                ))}
                <Row className="mb-4 mt-3">
                  <Col>
                    <Form.Group className="mb-1 " controlId="platformName">
                      <Form.Select
                        className={`css.buttonLabel`}
                        name="platformName"
                        placeholder="Name"
                        disabled={profileUpdateLoading}
                        value={platformName}
                        onChange={(e) => setPlatformName(e.target.value)}
                      >
                        {platformOptions.map((e) => {
                          return (
                            <option key={`option${e.name}`} value={e.value}>
                              {e.name}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col >
                    <Form.Group className="mb-1" controlId="platformLink">
                      <Form.Control
                        type="text"
                        className={css.buttonLabel}
                        placeholder="Media Link"
                        name="platformLink"
                        value={platformLink}
                        disabled={profileUpdateLoading}
                        onChange={(e) => setPlatformLink(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={2} className={css.buttonCenter}>
                    <Button
                      className={css.buttonAdd}
                      type="button"
                      variant="primary"
                      onClick={handleAddSocialMedia}
                      disabled={profileUpdateLoading}
                    >
                      Add
                    </Button>
                  </Col>
                </Row>
                {mediaSave && <Form.Group className="mt-3 " as={Row}>
                  <Col >
                    <Button
                      disabled={
                        profileUpdateLoading ||
                        !isFormChanged ||
                        (validationErrors &&
                          Object.keys(validationErrors).length > 0) ||
                        editingField
                      }
                      type="submit"
                      variant="primary"
                      style={{ width: "5rem", float: 'right' }}
                    >
                      {profileUpdateLoading ? "Saving.." : "Save"}
                    </Button>{" "}
                    <Button
                      variant="primary-outline"
                      type="button"
                      className="me-4 ms-4"
                      style={{ border: "1px solid black", float: 'right' }}
                      onClick={handleCancel}
                      disabled={profileUpdateLoading}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Form.Group>}
              </Form>
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              {isMobile && <OnScreenMenu />}
            </div>
          </>
        )
        :
        (
          <> {/* -----------desktop View ------ */}
            <Form className={`${css.labelSize} p-4`} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" as={Row} controlId="name">
                <Form.Label column sm={3}>
                  Full Name
                </Form.Label>
                <Col sm={1}>:</Col>
                <Col sm={6}>
                  {editingField === "name" ? (
                    <Form.Control
                      type="text"
                      name="name"
                      value={formValues.name}
                      onChange={handleChange}
                      isInvalid={validationErrors["name"]}
                      required
                    />
                  ) : (
                    <Form.Control plaintext readOnly defaultValue={formValues.name} />
                  )}
                  <p style={{ color: "red" }} type="invalid">
                    {validationErrors["name"]}
                  </p>
                </Col>
                <Col sm={2}>
                  {editingField === "name" ? (
                    <Button
                      className={css.buttonLink}
                      variant="primary"
                      type="button"
                      onClick={() => handleSave("name")}
                      disabled={profileUpdateLoading}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      className={css.buttonLink}
                      type="button"
                      variant="primary"
                      onClick={() => handleEdit("name")}
                      disabled={profileUpdateLoading}
                    >
                      Edit
                    </Button>
                  )}
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" as={Row} controlId="designation">
                <Form.Label column sm={3}>
                  Designation
                </Form.Label>
                <Col sm={1}>:</Col>
                <Col sm={6}>
                  {editingField === "designation" ? (
                    <Form.Control
                      type="text"
                      name="designation"
                      value={formValues.designation}
                      onChange={handleChange}
                      isInvalid={validationErrors["designation"]}
                      required
                    />
                  ) : (
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={formValues.designation}
                    />
                  )}
                  <p style={{ color: "red" }} type="invalid">
                    {validationErrors["designation"]}
                  </p>
                </Col>
                <Col sm={2}>
                  {editingField === "designation" ? (
                    <Button
                      className={css.buttonLink}
                      variant="primary"
                      type="button"
                      disabled={profileUpdateLoading}
                      onClick={() => handleSave("designation")}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      className={css.buttonLink}
                      type="button"
                      variant="primary"
                      disabled={profileUpdateLoading}
                      onClick={() => handleEdit("designation")}
                    >
                      Edit
                    </Button>
                  )}
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" as={Row} controlId="email">
                <Form.Label column sm={3}>
                  Email Address
                </Form.Label>
                <Col sm={1}>:</Col>
                <Col sm={6}>
                  {editingField === "email" ? (
                    <Form.Control
                      type="email"
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                      isInvalid={validationErrors["email"]}
                      required
                    />
                  ) : (
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={formValues.email}
                    />
                  )}
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" as={Row} controlId="dob">
                <Form.Label column sm={3}>
                  Date Of Birth
                </Form.Label>
                <Col sm={1}>:</Col>
                <Col sm={6}>
                  {editingField === "dob" ? (
                    <Form.Control
                      type="text"
                      placeholder="dd/mm/yyyy"
                      value={formValues.dob}
                      name="dob"
                      onChange={handleChange}
                      //isInvalid={}  Apply isInvalid class based on dobIsValid state
                      required
                    />
                  ) : (
                    <Form.Control plaintext readOnly defaultValue={formValues.dob} />
                  )}
                  <p style={{ color: "red" }} type="invalid">
                    {validationErrors["dob"]}
                  </p>
                </Col>
                <Col sm={2}>
                  {editingField === "dob" ? (
                    <Button
                      className={css.buttonLink}
                      disabled={profileUpdateLoading}
                      variant="primary"
                      type="button"
                      onClick={() => handleSave("dob")}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      className={css.buttonLink}
                      type="button"
                      variant="primary"
                      disabled={profileUpdateLoading}
                      onClick={() => handleEdit("dob")}
                    >
                      Edit
                    </Button>
                  )}
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" as={Row} controlId="contactNumber">
                <Form.Label column sm={3}>
                  Contact Number
                </Form.Label>
                <Col sm={1}>:</Col>
                <Col sm={6}>
                  {editingField === "contactNumber" ? (
                    <Form.Control
                      type="number"
                      name="contactNumber"
                      value={formValues.contactNumber}
                      onChange={handleChange}
                      required
                    />
                  ) : (
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={formValues.contactNumber}
                    />
                  )}
                  <p style={{ color: "red" }} type="invalid">
                    {validationErrors["contactNumber"]}
                  </p>
                </Col>
                <Col sm={2}>
                  {editingField === "contactNumber" ? (
                    <Button
                      className={css.buttonLink}
                      variant="primary"
                      disabled={profileUpdateLoading}
                      type="button"
                      onClick={() => handleSave("contactNumber")}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      className={css.buttonLink}
                      type="button"
                      disabled={profileUpdateLoading}
                      variant="primary"
                      onClick={() => handleEdit("contactNumber")}
                    >
                      Edit
                    </Button>
                  )}
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" as={Row} controlId="city">
                <Form.Label column sm={3}>
                  City
                </Form.Label>
                <Col sm={1}>:</Col>
                <Col sm={6}>
                  {editingField === "city" ? (
                    <Form.Control
                      type="text"
                      name="city"
                      value={formValues.city}
                      onChange={handleChange}
                      isInvalid={validationErrors["city"]}
                      required
                    />
                  ) : (
                    <Form.Control plaintext readOnly defaultValue={formValues.city} />
                  )}
                  <Form.Control.Feedback type="invalid">
                    {validationErrors["city"]}
                  </Form.Control.Feedback>
                </Col>
                <Col sm={2}>
                  {editingField === "city" ? (
                    <Button
                      className={css.buttonLink}
                      variant="primary"
                      disabled={profileUpdateLoading}
                      type="button"
                      onClick={() => handleSave("city")}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      className={css.buttonLink}
                      type="button"
                      disabled={profileUpdateLoading}
                      variant="primary"
                      onClick={() => handleEdit("city")}
                    >
                      Edit
                    </Button>
                  )}
                </Col>
              </Form.Group>

              <Form.Group className="mt-3" as={Row} controlId="profilePicture">
                <Form.Label className="mt-2" column sm={3}>
                  Profile Picture
                </Form.Label>
                <Col className="mt-2" sm={1}>
                  :
                </Col>
                <Col sm={6}>
                  <UpdateProfilePicture disabled={profileUpdateLoading} />
                </Col>
              </Form.Group>

              {/* ------ Social Media Code --------- */}

              <Form.Label className="mt-4" style={{ fontWeight: "700" }}>
                Social Media Platform
              </Form.Label>
              {/* Display the entered social media data in the form */}
              <Row className="p-1">
                {formValues?.socialMediaLinks?.map((data, index) => (
                  <React.Fragment key={index + data.name}>
                    <Col sm={3}>
                      <Form.Group className="mb-1">
                        <Form.Control
                          type="text"
                          plaintext
                          readOnly
                          defaultValue={data.name}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={1}>:</Col>
                    <Col sm={5}>
                      <Form.Group className="mb-1">
                        <Form.Control
                          type="text"
                          plaintext
                          readOnly
                          defaultValue={data.link}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={2} className={css.buttonCenter}>
                      <Button
                        type="button"
                        className={css.removeButton}
                        disabled={profileUpdateLoading}
                        onClick={() => handleRemoveSocialMedia(index)}
                      >
                        Remove
                      </Button>
                    </Col>
                  </React.Fragment>
                ))}
              </Row>
              <Row className="mb-4">
                <Col sm={3}>
                  <Form.Group className="mb-1 " controlId="platformName">
                    <Form.Select
                      className={`css.buttonLabel`}
                      name="platformName"
                      placeholder="Name"
                      disabled={profileUpdateLoading}
                      value={platformName}
                      onChange={(e) => setPlatformName(e.target.value)}
                    >
                      {platformOptions.map((e) => {
                        return (
                          <option key={`option${e.name}`} value={e.value}>
                            {e.name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col sm={1}>:</Col>
                <Col sm={5}>
                  <Form.Group className="mb-1" controlId="platformLink">
                    <Form.Control
                      type="text"
                      className={css.buttonLabel}
                      placeholder="Media Link"
                      name="platformLink"
                      value={platformLink}
                      disabled={profileUpdateLoading}
                      onChange={(e) => setPlatformLink(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col sm={2} className={css.buttonCenter}>
                  <Button
                    className={css.buttonAdd}
                    type="button"
                    variant="primary"
                    onClick={handleAddSocialMedia}
                    disabled={profileUpdateLoading}
                  >
                    Add
                  </Button>
                </Col>
              </Row>
              <Form.Group className="d-flex justify-content-center mt-2" as={Row}>
                <Col sm={{ span: 5, offset: 7 }}>
                  <Button
                    variant="primary-outline"
                    type="button"
                    className="me-4"
                    style={{ border: "1px solid black" }}
                    onClick={handleCancel}
                    disabled={profileUpdateLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={
                      profileUpdateLoading ||
                      !isFormChanged ||
                      (validationErrors &&
                        Object.keys(validationErrors).length > 0) ||
                      editingField
                    }
                    type="submit"
                    variant="primary"
                    style={{ width: "5rem" }}
                  >
                    {profileUpdateLoading ? "Saving" : "Save"}
                  </Button>{" "}
                </Col>
              </Form.Group>
            </Form>
          </>
        )}

    </>
  );
};

export default UpdateProfile;
