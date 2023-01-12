export interface LoginModel {
  username: string;
  password: string;
}

export interface UserProfile {
  data: {
    timestamp: Date;
    status: number;
    error: string;
    message: any;
    data: {
      userId: string;
      email: string;
      phoneNumber: string[];
      fullName: string;
      brands: any;
    };
  };
}
