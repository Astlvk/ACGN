package pers.astlvk.acgn.daoimpl.websitenav;

import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import pers.astlvk.acgn.dao.websitenav.WebsiteDao;
import pers.astlvk.acgn.entity.websitenav.Website;
import pers.astlvk.acgn.util.MySQLCommonPagination;

@Repository
public class WebsitenDaoImpl implements WebsiteDao {
	@Resource
	private SqlSession sqlSession;

	@Override
	public Map<String, Object> getWebsitePagination(int currPage, int pageSize,
			Object param) {
		return MySQLCommonPagination
				.pagination(sqlSession, "WebsiteMapper.countWebsite",
						"WebsiteMapper.getWebsitePagination", currPage,
						pageSize, param);
	}

	@Override
	public int addWebsiteOnlyName(Website website) {
		int dx = sqlSession.insert("WebsiteMapper.addWebsiteOnlyName", website);
		dx = website.getId();
		return dx;
	}

	@Override
	public int delWebsiteById(int id) {
		int dx = sqlSession.delete("WebsiteMapper.delWebsiteById", id);
		return dx;
	}
	
	@Override
	public int delWebsiteByTypeId(int typeId) {
		int dx = sqlSession.delete("WebsiteMapper.delWebsiteByTypeId", typeId);
		return dx;
	}

	@Override
	public int updateWebsiteById(Website website) {
		int dx = sqlSession.update("WebsiteMapper.updateWebsiteById", website);
		return dx;
	}
}
