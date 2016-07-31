USE acgndb;
DROP TABLE IF EXISTS WebType;
DROP TABLE IF EXISTS webSite;

CREATE TABLE WebType(
	id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL DEFAULT ''
)ENGINE = InnoDB DEFAULT CHARSET = UTF8 AUTO_INCREMENT = 1;

CREATE TABLE WebSite(
	id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
	typeId INT UNSIGNED NOT NULL DEFAULT 1,#默认改成1
	name VARCHAR(30) NOT NULL DEFAULT '',
	url VARCHAR(300) NOT NULL DEFAULT '',
	introduce VARCHAR(150) NOT NULL DEFAULT '',
	imgUrl VARCHAR(300) NOT NULL DEFAULT '',
	createDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updateDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)ENGINE = InnoDB DEFAULT CHARSET = UTF8 AUTO_INCREMENT = 1;

INSERT INTO webType(name) VALUES('默认');
INSERT INTO webType(name) VALUES('和谐类');
INSERT INTO webType(name) VALUES('A类');
INSERT INTO webType(name) VALUES('B类');
INSERT INTO webType(name) VALUES('C类');
INSERT INTO webType(name) VALUES('D类');
INSERT INTO webType(name) VALUES('E类');

INSERT INTO website(typeId, name, url) VALUES(1, '萌日资源站', 'www.moe.com');
INSERT INTO website(typeId, name, url) VALUES(2, 'AcFun', 'www.moe.com');
INSERT INTO website(typeId, name, url) VALUES(3, 'bilibli', 'www.moe.com');
INSERT INTO website(typeId, name, url) VALUES(4, '3DM', 'www.moe.com');
INSERT INTO website(typeId, name, url) VALUES(5, '2DJ', 'www.moe.com');
INSERT INTO website(typeId, name, url) VALUES(6, '\\(^o^)/~', 'www.moe.com');
INSERT INTO website(typeId, name, url) VALUES(6, 'H5', 'www.moe.com');
INSERT INTO website(typeId, name, url) VALUES(7, '神社', 'www.moe.com');
INSERT INTO website(typeId, name, url) VALUES(1, '澄空', 'www.moe.com');
INSERT INTO website(typeId, name, url) VALUES(1, 'GetChu', 'www.moe.com');
INSERT INTO website(typeId, name, url) VALUES(1, '北+', 'www.moe.com');
INSERT INTO website(typeId, name, url) VALUES(1, 'GitHub', 'www.moe.com');

SELECT * FROM WebType;
SELECT * FROM WebSite;