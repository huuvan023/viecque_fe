import { LoginModel } from "./../models/login.model";
import { ENPOINT } from "./endpoint";
export async function login(
  body: LoginModel,
  endpoint: string = ENPOINT.login
): Promise<any> {
  return null;
}
