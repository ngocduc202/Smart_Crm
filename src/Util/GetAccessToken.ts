import Cookies from 'js-cookie';
export const getAccessToken = (AccessToken: string): string | undefined => {
    return Cookies.get(AccessToken);
};

export const removeCookie = (AccessToken: string): void => {
    Cookies.remove(AccessToken);
};