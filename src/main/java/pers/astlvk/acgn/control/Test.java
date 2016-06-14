package pers.astlvk.acgn.control;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

@Controller
@SessionAttributes("msg")
public class Test {
	@RequestMapping("/set.acgn")
	@ResponseBody
	public Object[] viewTest(ModelMap model) {
		Object[] result = new Object[1];
		 model.put("msg", "Hello World");
		result[0] = "Vue";
		return result;
	}
	
	@RequestMapping("/get.acgn")
	@ResponseBody
	public Object[] getSession (ModelMap model, @ModelAttribute("msg") String msg) {
		Object[] result = new Object[1];
		result[0] = msg;
		return result;
	}
	
	@RequestMapping("/vueTest.acgn")
	@ResponseBody
	public Object[] vueResourceTest(String str) {
		Object[] a = new Object[1];
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		System.out.println("vue");
//		return "Vue-Resource";
		a[0] = "Vue-Resource";
		return a;
	}
}
