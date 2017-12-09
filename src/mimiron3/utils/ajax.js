import $ from 'jquery'
import { contentPath } from '../../settings';

const ajax = $.ajax;

export default ajax;

export const jsonp = (opt) => {
  opt.url = opt.url.indexOf("http") === -1?( contentPath+opt.url ):opt.url;
  opt.dataType = opt.dataType || "jsonp";
  opt.contentType = opt.contentType || "application/jsonp; charset=utf-8";
  opt.scriptCharset = opt.scriptCharset || "utf-8";
  ajax(opt);
};

