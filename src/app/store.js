import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../state/auth/authSlice";
import userReducer from "../state/user/userSlice";

import employerJobReducer from "../state/employerJob/employerJobSlice";
import employerCompanyReducer from "../state/employerCompany/employerCompanySlice";
import recruiterJobSlice from "../state/recruiterJob/recruiterJobSlice";
import recruiterJobReferralSlice from "../state/recruiterJobReferral/recruiterJobReferralSlice";
import jobseekerJobApplySlice from "../state/jobseekerJobApply/jobseekerJobApplySlice";
import jobseekerJobSlice from "../state/jobseekerJob/jobseekerJobSlice";
import recruiterCandidateReducer from "../state/recruiterCandidate/recruiterCandidateSlice";
import recruiterCandidateSlice from "../state/recruiterCandidate/recruiterCandidateSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    employerJobs: employerJobReducer,
    employerCompany: employerCompanyReducer,
    recruiterJobs: recruiterJobSlice,
    recruiterJobReferral: recruiterJobReferralSlice,
    jobseekerJobApply: jobseekerJobApplySlice,
    jobseekerJobs: jobseekerJobSlice,
    recruiterCandidate: recruiterCandidateReducer,
    candidateList: recruiterCandidateSlice,
    user: userReducer,

    // [authApi.reducerPath]: authApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
