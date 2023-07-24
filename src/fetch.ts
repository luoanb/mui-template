import { enqueueSnackbar } from "notistack";
import { AUTH_KEY, LOGIN_PAGE } from "./auth";
import { get } from "./utils/storage";
import { router } from "./page/router";

type DataType = "JSON" | "FormData";
interface PostOption {
  auth: boolean;
  dataType: DataType;
  autoTip: boolean;
}

/*
 * 获取基础地址
 * @returns
 */
export function getServerURL() {
  return window.BASE_URL || import.meta.env.VITE_SERVER_URL;
}

/**
 * 发送post请求
 * @param url
 * @param data
 * @returns
 */
export function post<T = any>(
  url: string,
  data: any = {},
  { auth = true, dataType = "JSON", autoTip = true }: Partial<PostOption> = {}
) {
  let params: any = null;
  if (dataType === "JSON") {
    params = JSON.stringify(data);
  } else {
    params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
  }

  const headers: HeadersInit = {
    Accept: "application/json",
    Authorization: "Bearer " + get(AUTH_KEY)?.accessToken || "",
  };

  dataType === "JSON" ? (headers["Content-Type"] = "application/json") : null;

  return fetch(getServerURL() + url, {
    body: params,
    cache: "no-cache",
    headers,
    method: "POST",
    credentials: "include",
    // mode: "no-cors", //会导致接收不到数据
    // redirect: "follow",
  })
    .then(async (res) => {
      let data = await res.json();
      if (autoTip) {
        switch (res.status) {
          case 400:
            enqueueSnackbar({
              variant: "error",
              message: `错误的参数：${data.message}`,
            });
            break;
          case 401:
            enqueueSnackbar({
              variant: "error",
              message: `未授权，请重新登录`,
            });
            router.navigate(LOGIN_PAGE);
            break;
          case 500:
            enqueueSnackbar({
              variant: "error",
              message: `服务器异常，请重试或联系管理人员`,
            });
            break;
          default:
            break;
        }
      }
      return data as T;
    })
    .catch((e) => {
      enqueueSnackbar({
        variant: "error",
        message: `网络连接失败，请检查网络设置：${e}`,
      });
    });
}
