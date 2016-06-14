package pers.astlvk.acgn.control.websitenav;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import pers.astlvk.acgn.entity.websitenav.WebType;
import pers.astlvk.acgn.entity.websitenav.Website;
import pers.astlvk.acgn.service.websitenav.WebsiteManageService;

@Controller
public class WebsiteManageCtrl {
	@Resource
	private WebsiteManageService websiteManageService;

	/**
	 * 获取初始显示的type和detail信息
	 * 
	 * @return Map kesy: List webTypes, Map webDetails
	 */
	@RequestMapping("/mapi/api.getTypeAndSite.acgn")
	@ResponseBody
	public Map<String, Object> getTypeAndSite(int pageSize) {
		return websiteManageService.getTypeAndSite(pageSize);
	}
	
	/**
	 * 获取所有类型
	 * 
	 * @return Map kesy: List webTypes
	 */
	@RequestMapping("/mapi/api.getAllType.acgn")
	@ResponseBody
	public Map<String, Object> getAllType() {
		return websiteManageService.getAllType();
	}
	
	/**
	 * 添加webtype信息
	 * 
	 * @param name
	 * @return String; 信息标识
	 */
	@RequestMapping("/mapi/api.addWebType.acgn")
	@ResponseBody
	public Map<String, Object> addWebType(WebType webType) {
		return websiteManageService.addWebType(webType);
	}
	
	/**
	 * 按id删除webtype信息, 会关联删除包含相关type的website信息
	 * 
	 * @param id
	 * @return String; 信息标识
	 */
	@RequestMapping("/mapi/api.delWebTypeById.acgn")
	@ResponseBody
	public String delWebTypeById(int id) {
		return websiteManageService.delWebTypeById(id);
	}
	
	/**
	 * 按id更新webtype信息
	 * 
	 * @param webType
	 * @return String; 信息标识
	 */
	@RequestMapping("/mapi/api.updateWebTypeById.acgn")
	@ResponseBody
	public String updateWebTypeById(WebType webType) {
		return websiteManageService.updateWebTypeById(webType);
	}
	
//	===================================================================
	/**
	 * 站点信息分页
	 * 
	 * @param currPage
	 * @param pageSize
	 * @param website
	 * @return Map<String, Object> keys: int rows, int allPage, int currPage, List list
	 */
	@RequestMapping("/mapi/api.getWebsitePagination.acgn")
	@ResponseBody
	public Map<String, Object> getWebsitePagination(int currPage, int pageSize, Website website){
		return websiteManageService.getWebsitePagination(currPage, pageSize, website);
	}
	
	/**
	 * website add only name
	 * 
	 * @param website
	 * @return String 信息标识
	 */
	@RequestMapping("/mapi/api.addWebsiteOnlyName.acgn")
	@ResponseBody
	public String addWebsiteOnlyName(Website website) {
		return websiteManageService.addWebsiteOnlyName(website);
	}
	
	/**
	 * del website by id
	 * 
	 * @param id
	 * @return String 信息标识
	 */
	@RequestMapping("/mapi/api.delWebsiteById.acgn")
	@ResponseBody
	public String delWebsiteById(int id) {
		return websiteManageService.delWebsiteById(id);
	}
	
	/**
	 * update website by id
	 * 
	 * @param website
	 * @return String 信息标识
	 */
	@RequestMapping("/mapi/api.updateWebsiteById.acgn")
	@ResponseBody
	public String updateWebsiteById(Website website) {
		return websiteManageService.updateWebsiteById(website);
	}
}
