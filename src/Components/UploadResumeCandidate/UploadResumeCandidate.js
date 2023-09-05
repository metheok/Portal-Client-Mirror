import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import css from "./UploadResumeCandidate.module.css";
import { userFetch } from "../../state/user/userActions";
import Loading from "../Loading/Loading";
import { jobseekerProfileFetch } from "../../state/jobseekerProfile/jobseekerProfileActions";
import { GrDownload } from "react-icons/gr";

const UploadResumeCandidate = ({
  disabled,
  fileName,
  setFileName,
  fileUploading,
  setFileUploading,
}) => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [fileUploadErr, setFileUploadErr] = useState(null);

  const auth = useSelector((state) => state.auth);
  const { userToken, user } = auth;
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (fileUploadErr) {
      setFilePreview(null);
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
      formData.append("candidateResume", file);
      setFileUploading(true);
      const resp = await axios.post(
        "/api/recruiter/candidate/upload-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const fileName = resp.data?.file;

      setFileName(fileName);
      setFileUploading(false);
      setFile(null);
    } catch (error) {
      setFileUploading(false);

      setFileUploadErr(true);
      console.error("Error uploading resume:", error);
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
              {fileUploading ? "Uploading..." : "Upload Resume"}
            </button>
          ) : (
            <div className={css.fileInputContainer}>
              <input
                type="file"
                accept="application/pdf"
                id="fileInputResume"
                onChange={handleFileChange}
              />
              <label htmlFor="fileInputResume" className={css.CustomFileLabel}>
                Choose a file
              </label>
            </div>
          )}
          {fileUploadErr && (
            <p className={css.error}>
              Failed to upload resume. Please try again
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
            <p className={css.fileName}> {file?.name || "resume.pdf"}</p>
          ) : fileName ? (
            <p className={css.fileName}>
              {" "}
              {file?.name || "resume.pdf"} uploaded
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default UploadResumeCandidate;
