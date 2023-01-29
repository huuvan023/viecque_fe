export const ENPOINT = {
  // auth
  login: "api/auth/login".trim(),
  logout: "api/auth/logout".trim(),
  checkAuth: "api/auth/checkAuth".trim(),

  registor: "public/register".trim(),
  verify: "public/verify-user".trim(),
  resend_verify_code: "public/resend-verify-code".trim(),
  get_provinces: "public/address/provinces".trim(),
  reset_password: "public/forgot-password".trim(),
  get_districts: "public/address/districts".trim(),
  get_wards: "public/address/wards".trim(),
  get_all_active_feeds: "public/active-feeds".trim(),
  vnpay_bank_list: "public/vnpay/bank-list".trim(),

  user_brand: "user/brand".trim(),
  vnpay: "user/payment/vnpay".trim(),
  user: "user".trim(),
  get_all_feeds: "admin/feeds".trim(),
  filter_all_feeds: "admin/filter-feeds".trim(),
  approve_feeds: "admin/feeds/approve".trim(),
  decline_feeds: "admin/feeds/decline".trim(),
  get_all_user: "admin/users".trim(),

  recruiter_feeds: "recruiter/feeds".trim(),
};
