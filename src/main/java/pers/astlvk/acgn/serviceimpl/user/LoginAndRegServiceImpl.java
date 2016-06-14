package pers.astlvk.acgn.serviceimpl.user;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.binary.Hex;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.google.code.kaptcha.Constants;

import pers.astlvk.acgn.dao.user.UserDao;
import pers.astlvk.acgn.dao.user.ZeroFlagDao;
import pers.astlvk.acgn.entity.user.User;
import pers.astlvk.acgn.service.user.LoginAndRegService;
import pers.astlvk.acgn.util.AcgnInit;
import pers.astlvk.acgn.util.RSA;

@Service
public class LoginAndRegServiceImpl implements LoginAndRegService {
	@Resource
	private UserDao userDaoImpl;
	@Resource
	private ZeroFlagDao zeroFlagDaoImpl;
	
	@Override
	public Map<String, Object> lrInit() {
		Map<String, Object> result = new ConcurrentHashMap<String, Object>();
		if (AcgnInit.zeroFlag == 0) {
			result.put("path", "/reg");
		} else {
			result.put("path", "/login");
		}
		//把指数和模数转换成16进制字符串, 交由前台JS生成公钥。
//		result[1] = Hex.encodeHexString(AcgnInit.publicKey.getPublicExponent().toByteArray());
//		result[2] = Hex.encodeHexString(AcgnInit.publicKey.getModulus().toByteArray());
		return result;
	}
	
	@Override
	public Map<String, Object> getExponentAndModulus() {
//		Object[] result = new Object[2];
		Map<String, Object> result = new ConcurrentHashMap<String, Object>();
		//把指数和模数转换成16进制字符串, 交由前台JS生成公钥。
		result.put("E", Hex.encodeHexString(AcgnInit.publicKey.getPublicExponent().toByteArray()));
		result.put("M", Hex.encodeHexString(AcgnInit.publicKey.getModulus().toByteArray()));
		return result;
	}
	
	@Override
	public Map<String, Object> reg(User user, String code, HttpSession session) {
		Map<String, Object> result = new ConcurrentHashMap<String, Object>();
		String pwdMi = user.getPwd();
		String pwd = "";
		String oCode = (String) session.getAttribute(Constants.KAPTCHA_SESSION_KEY);//获得后台验证码
		String oCodeMD5 = DigestUtils.md5Hex(oCode);//MD5化, 注意服务器重启与用户页面状态的维护。
		if (oCodeMD5.equals(code)) {//比对前后验证码,验证码正确，注册用户。数据写入用户表。
			try {
				pwd = RSA.decryptByPrivateKey(pwdMi, AcgnInit.privateKey);//首先RSA解密密码密文, 这里解密后的字符串是反转的
			} catch (Exception e) {
				e.printStackTrace();
			}
			pwd = StringUtils.reverse(pwd);//反转字符串
			user.setPwd(pwd);//封装解密后密码
			user.setAuz(0);//清理权限字段,使其保持默认值。不然前台更改JS代码既可以向此字段提交数据。不希望前端能更改此字段。
			if (AcgnInit.zeroFlag == 0) {//封装权限标识,简单判断是否是初次注册
				user.setAuz(1);//是的话给予1的权限标识。
				int dx = userDaoImpl.addUser(user);//写入数据库
				if (dx == 1) {//判断写入是否成功
					zeroFlagDaoImpl.updateZeroFlag(1);//更新数据库中标记状态
					AcgnInit.zeroFlag = 1;//更新缓存中标记状态
					session.removeAttribute(Constants.KAPTCHA_SESSION_KEY);//清除验证码
					result.put("infoFlag", "注册成功");
				} else {
					result.put("infoFlag", "注册失败");
				}
			} else {
				result.put("infoFlag", "已初始化");
			}
		} else {
			result.put("infoFlag", "验证码错误");
		}
		return result;
	}
	
	@Override
	public Map<String, Object> login(User user, String code, HttpSession session) {
		Map<String, Object> result = new ConcurrentHashMap<String, Object>();
		String oCode = (String) session.getAttribute(Constants.KAPTCHA_SESSION_KEY);
		String oCodeMD5 = DigestUtils.md5Hex(oCode);
		if (oCodeMD5.equals(code)) {
			User loginUser = userDaoImpl.getUserByName(user.getName());
			if (loginUser != null) {
				String pwd = loginUser.getPwd();
				String pwdMD5 = DigestUtils.md5Hex(pwd + oCode);
				if (pwdMD5.equals(user.getPwd())) {
					session.setAttribute("auz", loginUser.getAuz());//保存权限信息至session
					session.removeAttribute(Constants.KAPTCHA_SESSION_KEY);//删除验证码
					result.put("infoFlag", "登陆成功");
					result.put("path", "/manage");
				} else {
					result.put("infoFlag", "密码错误");
				}
			} else {
				result.put("infoFlag", "用户不存在");
			}
		} else {
			result.put("infoFlag", "验证码错误");
		}
		return result;
	}
}
