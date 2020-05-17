/*
 * @Author: luoshun
 * @LastEditors: luoshun
 * @Description: 公共方法
 * @email: luoshun83@163.com
 * @Date: 2019-04-16 15:57:43
 * @LastEditTime: 2020-04-09 09:42:53
 */
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

export class GlobalToolService {

  /****
   * 替换文件
   * text :为源文件
   * rep:需要替换的符号
   * rex:替换后的符号
   * **/
  static textReplaceAll(text: string, regexp: string, replacement: string): string {
    return text.replace(regexp, replacement);
  }

  /**
   * 取消订阅
   */
  static autoUnSubscribe(subscribes: Subscription[]) {
    subscribes.forEach((sub) => {
      if (!sub.closed) {
        sub.unsubscribe();
      }
    });
  }

  /**
   * 获取当前时间戳
   */
  static getMilliseconds(): number {
    return Date.now();
  }

  /**
   * 获取时间戳
   * @param date 时间
   */
  static getMillisecondsFromDate(date: string): number {
    return Date.parse(date);
  }

  /**
   * 秒数转时间
   * @param seconds 秒数
   */
  static getDateByMilliseconds(seconds: number): Date {
    return new Date(seconds);
  }

  /**
   * 获取当前时间秒数
   */
  static getTimestamp(): number {
    return this.getMilliseconds() / 1000;
  }

  /**
   * 根据指定日期获取秒数
   * @param date 指定日期
   */
  static getTimestampFromDate(date: string): number {
    return Date.parse(date) / 1000;
  }

  /**
   * 秒数转日期
   * @param seconds 秒数
   */
  static getDateByTimetamp(seconds: number): Date {
    return new Date(seconds * 1000);
  }

  /**
   * 获取当前年月
   * @param seg 分隔符 / -
   */
  static getYearMonth(seg?: string): string {
    if (seg === void 0) {
      seg = '-';
    }
    const myDate = new Date();
    const month = myDate.getMonth() + 1;
    if (month < 10) {
      return myDate.getFullYear() + seg + '0' + month;
    } else {
      return myDate.getFullYear() + seg + month;
    }
  }

  /**
   * 获取当前年月日
   * @param seg 分隔符
   */
  static getDate(seg?: string): string {
    if (seg === void 0) {
      seg = '-';
    }
    const myDate = new Date();
    const month = myDate.getMonth() + 1;
    const day = myDate.getDate();
    let value = '';
    if (month < 10) {
      value = myDate.getFullYear() + seg + '0' + month;
    } else {
      value = myDate.getFullYear() + seg + month;
    }
    if (day < 10) {
      value += seg + '0' + day;
    } else {
      value += seg + day;
    }
    return value;
  }

  /**
   * @description: 时间格式化处理
   * @param date: 日期
   * @param fmt: 格式化字符串
   * @return:
   */
  static dateFormat(date: Date, fmt: string): string {
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)); }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }
    return fmt;
  }

  /**
   * @description: 时间格式化处理
   * @param fmt 格式化字符串
   * @return:
   */
  static stringDateFormat(dateStr: string, fmt: string): string {
    return this.dateFormat(this.stringToDate(dateStr), fmt);
  }

  /**
   * @description: 时间戳格式化处理
   * @param fmt 格式化
   * @return:
   */
  static timestampFormat(timestamp: number, fmt: string): string {
    return this.dateFormat(new Date(timestamp), fmt);
  }

  /**
   * 字符串转时间（yyyy-MM-dd HH:mm:ss、yyyy/M/d HH:mm:ss、yyyyMMddHHmmss、yyyyMMddHHmm、yyyyMMdd）
   * result （分钟）
   */
  static stringToDate(fDate: string): Date {
    if (!fDate) {
      return null;
    }
    let fullDate = fDate.split('-');
    if (fullDate.length > 1) {
      return new Date(Date.parse(fDate.replace(/-/g, '/')));
    }
    fullDate = fDate.split('/');
    if (fullDate.length > 1) {
      return new Date(Date.parse(fDate.replace(/\//g, '/')));
    }
    let year = '';
    let month = '';
    let day = '';
    if (fDate.length > 7) {
      year = fDate.substr(0, 4);
      month = fDate.substr(4, 2);
      day = fDate.substr(6, 2);
    }
    let hour = '';
    let min = '';
    if (fDate.length > 11) {
      hour = fDate.substr(8, 2);
      min = fDate.substr(10, 2);
    }
    let second = '';
    if (fDate.length > 13) {
      second = fDate.substr(12, 2);
    }
    if (fDate.length === 8) {
      return new Date(Date.parse(year + '/' + month + '/' + day));
    }
    if (fDate.length === 12) {
      return new Date(Date.parse(year + '/' + month + '/' + day + ' ' + hour + ':' + min));
    }
    if (fDate.length === 14) {
      return new Date(Date.parse(year + '/' + month + '/' + day + ' ' + hour + ':' + min + ':' + second));
    }
  }

  /**
   * 日期格式化 yyyy-mm-dd
   * @param params 日期
   */
  static dateFormatter(params: Date) {
    const year = params.getFullYear();
    const month = params.getMonth() < 10 ? '0' + params.getMonth() : params.getMonth();
    const date = params.getDate() < 10 ? '0' + params.getDate() : params.getDate();
    return `${year}-${month}-${date}`;
  }

  /**
   * 日期时间格式化 yyyy-mm-dd hh:mm:ss
   * @param params 日期时间
   */
  static datetimeFormatter(params: Date) {
    const year = params.getFullYear();
    const month = params.getMonth() < 10 ? '0' + params.getMonth() : params.getMonth();
    const date = params.getDate() < 10 ? '0' + params.getDate() : params.getDate();
    const hour = params.getHours() < 10 ? '0' + params.getHours() : params.getHours();
    const minute = params.getMinutes() < 10 ? '0' + params.getMinutes() : params.getMinutes();
    const second = params.getSeconds() < 10 ? '0' + params.getSeconds() : params.getSeconds();

    return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
  }

  /**
   * 日期格式化 yyyy-mm-dd
   * @param params 日期
   */
  static dateTimeFormatDate(params: Date) {
    params = new Date(params);
    const year = params.getFullYear();
    const month = ((params.getMonth() + 1) < 10) ? '0' + (params.getMonth() + 1) : (params.getMonth() + 1);
    const date = params.getDate() < 10 ? '0' + params.getDate() : params.getDate();
    return `${year}-${month}-${date}`;
  }
}
