import Cookies from 'js-cookie';

export const redirectLoginCookie = 'farskapsportal_redirect-after-login';
export const languageCookie = 'farskapsportal_language';

export const setCookie = (name: string, value: string, expires?: number | Date) => {
    const options = { expires };
    Cookies.set(name, value, options);
};

export const getCookie = (name: string) => Cookies.get(name);

export const removeCookie = (name: string) => Cookies.remove(name);
