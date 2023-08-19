const baseUrl =
  process.env.NODE_ENV === "production"
    ? `/api`
    : `http://${process.env.REACT_APP_SERVERHOST}:${process.env.REACT_APP_SERVERPORT}/api`;

export default baseUrl;
