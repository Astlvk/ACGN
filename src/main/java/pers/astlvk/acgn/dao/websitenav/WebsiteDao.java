package pers.astlvk.acgn.dao.websitenav;

import java.util.Map;

import pers.astlvk.acgn.entity.websitenav.Website;

public interface WebsiteDao {
	/**
	 * 分页获取website数据, param可以是map, 也可以是封装的对象。
	 * 
	 * @param currPage
	 * @param pageSize
	 * @param param 可以为null，为null时需要在mybatis的映射文件中判断后再拼接sql
	 * @return Map<String, Object> keys: int rows, int allPage, int currPage, List list
	 */
	Map<String, Object> getWebsitePagination(int currPage, int pageSize, Object param);
	
	/**
	 * 添加website, 求简单, 只添加name字段内容, 为了偷懒sql中typeId都给写1了。
	 * 也就是说该插入添加了name和typeId两个字段内容。
	 * 
	 * @param webiste
	 * @return int primaryKey
	 */
	int addWebsiteOnlyName(Website website);
	
	/**
	 * del website by id
	 * 
	 * @param id
	 * @return int
	 */
	int delWebsiteById(int id);
	
	/**
	 * del website by typeId
	 * 
	 * @param id
	 * @return int
	 */
	int delWebsiteByTypeId(int typeId);
	
	/**
	 * update website by id
	 * 
	 * @param website
	 * @return int
	 */
	int updateWebsiteById(Website website);
}
