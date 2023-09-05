import RegisterScreen from "../screens/RegisterScreen/RegisterScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import DashboardScreen from "../screens/DashboardScreen/DashboardScreen";
import EditJobScreen from "../screens/EditJobScreen/EditJobScreen";

import ViewJobScreen from "../screens/ViewJobScreen/ViewJobScreen";
import JobReferralScreen from "../screens/JobReferralScreen/JobReferralScreen";
import JobApplyScreen from "../screens/JobApplyScreen/JobApplyScreen";

import SearchJobScreen from "../screens/SearchJobScreen/SearchJobScreen";
import ViewCandidateScreen from "../screens/ViewCandidateScreen/ViewCandidateScreen";
import ViewFavouriteJob from "../components/JobseekerSearchJobs/ViewFavouriteJob";
import ViewClosedJob from "../components/JobseekerSearchJobs/ViewClosedJob";
import ViewAppliedJob from "../components/JobseekerSearchJobs/ViewAppliedJob";
import ViewJobDetails from "../components/ViewJob/ViewJobDetails";
import EmployerMobileSettings from "../components/EmployerSettings/EmployerMobileSettings";

import EditCompanyScreen from "../screens/EditCompanyScreen/EditCompanyScreen";

import UpdatePasswordScreen from "../screens/UpdatePasswordScreen/UpdatePasswordScreen";
import NotFoundScreen from "../screens/NotFoundScreen/NotFoundScreen";
import AddCandidateScreen from "../screens/AddCandidateScreen/AddCandidateScreen";
const routeConfig = [
  {
    path: "/register",
    component: RegisterScreen,
    exact: true,
  },
  {
    path: "/",
    component: HomeScreen,
    protected: false,
  },
  // add and edit job employer
  {
    path: "/dashboard/job/edit-job",
    component: EditJobScreen,
    protected: true,
  },
  {
    path: "/dashboard/job/edit-job/:id",
    component: EditJobScreen,
    protected: true,
  },
  {
    path: "/dashboard/job/edit-job/:id/:tab",
    component: EditJobScreen,
    protected: true,
  },

  // fetch jobs for all 3 users
  {
    path: "/dashboard/jobs",
    component: ViewJobScreen,
    subPath: "allJobs",
    protected: true,
  },

  {
    path: "/dashboard/refer-job/:jobId",
    component: JobReferralScreen,
    protected: true,
  },
  {
    path: "/dashboard/apply-job/:jobId",
    component: JobApplyScreen,
    protected: true,
  },
  {
    path: "/dashboard/search-jobs",
    component: SearchJobScreen,
    protected: true,
  },
  {
    path: "/dashboard/jobs/favorite",
    component: ViewJobScreen,
    protected: true,
  },
  {
    path: "/dashboard/jobs/applied",
    component: ViewJobScreen,
    protected: true,
  },
  {
    path: "/dashboard/jobs/marked",
    component: ViewJobScreen,
    subPath: "marked",
    protected: true,
  },
  {
    path: "/dashboard/jobs/referred",
    component: ViewJobScreen,
    subPath: "referred",
    protected: true,
  },
  {
    path: "/dashboard/jobs/closed",
    subPath: "closed",
    component: ViewJobScreen,
    protected: true,
  },
  {
    path: "/dashboard/jobs/:id",
    component: ViewJobScreen,
    protected: true,
  },
  {
    path: "/dashboard/search-jobs/:id",
    component: SearchJobScreen,
    protected: true,
  },

  {
    path: "/dashboard/candidate/add",
    component: AddCandidateScreen,
    protected: true,
  },
  {
    path: "/dashboard/candidate/add/:tab",
    component: AddCandidateScreen,
    protected: true,
  },
  {
    path: "/dashboard/candidate/search",
    component: ViewCandidateScreen,
    protected: true,
  },
  {
    path: "/dashboard/candidate/search/:id",
    component: ViewCandidateScreen,
    protected: true,
  },
  {
    path: "/dashboard/candidate/add",
    component: AddCandidateScreen,
    protected: true,
  },

  //employer dashboard edit company
  {
    path: "/dashboard/company",
    component: EditCompanyScreen,
    protected: true,
  },
  {
    path: "/dashboard/company/:tab",
    component: EditCompanyScreen,

    protected: true,
  },

  {
    path: "/dashboard/:slug",
    component: DashboardScreen,
    protected: true,
  },

  {
    path: "/dashboard/:slug/:slug",
    component: DashboardScreen,
    protected: true,
  },
  {
    path: "/dashboard",
    component: DashboardScreen,
    protected: true,
  },
  {
    path: "/dashboard/settings",
    component: EmployerMobileSettings,
    protected: true,
  },
  {
    path: "update-password",
    component: UpdatePasswordScreen,
    protected: true,
  },
  {
    path: "*",
    component: NotFoundScreen,
    protected: false,
  },
  {
    path: "not-found",
    component: NotFoundScreen,
    protected: false,
  },
];

export default routeConfig;
