package pers.astlvk.acgn.daoimpl.websitenav;

import java.util.List;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import pers.astlvk.acgn.dao.websitenav.WebTypeDao;
import pers.astlvk.acgn.entity.websitenav.WebType;

@Repository
public class WebTypeDaoImpl implements WebTypeDao {
	@Resource
	private SqlSession sqlSession;

	@Override
	public List<WebType> getAllWebType() {
		List<WebType> webTypes = sqlSession
				.selectList("WebTypeMapper.getAllWebType");
		return webTypes;
	}

	@Override
	public int addWebType(WebType webType) {
		int dx = sqlSession.insert("WebTypeMapper.addWebType", webType);
//		System.out.println("insert: " + dx);
//		System.out.println("insert id " + webType.getId());
		dx = webType.getId();
		return dx;
	}

	@Override
	public int delWebTypeById(int id) {
		int dx = sqlSession.delete("WebTypeMapper.delWebTypeById", id);
		return dx;
	}

	@Override
	public int updateWebTypeById(WebType webType) {
		int dx = sqlSession.update("WebTypeMapper.updateWebTypeById", webType);
		return dx;
	}

}
