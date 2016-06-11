package pers.astlvk.acgn.serviceimpl.websitenav;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import pers.astlvk.acgn.dao.websitenav.WebTypeDao;
import pers.astlvk.acgn.dao.websitenav.WebsiteDao;
import pers.astlvk.acgn.entity.websitenav.WebType;
import pers.astlvk.acgn.entity.websitenav.Website;
import pers.astlvk.acgn.service.websitenav.WebsiteManageService;

@Service
public class WebsiteManageServiceImpl implements WebsiteManageService {
	@Resource
	private WebTypeDao webTypeDao;
	@Resource
	private WebsiteDao websiteDao;

	@Override
	public Map<String, Object> getTypeAndSite(int pageSize) {
		Map<String, Object> result = new ConcurrentHashMap<String, Object>();
		List<WebType> webTypes = webTypeDao.getAllWebType();
		Map<String, Object> webDetails = websiteDao.getWebsitePagination(1, pageSize, null);
		result.put("webTypes", webTypes);
		result.put("webDetails", webDetails);
		return result;
	}
	
	@Override
	public Map<String, Object> getAllType() {
		Map<String, Object> result = new HashMap<String, Object>();
		List<WebType> webTypes = webTypeDao.getAllWebType();
		result.put("webTypes", webTypes);
		return result;
	}

	@Override
	public Map<String, Object> addWebType(WebType webType) {
		Map<String, Object> result = new HashMap<String, Object>();
		int dx = webTypeDao.addWebType(webType);
		String infoFlag = dx != 0 ? "addSuccess" : "addFailed";
		result.put("infoFlag", infoFlag);
		result.put("id", dx);
		return result;
	}

	@Override
	public String delWebTypeById(int id) {
		websiteDao.delWebsiteByTypeId(id);
		int dx = webTypeDao.delWebTypeById(id);
		return dx == 1 ? "delSuccess" : "delFailed";
	}

	@Override
	public String updateWebTypeById(WebType webType) {
		int dx = webTypeDao.updateWebTypeById(webType);
		return dx == 1 ? "updateSuccess" : "updateFailed";
	}
//	以下为site detail模块↓
	@Override
	public Map<String, Object> getWebsitePagination(int currPage, int pageSize,
			Website website) {
		return websiteDao.getWebsitePagination(currPage, pageSize, website);
	}

	@Override
	public String addWebsiteOnlyName(Website website) {
		int dx = websiteDao.addWebsiteOnlyName(website);
		return dx != 0 ? "addSuccess" : "addFailed";
	}

	@Override
	public String delWebsiteById(int id) {
		int dx = websiteDao.delWebsiteById(id);
		return dx == 1 ? "delSuccess" : "delFailed";
	}

	@Override
	public String updateWebsiteById(Website website) {
		int dx = websiteDao.updateWebsiteById(website);
		return dx == 1 ? "updateSuccess" : "updateFailed";
	}
}
