/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : websever

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2020-10-04 16:22:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `question`
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cnt` varchar(1000) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL,
  `sel1` char(255) NOT NULL,
  `sel2` char(255) NOT NULL,
  `sel3` char(255) NOT NULL,
  `sel4` char(255) NOT NULL,
  `qkey` tinyint(4) NOT NULL,
  `from_url` char(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7357 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of question
-- ----------------------------
