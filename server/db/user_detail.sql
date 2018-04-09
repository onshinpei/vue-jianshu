/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : qq

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-04-09 18:09:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user_detail
-- ----------------------------
DROP TABLE IF EXISTS `user_detail`;
CREATE TABLE `user_detail` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `user_id` mediumint(9) NOT NULL COMMENT '用户id',
  `nick_name` char(30) NOT NULL COMMENT '用户昵称',
  `signature` char(60) NOT NULL COMMENT '用户签名',
  `avatar` char(100) NOT NULL DEFAULT '/static/user/avatar/default.png' COMMENT '头像',
  `sex` tinyint(1) NOT NULL DEFAULT '1' COMMENT '性别: 0 未设置, 1 男, 2 女',
  `age` smallint(4) NOT NULL DEFAULT '0' COMMENT '年龄',
  `xingzuo` char(10) NOT NULL COMMENT '星座',
  `place` char(40) NOT NULL DEFAULT '江西' COMMENT '地方',
  `favor` char(30) NOT NULL COMMENT '爱好',
  `level` smallint(6) NOT NULL DEFAULT '1' COMMENT 'QQ等级',
  `profile_bg` char(30) NOT NULL DEFAULT '/static/user/bg/default.jpg' COMMENT '个人名片背景',
  `login_day` smallint(10) NOT NULL DEFAULT '0' COMMENT '登陆天数',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='用户信息详情';
