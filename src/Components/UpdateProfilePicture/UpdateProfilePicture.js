import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import css from "./UpdateProfilePicture.module.css";
import { userFetch } from "../../state/user/userActions";
import Loading from "../Loading/Loading";
const UpdateProfilePicture = ({ disabled }) => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploadErr, setImageUploadErr] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const { userToken } = auth;
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (imageUploadErr) {
      setImagePreview(null);
    }
  }, [imageUploadErr]);
  const handleFileChange = (e) => {
    setImageUploading(false);

    setImageUploadErr(null);
    setFile(e.target.files[0]);
    if (e.target.files[0]) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setImagePreview(null);
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);
      setImageUploading(true);
      await axios.post("/api/user/uploadProfilePicture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userToken}`,
        },
      });
      setImageUploading(false);

      await dispatch(userFetch());
      setFile(null);
    } catch (error) {
      setImageUploading(false);

      setImageUploadErr(true);
      console.error("Error uploading profile picture:", error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-item-center">
        <div className="align-item-center">
          {imagePreview ? (
            <button
              disabled={!imagePreview || disabled || imageUploading}
              className={css.button}
              onClick={handleUpload}
            >
              {imageUploading ? "Uploading..." : "Save as Profile"}
            </button>
          ) : (
            <div className={css.fileInputContainer}>
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                id="fileInput"
                onChange={handleFileChange}
              />
              <label htmlFor="fileInput" className={css.CustomFileLabel}>
                Choose a file
              </label>
            </div>
          )}
          {imageUploadErr && (
            <p className={css.error}>
              Failed to update picture. Please try again
            </p>
          )}
          {!imageUploadErr && (
            <p className={css.infoMessage}>
              Max. size 4MB. Supported format: .png, .jpeg, .jpg
            </p>
          )}
        </div>
        <div>
          {imageUploading ? (
            <Loading />
          ) : imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ borderRadius: "10%" }}
              className={css.image}
            />
          ) : user?.user.user.profilePicture ? (
            <img
              className={css.image}
              alt="img"
              style={{ borderRadius: "10%" }}
              src={`/${user?.user.user.profilePicture}`}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default UpdateProfilePicture;
