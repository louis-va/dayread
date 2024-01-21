// localStorageUtils.ts
const localStorageKey: string = "userName";

export const getUserName = (): string => localStorage.getItem(localStorageKey) || "";
export const setUserName = (userName: string): void => localStorage.setItem(localStorageKey, userName);
