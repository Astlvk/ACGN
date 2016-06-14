package pers.astlvk.acgn.control.user;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import pers.astlvk.acgn.entity.user.User;
import pers.astlvk.acgn.service.user.LoginAndRegService;

@Controller
public class LoginAndRegCtrl {
	@Resource
	private LoginAndRegService loginAndRegServiceImpl;
	
	/**
	 * 登录初始化
	 * @return 模块标识
	 */
	@RequestMapping("/api.initCheck.acgn")
	@ResponseBody
	public Map<String, Object> initCheck() {
		return loginAndRegServiceImpl.lrInit();
	}
	/**
	 * 获得公钥指数和模数, 由前台JS生成公钥
	 * @return 公钥(公共指数, 模数)
	 */
	@RequestMapping("/api.getEM.acgn")
	@ResponseBody
	public Map<String, Object> getExponentAndModulus() {
		return loginAndRegServiceImpl.getExponentAndModulus();
	}

	/**
	 * 注册控制器
	 * 返回注册相关信息，前端Vue组件可根据返回信息做相应处理
	 * 
	 * @param user
	 * @param code
	 * @param session
	 * @return 信息标识
	 */
	@RequestMapping("/api.reg.acgn")
	@ResponseBody
	public Map<String, Object> reg(User user, String code, HttpSession session) {
		return loginAndRegServiceImpl.reg(user, code, session);
	}
	
	/**
	 * 登录控制器？
	 * 返回登录相关信息，前端Vue组件可根据返回信息做相应处理
	 * 
	 * @param user
	 * @param code
	 * @param session
	 * @return 信息标识 & 模块路径
	 */
	@RequestMapping("/api.login.acgn")
	@ResponseBody
	public Map<String, Object> login(User user, String code, HttpSession session) {
		return loginAndRegServiceImpl.login(user, code, session);
	}

}
