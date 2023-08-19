const baseUrl = `http://${process.env.REACT_APP_SERVERHOST}:${process.env.REACT_APP_SERVERPORT}/api`;
//TODO: change server listening to /api/books or /api/collection...
//change urls in fetch requests to use this
export default baseUrl;
