package pers.astlvk.acgn.dao.user;

import pers.astlvk.acgn.entity.user.User;

public interface UserDao {
	/**
	 * 添加用户, 包含用户名，密码等信息
	 * 
	 * @param user
	 * @return int
	 */
    int addUser(User user);
    
    /**
     * 根据用户名获取用户信息
     * 
     * @param name
     * @return User对象
     */
    User getUserByName(String name);
}