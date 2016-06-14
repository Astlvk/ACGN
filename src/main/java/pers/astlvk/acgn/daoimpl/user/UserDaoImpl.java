package pers.astlvk.acgn.daoimpl.user;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import pers.astlvk.acgn.dao.user.UserDao;
import pers.astlvk.acgn.entity.user.User;

@Repository
public class UserDaoImpl implements UserDao {
	@Resource
	private SqlSession sqlSession;
	
	@Override
	public int addUser(User user) {
		int dx = sqlSession.insert("UserMapper.addUser", user);
		return dx;
	}

	@Override
	public User getUserByName(String name) {
		User user = sqlSession.selectOne("UserMapper.getUserByName", name);
		return user;
	}

}
