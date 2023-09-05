import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import css from "./UploadResume.module.css";
import { userFetch } from "../../state/user/userActions";
import Loading from "../Loading/Loading";
import { jobseekerProfileFetch } from "../../state/jobseekerProfile/jobseekerProfileActions";
import { GrDownload } from "react-icons/gr";

const UploadResume = ({ disabled }) => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [fileUploadErr, setFileUploadErr] = useState(null);
  const [fileDLErr, setFileDLErr] = useState(null);

  const [fileUploading, setFileUploading] = useState(false);
  const [fileDownloading, setFileDownloading] = useState(false);

  const auth = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  const { userToken } = auth;
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (fileUploadErr) {
      setFilePreview(null);
      setFile(null);
    }
  }, [fileUploadErr]);
  const handleFileChange = (e) => {
    setFileUploading(false);
    setFileDownloading(false);

    setFileUploadErr(null);
    setFileDLErr(null);

    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("jobseekerResume", file);
      setFileUploading(true);
      await axios.post("/api/jobseeker/profile/upload-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userToken}`,
        },
      });
      setFileUploading(false);

      await dispatch(jobseekerProfileFetch());
      setFile(null);
    } catch (error) {
      setFileUploading(false);

      setFileUploadErr(true);
      console.error("Error uploading resume:", error);
    }
  };

  const handleDownload = async () => {
    try {
      setFileDownloading(true);
      const response = await axios.get(
        "/api/jobseeker/profile/download-resume",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element and initiate the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf");
      document.body.appendChild(link);
      link.click();

      // Clean up the temporary URL
      window.URL.revokeObjectURL(url);
      setFileDownloading(false);

      setFile(null);
    } catch (error) {
      setFileDownloading(false);

      setFileDLErr(true);
      console.error("Error uploading resume:", error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-item-center">
        <div className="align-item-center">
          {file ? (
            <button
              disabled={!file || disabled || fileUploading || fileDownloading}
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
          {fileDLErr && (
            <p className={css.error}>
              Failed to download resume. Please try again
            </p>
          )}
          {!fileUploadErr && (
            <p className={css.infoMessage}>
              Max. size 4MB. Supported format: .pdf
            </p>
          )}
        </div>
        <div>
          {fileUploading || fileDownloading ? (
            <Loading />
          ) : file ? (
            <p className={css.fileName}> {file?.name || "resume.pdf"}</p>
          ) : user.profile.resume ? (
            <GrDownload
              className={css.file}
              alt="img"
              onClick={handleDownload}
              style={{ borderRadius: "10%" }}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default UploadResume;
