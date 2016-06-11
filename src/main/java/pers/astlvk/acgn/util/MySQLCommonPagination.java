package pers.astlvk.acgn.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.ibatis.session.SqlSession;

/**
 * MySQL通用分页查询模块封装类
 * 
 * @author Astlvk
 *
 */
public class MySQLCommonPagination {
	/**
	 * MySQL通用分页方法，使用map封装了查询条件对象和offset、pageSize
	 * 
	 * @param sqlSession
	 * @param countSql
	 * @param querySql
	 * @param currPage
	 * @param pageSize
	 * @param param
	 * @return Map<String, Object> keys: int rows, int allPage, int currPage, List list
	 */
	public static Map<String, Object> pagination(SqlSession sqlSession, String countSql,
			String querySql, int currPage, int pageSize, Object param) {
		Map<String, Object> result = new ConcurrentHashMap<String, Object>();//此实现类key&value都不能为null
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("param", param);
		int rows = sqlSession.selectOne(countSql, map);
		int allPage = rows % pageSize == 0 ? rows / pageSize : rows / pageSize + 1;
		if (currPage < 1) {
			currPage = 1;
		} else if (allPage > 0 && currPage > allPage) {
			currPage = allPage;
		}
		int offset = (currPage - 1) * pageSize;
		map.put("offset", offset);
		map.put("pageSize", pageSize);
		List<Object> list = sqlSession.selectList(querySql, map);
		result.put("rows", rows);
		result.put("allPage", allPage);
		result.put("currPage", currPage);
		result.put("list", list);
		return result;
	}
}
