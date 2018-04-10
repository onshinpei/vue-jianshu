import {sendJson} from "../../common/util";
import query from '../../db/db'
import sqlMap from '../../db/sqlMap'
import {checkPhone} from '../../common/query'

export default class Register {
	static async register(req, res) {
		const {phone, pwd} = req.body;
		if (!phone || !pwd) {
			return {
				success: false,
				message: '请填写手机密码'
			}
		}

		const exsitFlag = await checkPhone(phone);
		console.log(exsitFlag)
		if(exsitFlag) {
			return {
				success: false,
				message: '该手机号已被注册，请更换手机号'
			}
		}


		const qq = this.createQQ();
		const user = {
			qq: qq,
			phone,
			pwd,
			time: (new Date().getTime())/1000
		}
		const nickname = '游客';
		// 新增用户
		const user_detail = await this.insert(user, nickname);
		// 关联的表也增加相应记录
	 //    const affectedRows=await this.afterInsert(user_detail).catch((err) => {
		// 	console.log(err)
		// })
		return {
			success: true,
			message: '注册成功'
		}

	}

	// 随机创建用户
	static createQQ() {
		let qq = ''
		//qq的位数
		let n = Math.round(Math.random() * 2 + 8) // 四舍五入
		//第一位,随机生成1~9的数
		let num = Math.round(Math.random() * 8 + 1) // 四舍五入
		qq += num
		// 剩下n-1位
		for (let i = 0; i < n - 1; i++) {
			qq += Math.round(Math.random() * 9)
		}
		return qq
	}
	//数据库新增用户
	static async insert(user, nickname) {
		const res = await query(sqlMap.user.insert, user).catch(err => {
			console.log(err)
		});
		if (res.affectedRows == 1) {
			const user_detail = {
				'user_id': res.insertId,
				'nick_name': nickname
			}
			return user_detail
		}
		return ''
	}
	// 对关联表进行插入信息
	static async afterInsert(user_detail) {
		const {user_id} = user_detail;
		

		return;
	}
}
