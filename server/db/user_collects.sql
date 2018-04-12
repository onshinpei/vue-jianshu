/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : qq

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-04-12 18:05:52
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user_collects
-- ----------------------------
DROP TABLE IF EXISTS `user_collects`;
CREATE TABLE `user_collects` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '11',
  `user_id` mediumint(9) NOT NULL,
  `jianshu_id` varchar(10) NOT NULL,
  `collect_obj` text NOT NULL,
  `delect_time` datetime DEFAULT NULL COMMENT '删除时间',
  `collect_time` datetime NOT NULL COMMENT '存储时间',
  `state` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0删除，1收藏',
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
