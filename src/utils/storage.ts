interface IStorage {
  type?: string;
  value?: any;
  time?: number;
}

export const rm = (key: string) => {
  return localStorage.removeItem(key);
};
export const get = (key: string, fullInfo = false): any | null => {
  let str = localStorage.getItem(key);
  let data = (str ? JSON.parse(str) : {}) as IStorage;
  return fullInfo ? data : data.value;
};
export const set = (key: string, val: any) => {
  let data = {
    type: typeof val,
    value: val,
    time: new Date().getTime(),
  };
  return localStorage.setItem(key, JSON.stringify(data));
};
export const clear = () => {
  return localStorage.clear();
};
