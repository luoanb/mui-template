import { get, set } from "../utils/storage";

/**
 * token存储键
 */
export const AUTH_KEY = "AUTH_KEY";

/**
 * 登录页
 */
export const LOGIN_PAGE = "/auth/login"

/**
 * 是否登录
 * @returns 
 */
export const isLogin = () => {
  let val = get(AUTH_KEY, true);
  return (
    !!val?.value?.accessToken &&
    val.time + val?.value?.expiresIn * 1000 > new Date().getTime()
  );
};
