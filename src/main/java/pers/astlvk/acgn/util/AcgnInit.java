package pers.astlvk.acgn.util;

import java.security.KeyPair;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

import javax.annotation.Resource;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import pers.astlvk.acgn.dao.user.ZeroFlagDao;

@Component
public class AcgnInit implements ApplicationListener<ContextRefreshedEvent> {
	@Resource
	private ZeroFlagDao zeroFlagDao;
	public static int zeroFlag;
	public static RSAPublicKey publicKey;
	public static RSAPrivateKey privateKey;
	
	@Override
	public void onApplicationEvent(ContextRefreshedEvent arg0) {
		if (arg0.getApplicationContext().getParent() == null) {
			try {
				KeyPair keyPair = RSA.getKeys();
				publicKey = (RSAPublicKey) keyPair.getPublic();
				privateKey = (RSAPrivateKey) keyPair.getPrivate();
				zeroFlag = zeroFlagDao.getZeroFlag();
			} catch (NoSuchAlgorithmException e) {
				e.printStackTrace();
			}
		}
	}

}
