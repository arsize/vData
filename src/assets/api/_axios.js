import axios from "axios";
import qs from "qs";
import Vue from "vue";

let NODE_ENV = process.env.NODE_ENV;
let DEFAULT_URL = "";

console.log(NODE_ENV);
//自动切生产环境和开发环境,DEFAULT_URL为接口域名
if (NODE_ENV == "development") {
  DEFAULT_URL = "";
} else if (NODE_ENV == "production") {
}

Vue.prototype.$DEFAULT_URL = DEFAULT_URL;

//跨域设置
axios.defaults.withCredentials = true;

// 普通请求方式
const request = axios.create({
  baseURL: DEFAULT_URL,
  time: 1200,
  headers: {
    "content-type": "application/x-www-form-urlencoded"
  }
});

// content-type为json时请求方式
const request_json = axios.create({
  baseURL: DEFAULT_URL,
  time: 1200,
  headers: {
    "content-type": "application/json"
  }
});

//response拦截器
request.interceptors.request.use(
  config => {
    if(sessionStorage.getItem("webToken") && (config.url != 'index/login')){
      config.headers['access_token'] = sessionStorage.getItem("webToken");
    }
    // 在发送请求之前做什么
    if (config.method === "post") {
      
    }else {
      
    }
    return config;
  },
  error => {
    // 对请求错误做些什么，自己定义
    Message({                  //使用element-ui的message进行信息提示
      showClose: true,
      message: error,
      type: "warning"
    });
    return Promise.reject(error);
  }
)
request.interceptors.response.use(
  res => {
    if (res.data.code != 200) {
      if (res.data.code == 415) {

        if (window.location.origin) {
          window.location.href = window.location.origin + '';
        } else {
          window.location.href = "/#/signin";
        }

      } else {

      }
      throw new Error(res.data.code);
    } else {
      return res;
    }
  },
  err => {
    let error = String(err);
    let num1 = error.indexOf("code");
    let errCode = error.substring(num1 + 5);
    if (errCode == 403) {
    } else if (errCode == 415) {
      if (window.location.origin) {
        window.location.href = window.location.origin + '';
      } else {
        window.location.href = "/#/signin";
      }
    }

    throw new Error(err);
  }
);

//response_json拦截器
request_json.interceptors.request.use(
  config => {
    if(sessionStorage.getItem("webToken")){
      config.headers['access_token'] = sessionStorage.getItem("webToken");
    }
    // 在发送请求之前做什么
    if (config.method === "post") {
      
    }else {
      
    }
    return config;
  },
  error => {
    // 对请求错误做些什么，自己定义
    Message({                  //使用element-ui的message进行信息提示
      showClose: true,
      message: error,
      type: "warning"
    });
    return Promise.reject(error);
  }
)
request_json.interceptors.response.use(
  res => {
    if (res.data.code != 200) {
      if (res.data.code == 415) {

        if (window.location.origin) {
          window.location.href = window.location.origin + '';
        } else {
          window.location.href = "/#/signin";
        }

      } else { }
      throw new Error(res.data.code);
    } else {
      return res;
    }
  },
  err => {
    throw new Error(res.data.code);
  }
);

const api_get = (url, params) =>
  request.get(url, {
    params: params
  }).then(
    res => [null, res],
    err => [err, null]
  );

const api_post = (url, params) =>
  request.post(url, qs.stringify(params)).then(
    res => [null, res],
    err => [err, null]
  );

const axios_post_json = (url, params) =>
  request_json.post(url, params).then(
    res => [null, res],
    err => [err, null]
  );

export {
  api_get,
  api_post,
  axios_post_json
};
