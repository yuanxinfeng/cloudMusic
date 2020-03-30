/*
 * @Description: Vue filter
 * @Author: Do not edit
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2019-07-09 09:00:41
 * @LastEditors: Jasper
 * @LastEditTime: 2020-03-26 14:19:27
 */

const foramt = (time, fmt = "yyyy-MM-dd hh:mm:ss") => {
  let date = new Date(time);
  let o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "H+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

/**
 * @description: 毫秒返回 yyyy-MMM-dd hh:mm
 * @param {time}
 * @return: yyyy-MMM-dd hh:mm
 */

const parseTime = (time) => {
  if (time) {
    let date = new Date(time);
    let year = date.getFullYear();
    /* 在日期格式中，月份是从0开始的，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
    let month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    // 拼接
    return year + "-" + month + "-" + day;
  } else {
    return "";
  }
};

/**
 * @description: 毫秒返回 几分钟 几天前...
 * @param {time}
 * @return: 几分钟 几天前...
 */

const formatTime = (time) => {
  time = +time;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return "刚刚";
  } else if (diff < 3600) {
    return Math.ceil(diff / 60) + "分钟前";
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前";
  } else if (diff < 3600 * 24 * 2) {
    return "1天前";
  }
  return (
    d.getMonth() +
    1 +
    "月" +
    d.getDate() +
    "日" +
    d.getHours() +
    "时" +
    d.getMinutes() +
    "分"
  );
};

/**
 * @description: 把毫秒格式化成 mm:ss
 * @param {duration}
 * @return: mm:ss
 */
const foramtDuration = (duration) => {
  duration = duration / 1000;
  let minutes =
    Math.floor((duration / 60) % 60) < 10
      ? "0" + Math.floor(duration / 60)
      : Math.floor(duration / 60);
  let seconds =
    Math.floor(duration % 60) < 10
      ? "0" + Math.floor(duration % 60)
      : Math.floor(duration % 60);
  return `${minutes}:${seconds}`;
};

/**
 * @description: 通过传进来的值循环显示tip
 * @param {type Object String Arrary}
 * @return: title
 */
const showOverflowToolTip = (arg) => {
  let title = new String();
  if (Object.prototype.toString.call(arg) === "[object Array]") {
    arg.map((n, i) => {
      title += n.name;
      if (arg.length > i + 1) {
        title += " / ";
      }
    });
  }
  return title;
};

/**
 * @description:  过滤添加（） exp: name (name)
 * @param {name}
 * @return: (name)
 */
const addBracket = (names) => {
  let newName = "";
  if (
    Object.prototype.toString.call(names) === "[object Array]" &&
    names.length > 0
  ) {
    names.map((n) => {
      newName += `${n}`;
    });
    return `(${newName})`;
  } else if (typeof names === "string") {
    return `(${names})`;
  } else {
    return "";
  }
};

/**
 * @description: 数字十万处理
 * @param {count}
 * @return:count
 */
const conversionCount = (count) => {
  if (count > 99999) return `${Math.floor(count / 10000)}万`;
  else return Math.floor(count);
};

/**
 * @description: 数字万处理
 * @param {count}
 * @return:count
 */
const conversionCounts = (count) => {
  if (count > 9999) return `${Math.floor(count / 10000)}万`;
  else return Math.floor(count);
};

/**
 * @description: 处理数字索引问题
 * @param {index}
 * @return:
 */
const indexCount = (index) => {
  if (index === 0) index += 1;
  if (index < 10) {
    index = `0${index}`;
  }
  return index;
};

/**
 * @description: 简介截取字符串 ...显示
 * @param {string}
 * @return:
 */

const splitString = (string) => {
  if (string) return `${string.split("\n")[0]}...`;
};
export default {
  foramt,
  parseTime,
  formatTime,
  foramtDuration,
  showOverflowToolTip,
  addBracket,
  conversionCount,
  conversionCounts,
  indexCount,
  splitString
};
