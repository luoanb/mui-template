import { useEffect, useState } from "react";

/**
 * 模拟Vue 同时解决掉useEffect执行两次的问题,支持传递异步回调函数
 * @param callBack 只会执行一次 返回值如果不是可执行函数会被丢弃,可执行函数会作为Destroy
 */
export const useMounted = (callBack: () => any) => {
  let [isInit, setIsInit] = useState(false);
  useEffect(() => {
    let destroy = null;
    setIsInit((old) => {
      if (!old) {
        destroy = callBack();
      }
      return true;
    });
    return typeof destroy == "function" ? destroy : undefined;
  }, []);
};