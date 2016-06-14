package pers.astlvk.acgn.daoimpl.user;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import pers.astlvk.acgn.dao.user.ZeroFlagDao;

@Repository
public class ZeroFlagDaoImpl implements ZeroFlagDao {
	@Resource
	private SqlSession sqlSession;

	@Override
	public int getZeroFlag() {
		int dx = sqlSession.selectOne("ZeroFlagMapper.getZeroFlag");
		return dx;
	}

	@Override
	public int updateZeroFlag(int flag) {
		int dx = sqlSession.update("ZeroFlagMapper.updateZeroFlag", flag);
		return dx;
	}

}
