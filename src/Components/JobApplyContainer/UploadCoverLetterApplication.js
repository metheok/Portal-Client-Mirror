import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import css from "./JobApplyContainer.module.css";
import { userFetch } from "../../state/user/userActions";
import Loading from "../Loading/Loading";
import { jobseekerProfileFetch } from "../../state/jobseekerProfile/jobseekerProfileActions";
import { GrDownload } from "react-icons/gr";
import {
  setResumeUploadLoading,
  setResumeUploadSuccess,
  setResumeUploadError,
} from "../../state/jobseekerJobApply/jobseekerJobApplySlice";

const UploadCoverLetterApplication = ({
  disabled,
  fileName,
  setFileName,
  dispatch,
  fileUploading,
  setFileUploading,
}) => {
  const [file, setFile] = useState(null);
  const [fileUploadErr, setFileUploadErr] = useState(null);

  const auth = useSelector((state) => state.auth);
  const { userToken, user } = auth;
  React.useEffect(() => {
    if (fileUploadErr) {
      setFile(null);
    }
  }, [fileUploadErr]);
  const handleFileChange = (e) => {
    setFileUploading(false);
    setFileName(null);
    setFileUploadErr(null);

    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("jobseekerApplicantCover", file);
      setFileUploading(true);
      dispatch(setResumeUploadLoading());
      const resp = await axios.post(
        "/api/jobseeker/application/upload-cover-letter",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const fileName = resp.data?.file;
      dispatch(setResumeUploadSuccess());
      setFileName(fileName);
      setFileUploading(false);
      setFile(null);
    } catch (error) {
      setFileUploading(false);
      dispatch(setResumeUploadError());
      setFileUploadErr(true);
      console.error("Error uploading cover letter:", error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-item-center">
        <div className="align-item-center">
          {file ? (
            <button
              disabled={!file || disabled || fileUploading}
              className={css.button}
              onClick={handleUpload}
            >
              {fileUploading ? "Uploading..." : "Upload Cover letter"}
            </button>
          ) : (
            <div className={css.fileInputContainer}>
              <input
                type="file"
                accept="application/pdf"
                id="fileInputCover"
                onChange={handleFileChange}
              />
              <label htmlFor="fileInputCover" className={css.CustomFileLabel}>
                Upload from this Device
              </label>
            </div>
          )}
          {fileUploadErr && (
            <p className={css.error}>
              Failed to upload cover letter. Please try again
            </p>
          )}

          {!fileUploadErr && (
            <p className={css.infoMessage}>
              Max. size 4MB. Supported format: .pdf
            </p>
          )}
        </div>
        <div>
          {fileUploading ? (
            <Loading />
          ) : file ? (
            <p className={css.fileName}> {file?.name || "cover-letter.pdf"}</p>
          ) : fileName ? (
            <p className={css.fileName}>
              {" "}
              {file?.name || "cover-letter.pdf"} uploaded
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default UploadCoverLetterApplication;
