package pers.astlvk.acgn.filter;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class AFilter implements Filter {

	@Override
	public void destroy() {
		// TODO Auto-generated method stub

	}

	@Override
	public void doFilter(ServletRequest arg0, ServletResponse arg1,
			FilterChain arg2) throws IOException, ServletException {
		System.out.println("拦截成功");
		HttpServletRequest request = (HttpServletRequest) arg0;
		HttpServletResponse response = (HttpServletResponse) arg1;
		HttpSession session = request.getSession();
		response.setContentType("application/javascript;charset = utf-8");
		PrintWriter out = response.getWriter();
		Integer auz = (Integer) session.getAttribute("auz");
		if (auz == null) {
			//配合webpack的异步分块请求进行权限过滤, 是直接返回一个js文件还是返回输出流内容。
			//需要了解http请求返回的相应原理，及webpack处理异步加载js模块的原理
//			response.sendRedirect("/ACGN/err.js");
			out.write("location.href = '/ACGN/404.html'");
		} else {
			response.reset();
			arg2.doFilter(arg0, arg1);
		}
		System.out.println("拦截后");
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub

	}

}
