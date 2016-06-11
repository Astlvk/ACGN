package pers.astlvk.acgn.service.user;

import java.util.Map;

import javax.servlet.http.HttpSession;

import pers.astlvk.acgn.entity.user.User;

public interface LoginAndRegService {
	/**
	 * 登录注册模块初始化
	 * 判断是否是初次使用，然后返回相应模块标识.
	 * 0 待初始化	1 已初始化
	 * 
	 * @return Map<String, Object>
	 */
	Map<String, Object> lrInit();
	
	/**
	 * 获取公钥指数和模数交由前台JS生成公钥用于加密
	 * 
	 * @return Map<String, Object>
	 */
	Map<String, Object> getExponentAndModulus();
	
	/**
	 * 注册模块
	 * 校验验证码后RSA解密密码，然后将用户信息写入数据库，创建用户。
	 * 
	 * @param user
	 * @param code
	 * @param session
	 * @return Map<String, Object>
	 */
	Map<String, Object> reg(User user, String code, HttpSession session);
	
	/**
	 * 登录模块
	 * 校验验证码后，根据用户名获取用户信息，然后通过密码字段判断前台传来的包含密码信息的比对信息。
	 * 比对信息生成规则： [MD5(密码字段值 + 验证码)]。
	 * 登录成功后删除此次生成的验证码。
	 * 
	 * @param user
	 * @param code
	 * @param session
	 * @return Map<String, Object>
	 */
	Map<String, Object> login(User user, String code, HttpSession session);
}
