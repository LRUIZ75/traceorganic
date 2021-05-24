const PROXY_CONFIG = {
  '/api/*': {

    target: 'https://traceorganic-api.herokuapp.com',
    changeOrigin: true,
    secure: true,
    logLevel: 'debug',
    onProxyReq: (proxyReq, req, res) => {
      // const cookieMap = {
      //   SID: '',
      // };
      // let cookie = '';
      // for (const key in cookieMap) {
      //   if (Object.prototype.hasOwnProperty.call(cookieMap, key)) {
      //     cookie += `${key}=${cookieMap[key]}; `;
      //   }
      // }
      // proxyReq.setHeader('cookie', cookie);
    },
  },
};

module.exports = PROXY_CONFIG;
