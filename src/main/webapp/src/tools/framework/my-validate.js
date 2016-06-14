(function (global, factory) {
	 typeof define === 'function' && define.amd ? define(['jquery'], factory) : (global.Asv = factory($));
}(this, function ($) {
	var Asv = {};
	Asv.reset = function (el) {
		
	}
	/**
	 * 检查(触发)容器元素下所有需要验证项的自动验证。
	 * 返回验证结果
	 * ca = checkAll
	 * 
	 * @param {String} el
	 * @return {Boolean}
	 */
	Asv.ca = function (el) {
		$(el + ' [data-asv]').blur();//触发容器下所有需要验证项的blur事件
		var numError = $(el).find('.input-help').length;
		if (numError) {
			return false;
		} else {
			return true;
		}
	};
	/**
	 * 自动验证表单触发器，通过blur事件自动验证表单信息。
	 * 传入el作为表单元素的父容器，方便对动态的表单元素也有效果。
	 * 接收可选参数的成功与失败样式。
	 * avb = autoValidateBind
	 * 
	 * @param {String} el	
	 * @param {String} sClass	
	 * @param {String} eClass	
	 */
	Asv.avb = function (el, sClass, eClass) {
		$(el).on('blur', '[data-asv]', function () {
			var el = $(this);
			var str = el.attr('data-asv');//属性值为验证所需参数 - 形如：[[required#param]:info];cNum#param:info
			if (str) {
				el.next('.input-help').remove();//初始化提示区域元素
				var checkObj = {type: '', value: '', dx1: '', dx2: '', info: ''};//定义验证参数结构
				var checkState = true;//设置验证状态，默认为true
				var text = '';//设置提示信息容器，用于存储拼接单个或多个提示信息
				checkObj.value = el.val();//获取需要验证的表单数据
				var checkObjs = str.split(';');//这里开始通过拆分字符串获取各种所需参数，封装进checkObj。
				for (var i = 0; i < checkObjs.length; i++) {
					var A = checkObjs[i].split(':');
					if (A.length == 2) {
						checkObj.info = A[1];
					}
					var B = A[0].split('#');
					checkObj.type = B[0];
					if (B.length == 2) {
						checkObj.dx1 = B[1];
					}
					if (B.length == 3) {
						checkObj.dx2 = B[2];
					}
					var ok = Asv.cv(checkObj.type, checkObj.value, checkObj.dx1, checkObj.dx2);//开始验证
					if (!ok) {//设置验证失败后状态及提示信息
						checkState = false;
						text += '<li>' + checkObj.info + '</li>';
					}
				}
				if (checkState) {//判断状态，然后改变信息与样式
					el.removeClass(eClass);
					el.addClass(sClass);
					el.next('.input-help').remove();
				} else {
					el.removeClass(sClass);
					el.addClass(eClass);
					el.after('<div class="input-help text-red"><ul>' + text + '</ul></div>');
				}
			}
		}); 
	};
	/**
	 * 验证方法选择器，通过类型选择相应验证方法验证数据。
	 * cv = choiseValidator
	 * 
	 * @param {String} type
	 * @param {String} data1
	 * @param {String} data2
	 * 
	 * @return {Boolean}
	 */
	Asv.cv = function (type, data, param1, param2, operator) {
		switch (type) {
			case 'required':
				return this.required(data);
				break;
			case 'nameFormat':
				return this.nameFormat(data);
				break;
			case 'pwdFormat':
				return this.pwdFormat(data);
				break;
			case 'repwd':
				var repwd = $('[name='+param1+']').val();
				return this.cStr(data, repwd);
				break;
			case 'ajax':
				return this.ajax(param1 + data);
				break;
			default:
				return false;
				break;
		}
	};
	/**
	 * 非空验证
	 * 
	 * @param {String} str
	 * 
	 * @return {Boolean}
	 */
	Asv.required = function (str) {
		return /[^(^\s*)|(\s*$)]/.test(str);
	};
	/**
	 * 字符串长度比对
	 * 
	 * @param {String} str
	 * @param {String | Number} num
	 * @param {String} operator
	 * 
	 * @return {Boolean}
	 */
	Asv.strLen = function (str, num, operator) {
		return this.cNum(str.length, num, operator);
	};
	/**
	 * 数值比对验证。
	 * 
	 * @param {Nubmer} dx1
	 * @param {Nubmer} dx2
	 * @param {String} operator
	 * 
	 * @return {Boolean}
	 */
	Asv.cNum = function (dx1, dx2, operator) {
		switch (operator) {
		case '>':
			return dx1 > dx2;
			break;
		case '<':
			return dx1 < dx2;
			break;
		case '==':
			return dx1 == dx2;
			break;
		case '!=':
			return dx1 != dx2;
			break;
		case '>=':
			return dx1 >= dx2;
			break;
		case '<=':
			return dx1 <= dx2;
			break;
		default:
			return false;
			break;
		}
	};
	/**
	 * 比对字符串
	 * 
	 * @param {String} str
	 * 
	 * @return {Boolean}
	 */
	Asv.cStr = function (str, reStr) {
		return str == reStr;
	};
	/**
	 * 密码格式验证, 不允许空格, 6-16位
	 * @param {String} pwd
	 * 
	 * @return {Boolean}
	 */
	Asv.pwdFormat = function (pwd) {
		return /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,16}$/.test(pwd);
	};
	/**
	 * 用户名验证, 中英文下划线开头, 后面中英文数字下划线, 3-16位。
	 * 
	 * @param {String} name
	 * 
	 * @return {Boolean}
	 */
	Asv.nameFormat = function (name) {
//		return /^[a-zA-Zxa0-xff_][0-9a-zA-Zxa0-xff_]{2,15}$/.test(name);
		return /^[a-zA-Z\u4e00-\u9fa5_][0-9a-zA-Z\u4e00-\u9fa5_]{2,15}$/.test(name);
	}
	/**
	 * 用户名存在校验, 发送ajax请求, 判断用户名是否已存在。
	 * get方式, 设置为同步请求; 服务器返回true or false
	 * 
	 * @param {String} url
	 * 
	 * @return {Boolean}
	 */
	Asv.ajax = function (url) {
		var result = false;
		$.ajax({
			url: url,
			type: 'get',
			data: null,
			dataType: 'json',
			async: false,
			success: function (data) {
				result = data[0];
			},
			error: function (xhr, msg, errObj) {
				alert('Asv.ajax Error: ' + msg);
			}
		});
		return result;
	}
	return Asv

}));