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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ (function(module, exports) {

(function(w) {
  w.POP = {
    alert: function(opt) {
        opt = $.extend({
            title: '信息',
            msg: '提示信息',
            color: null,
            foottext: '确定',
            callback: null
        }, opt);
        var tmp = $('<div class="pop_up"><div class="pop-c"><div class="bd"><p>' + opt.title + '</p><p>' + opt.msg + '</p></div><div class="foot">' + opt.foottext + '</div></div></div>').appendTo($('body'));
        if(opt.color) {
            tmp.find('.bd p').last().addClass('red');
        }
        tmp.find('.foot').click(function() {          
            opt.callback && opt.callback(tmp);
            tmp.remove();
            tmp = null;
        });
        tmp.show();
    },
    select: function(opt) {
        opt = $.extend({
            title: '信息',
            msg: '信息',
            color: null,
            btn_1: '确认',
            callback_1: null,
            btn_2: '取消',
            callback_2: null
        }, opt);
        var tmp = $('<div class="pop_up"><div class="pop-c"><div class="bd"><p>' + opt.title + '</p><p>' + opt.msg + '</p></div><div class="confirm-btn confirm-btn-1">' + opt.btn_1 + '</div><div class="confirm-btn confirm-btn-2">' + opt.btn_2 + '</div>'+(opt.btn_3 ? '<div class="confirm-btn confirm-btn-3">' + opt.btn_3 + '</div>' : '')+'</div></div></div>');
        if(opt.btn_3){
          tmp.find('.confirm-btn').css('width','33%');
          tmp.find('.confirm-btn-2').css('border-right','1px solid #e8e8e8');
          tmp.find('.pop-c').css('width','40%');
        }
        $('body').append(tmp);
        if(opt.color) {
          tmp.find('.comfirm-text').addClass(opt.color);
        }
        tmp.find('.confirm-btn-1').click(function() {
          opt.callback_1 && opt.callback_1(tmp);
          tmp.remove();
          tmp = null;
        });
        tmp.find('.confirm-btn-2').click(function() {
          opt.callback_2 && opt.callback_2(tmp);
          tmp.remove();
          tmp = null;
        });
        tmp.find('.confirm-btn-3').click(function() {
          opt.callback_3 && opt.callback_3(tmp);
          tmp.remove();
          tmp = null;
        });
        tmp.find('b').click(function() {
          tmp.remove();
          tmp = null;
        });
        tmp.show();
    }
}
})(window);

/***/ })

/******/ });