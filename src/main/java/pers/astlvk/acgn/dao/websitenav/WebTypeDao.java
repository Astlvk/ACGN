package pers.astlvk.acgn.dao.websitenav;

import java.util.List;

import pers.astlvk.acgn.entity.websitenav.WebType;

public interface WebTypeDao {
	/**
	 * 获取所有webType信息
	 * 
	 * @return list<WebType>
	 */
	List<WebType> getAllWebType();
	
	/**
	 * 添加webType, 只有一个name信息。
	 * 
	 * @param name
	 * @return int; 主键Id
	 */
	int addWebType(WebType webType);
	
	/**
	 * del webType By Id
	 * 
	 * @param id
	 * @return
	 */
	int delWebTypeById(int id);
	
	/**
	 * update name of webType By Id
	 * 
	 * @param webType
	 * @return int
	 */
	int updateWebTypeById(WebType webType);
}
