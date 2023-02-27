export const ENPOINT = {
  // auth
  login: "/auth/login",
  logout: "/auth/logout",
  checkAuth: "/auth/checkAuth",

  // create user
  registor: "public/register",
  verify: "public/verify-user",
  resend_verify_code: "public/resend-verify-code",
  reset_password: "public/forgot-password",

  // user profile
  user: "/user",

  // brands
  brands: "/user/brand",

  // location
  provinces: "/public/address/provinces",
  districts: "/public/address/districts",
  wards: "/public/address/wards",
  getJobCate: "/public/get-job-cate",

  // feeds
  createFeed: "/recruiter/feeds",
  getRecruiterFeed: "/recruiter/feeds",
  getRecruiterNotPaidFeeds: "/recruiter/not-paid-feeds",
  getRecruiterReportedFeeds: "/recruiter/reported-feeds",

  // admin
  createCate: "admin/create-cate",
  deleteCate: "admin/delete-cate",
  allUser: "admin/users",
  allFeedsAdmin: "admin/filter-feeds",
  declineFeed: "/admin/feeds/decline",
  approveFeed: "/admin/feeds/approve",
};
