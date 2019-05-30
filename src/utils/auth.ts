import Cookie from 'js-cookie';

const TokenKey = 'Auth-Token';

export const getToken = () => Cookie.get(TokenKey);

export const setToken = (token: string) => {
  Cookie.set(TokenKey, token, {
    expires: 1
  });
}

export const getUserToken = () => {
  let result: any = {token: ''};
  const userToken = Cookie.get(TokenKey);
  if (userToken) {
    result = JSON.parse(userToken);
  }
  return result.token;
}

export const clearToken = () => {
  Cookie.remove(TokenKey);
}