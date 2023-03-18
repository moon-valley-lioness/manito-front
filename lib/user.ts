const USER_TOKEN = 'userToken';

const getUserToken = () => {
  return sessionStorage.getItem(USER_TOKEN);
};

const setUserToken = (token: any) => {
  sessionStorage.setItem(USER_TOKEN, token);
};

export { getUserToken, setUserToken };
