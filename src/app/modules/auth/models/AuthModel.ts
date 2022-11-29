export interface AuthModel {
  token: string;
  validTo: string;
  refreshToken?: string;
}

export interface LoginParam {
  email: string;
  password: string;
}

export interface UserModel {
  id: string;
  email?: string;
  phoneNumber?: string;
  companyId?: string;
  companyNameAr?: string;
  companyNameEn?: string;
  companyLogo?: string;
  companyCountryId?: number;
  fullNameEn?: string;
  fullNameAr?: string;
  userType?: string;
  isShowVat?: boolean;
  minCharge?: number;
}

export interface UserInfoModel {
  userMetaData: UserMetaData;
  userInfo: UserModel;
}
export interface UserMetaData {
  vatValue: number;
}