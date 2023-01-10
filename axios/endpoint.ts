export const ENPOINT = {
  // POST
  login: "public/login".trim(),
  logout: "public/logout".trim(),
  registor: "public/register".trim(),
  verify: "public/verify-user".trim(),
  create_feeds: "recruiter/feeds".trim(),
  create_brand: "user/brand".trim(),
  vnpay: "user/payment/vnpay".trim(),

  // GET
  resend_verify_code: "public/resend-verify-code".trim(),
  get_provinces: "public/address/provinces".trim(),
  reset_password: "public/forgot-password".trim(),
  get_districts: "public/address/districts".trim(),
  get_wards: "public/address/wards".trim(),
  get_all_active_feeds: "public/active-feeds".trim(),
  get_feeds: "recruiter/feeds".trim(),
  get_user_info: "user".trim(),
  get_brand_by_id: "user/brand".trim(),
  vnpay_bank_list: "public/vnpay/bank-list".trim(),
  get_all_feeds: "admin/feeds".trim(),
  filter_all_feeds: "admin/filter-feeds".trim(),
  approve_feeds: "admin/feeds/approve".trim(),
  decline_feeds: "admin/feeds/decline".trim(),
  get_all_user: "admin/users".trim(),

  // PUT
  update_user_brand: "user/brand".trim(),
  update_feeds: "recruiter/feeds".trim(),
  update_user_pass_or_info: "user".trim(),
};
