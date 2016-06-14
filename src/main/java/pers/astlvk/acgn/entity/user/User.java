package pers.astlvk.acgn.entity.user;

import java.io.Serializable;

public class User implements Serializable {
	private Integer id;

	private String name;

	private String pwd;

	private Integer auz;

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(Integer id, String name, String pwd, Integer auz) {
		super();
		this.id = id;
		this.name = name;
		this.pwd = pwd;
		this.auz = auz;
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
		this.name = name == null ? null : name.trim();
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd == null ? null : pwd.trim();
	}

	public Integer getAuz() {
		return auz;
	}

	public void setAuz(Integer auz) {
		this.auz = auz;
	}
}