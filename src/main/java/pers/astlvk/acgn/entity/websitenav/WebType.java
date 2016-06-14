package pers.astlvk.acgn.entity.websitenav;

import java.io.Serializable;

/**
 * 网站类型类
 * 
 * @author Astlvk
 *
 */
public class WebType implements Serializable {
	private Integer id;
	private String name;

	public WebType() {
		super();
		// TODO Auto-generated constructor stub
	}

	public WebType(Integer id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
