import Cookie from 'js-cookie';

const TokenKey = 'Auth-Token';

export const getToken = () => {
  Cookie.get(TokenKey);
}

export const setToken = (token: string) => {
  Cookie.set(TokenKey, token);
}