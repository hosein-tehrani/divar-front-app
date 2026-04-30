const setCookie = (tokens) => {
  document.cookie = `accessToken=${tokens.accessToken}; max-age=${1 * 24 * 60 * 60}`;
  document.cookie = `refreshToken=${tokens.refreshToken}; max-age=${30 * 24 * 60 * 60}`;
};
const getCookie = (cookieName) => {
  const cookie = document.cookie;
  console.log("cookie: ", cookie);
  if (!cookie) {
    return "";
  }
  const cookieSTR = cookie
    .split(";")
    .find((token) => token.split("=")[0] === cookieName);
  if (cookieSTR) return cookieSTR.split("=")[1];
  else return "";
};

export { setCookie, getCookie };
