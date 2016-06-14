package pers.astlvk.acgn.entity.websitenav;

import java.io.Serializable;
import java.util.Date;

/**
 * 网站信息类
 * 
 * @author Astlvk
 *
 */
public class Website implements Serializable {
	private Integer id;
	private Integer typeId;
	private String name;
	private String url;
	private String introduce;
	private String imgUrl;
	private Date createDate;
	private Date updateDate;

	public Website() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Website(Integer id, Integer typeId, String name, String url,
			String introduce, String imgUrl, Date createDate, Date updateDate) {
		super();
		this.id = id;
		this.typeId = typeId;
		this.name = name;
		this.url = url;
		this.introduce = introduce;
		this.imgUrl = imgUrl;
		this.createDate = createDate;
		this.updateDate = updateDate;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getTypeId() {
		return typeId;
	}

	public void setTypeId(Integer typeId) {
		this.typeId = typeId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getIntroduce() {
		return introduce;
	}

	public void setIntroduce(String introduce) {
		this.introduce = introduce;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

}
