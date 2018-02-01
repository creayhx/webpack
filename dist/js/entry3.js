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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ 4:
/***/ (function(module, exports) {

$(function(){
	var D = {
		inp : $('.lg-inp')
	};
	$('.lg-inp input').focus(function(){ //input 显示当前激活input
		$(this).addClass('border');
		$(this).parent().addClass('show');
	}).blur(function(){
		$(this).parent().removeClass('show');
		$(this).removeClass('border');
	});
	$('.lg-login').on('click',function(){ //登录
		var data = D.inp.find('input').getData();
		if(data.user && data.password){
			api.run('login', data ).ver(function(data){
				api.setLocal('userId', data.userId);
				api.setLocal('teamId', data.teamId);
				window.location.href="system.html";
			});
		}else{
			POP.alert({ msg: '请先填入用户名和密码'});
		};
	});
	$('.lg-import').on('click',function(){ // 导入
		api.run('ziplist').ver(function(data){ // 获取zip包列表
			var ul = '<ul class="zip-list">{lis}<ul>';
			var html = [], zipName = '',zipPass='';
			if(data.length){
				data.forEach(function(n,i){
					html.push( '<li '+ (i == 0 ? 'class="active"' : '') +'>'+ n +'</li>' )
				});
			}else{
				html.push('<p>当前没有zip包</p>');
			};
			POP.select({
				title:'请选择zip包 ',
				msg: ul.render({ lis : html.join('')}),
				callback_1 : function(parent){
					var zip = parent.find('.active');
					if(zip.length){
						zipName = zip.text();
						POP.select({
							title:'请输入Zip密码',
							msg:'<input class="pwd" type="password" placeholder="没有密码请为空">',
							callback_1:function(parent){
								zipPass = parent.find('.pwd').val();
								var firstData = {name : zipName, password : zipPass, force : false};
								api.run('import', firstData ).ver(function(data){
									if(data && data.length){ //判断是否有重复系统
										var text = [];
										var systemList = [];
										data.forEach(function(n,i){
											text.push(n.SystemName);//+ String(n.AssessId)
											systemList.push({
												systemId : n.SystemId,
												assessId : n.AssessId
											});
										});
										POP.select({
											title : '导入文件',
											msg : text.join(',') + '已存在 是否执行如下操作?',
											btn_1 : '移除旧系统导入',
											callback_1 : function(){
												systemList.forEach(function(n,i){
													api.run('sysremove', n)
												});
												firstData.force = true;
												api.run('import', firstData ).ver(function(){
													POP.alert({msg : '导入成功' })
												});
											},
											btn_2 : '跳过旧系统导入',
											callback_2 : function(){
												firstData.force = true;
												api.run('import', firstData ).ver(function(){
													POP.alert({msg : '导入成功' })
												})
											},
											btn_3 : '取消',
										});
									}else{
										POP.alert({msg : '导入成功'});
									};
								});
							}
						});
					}
				}
			});
		});
	});

	$('body').delegate('.zip-list li','touchend',function(){ // 选择zip文件
		$(this).parent().find('.active').removeClass('active');
		$(this).addClass('active');
	});
	$('input').focus(function(){ // 优化帐号密码填写区域
		$('.lg-container').css('top','40%')
	}).blur(function(){
		$('.lg-container').css('top','50%')
	});
	api.rmLocal(//参数初始化
		'userId',
		'teamId',
		'systemId',
		'systemName',
		'assessId',
		'nodeId',
		'nodeName',
		'categoryId',
		'categoryName',
		'noId',
		'tableGuid'
	); 
});


/***/ })

/******/ });