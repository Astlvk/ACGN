package pers.astlvk.acgn.service.websitenav;

import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import pers.astlvk.acgn.entity.websitenav.WebType;
import pers.astlvk.acgn.entity.websitenav.Website;

public interface WebsiteManageService {
	/**
	 * 获取管理区初始数据。
	 * 获取webType和website。
	 * webType获取所有, website分页获取。website查询条件可以对象封装，或者map封装
	 * 
	 * @param currPage
	 * @param pageSize
	 * @param param
	 * @return Map<String, Object>; keys: List webTypes, Map websites
	 */
	Map<String, Object> getTypeAndSite(int pageSize);
	
	/**
	 * get all type
	 * 
	 * @return Map<String, Object>; keys: List webTypes
	 */
	Map<String, Object> getAllType();
	
	/**
	 * add webType param = name
	 * 
	 * @param name
	 * @return Map keys: String infoFlag, int id
	 */
	Map<String, Object> addWebType(WebType webType);
	
	/**
	 * del webType By Id service 会关联删除包含相关type的website信息
	 * 
	 * @param id
	 * @return String 信息标识
	 */
	@Transactional
	String delWebTypeById(int id);
	
	/**
	 * update name of webType By Id
	 * 
	 * @param webType
	 * @return String 信息标识
	 */
	String updateWebTypeById(WebType webType);
	
	//以上为type模块↑
	//一下为site detail模块↓
	/**
	 * 分页获取website数据，直接调用dao模块的实现，想control层提供相关服务。
	 * 之所以在service层多此一举的调用下，是不想再在control层引入DAO层的模块，而只引入service相关模块
	 * 
	 * @param currPage
	 * @param pageSize
	 * @param website
	 * @return
	 */
	Map<String, Object> getWebsitePagination(int currPage, int pageSize, Website website);
	
	/**
	 * 添加website, 仅添加name字段
	 * 
	 * @param website
	 * @return String 信息标识
	 */
	String addWebsiteOnlyName(Website website);
	
	/**
	 * del website by id
	 * 
	 * @param id
	 * @return String 信息标识
	 */
	String delWebsiteById(int id);
	
	/**
	 * update website by id
	 * 
	 * @param website
	 * @return String 信息标识
	 */
	String updateWebsiteById(Website website);
}
