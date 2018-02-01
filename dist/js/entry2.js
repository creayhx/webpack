/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ 3:
/***/ (function(module, exports) {

﻿(function(w){
	Date.prototype.format = function(timeStr){ //日期
	    if(this.toString() ==='Invalid Date'){return ''};
	    var opt = {
	        'Y+' : this.getFullYear(),
	        'M+' : this.getMonth() + 1,
	        'D+' : this.getDate(),
	        'h+' : this.getHours(),
	        'm+' : this.getMinutes(),
	        's+' : this.getSeconds()
	    };
	    for(var k in opt){
	        timeStr = timeStr.replace( new RegExp(k,'g') , opt[k] < 10 ? '0' + opt[k] : opt[k] );
	    };
	    return timeStr;
	};
	String.prototype.render = function(data,opt){ // 字符串渲染
	    var str = this.toString();
	    if(opt){for( var key in opt ){data[key] = opt[key] } };
	    for(var k in data){
	        str = str.replace(new RegExp('{'+k+'}', 'g'),data[k]);
	    };
	    return str;
	};
	String.prototype.toSerial = function(){ // 序列编号
		var str = this.toString();
		for(var i = 0; i < (3 - this.length);i++){
			str = '0' + str;
		};
		return str;
	};
	w.load = function(){
		$(document.body).append('<div class="load-mask"><img src="img/loading.gif"></div>')
	};
	w.close = function(){
		$(document.body).find('.load-mask').remove();
	};
	w.api ={ // 与后端api交互
		data : null,
		run : function(action, info, flag){
			this.data = window.evidence.callBackClient('api_' + action, info ? !flag ? JSON.stringify(info) : info : '');
			return this
		},
		setLocal : function(key,value){
			localStorage.setItem('app_' + key, value);
			return this
		},
		getLocal : function(key){
			return localStorage.getItem('app_' + key);
		},
		rmLocal : function(){
			var argv = arguments;
			if(argv.length){
				for(var i = 0; i < argv.length; i++){
					localStorage.removeItem('app_' + argv[i]);
				};
			};
			return this
		},
		ver : function(cb){
			var t = this;
			t.data = JSON.parse( t.data );
			if(t.data.result){
				cb && cb( t.data.data );
			}else{
				close();
				POP.alert({ msg: t.data.msg })
			}
			return t
		},
	};
	$.fn.getChildWidth = function(){ //获取子元素总宽度
		var width = 0;
		this.children().each(function(i,n){
			width += $(n).outerWidth() + 5.5;
		});
		return width;
	};
	$.fn.getData = function(){ // 获取表单数据
		var opt = {}
		this.each(function(i,n){
			opt[ $(n).attr('name') ] = $(n).val();
		});
		return opt;
	};
	$.fn.splice = function(){ // 拼接html字符串
		var html = '';
		this.each(function(i,n){
			html += n.outerHTML ? n.outerHTML : n.nodeValue
		});
		return html;
	};
	
})(window);

/***/ })

/******/ });