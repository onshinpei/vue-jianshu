import {sendJson} from "../../common/util";
import query from '../../db/db'
import sqlMap from '../../db/sqlMap'

export default class Login {

    static async login(req, res) {
        const {phone, pwd} = req.body;
        if (!phone || !phone.trim()) {
            return {
                success: false,
                message: '手机号不能为空'
            }
        }
        if (!pwd || !pwd.trim()) {
            sendJson(res, false, '密码不能为空')
        }
        // 检查手机号是否存在
        const userId = await this.checkPhone(phone);
        if (!userId) {
            return {
                success: false,
                message: '无此用户'
            }
        }
        // 检查密码
        const pwdFlag = await this.checkPwd(phone, pwd);
        if (!pwdFlag) {
            return {
                success: false,
                message: '密码无效'
            }
        }

        //更新用户登录信息
        await this.updateLoginInfo(phone)

        //保存session
        let loginStatus = await this.saveSession(req, phone)

        loginStatus.isLogin = 1 // 将登录态置为1
        loginStatus.userId = userId //取到用户的id

        //取出用户的基本信息
        const userInfo = await this.getUserDetail(phone)

        return {
            success: true,
            message: '登录成功',
            data: {
                loginStatus,
                userInfo
            }
        }
    }

    /**
     * 检查手机号存在
     * @param phone
     * @returns {Promise<string>}
     */
    static async checkPhone(phone) {
        const rows = await query(sqlMap.user.select_phone, phone).catch(err => {
            console.log(err)
        });
        return rows.length > 0 ? rows[0].id : 0
    }

    /**
     * 检查密码
     * @param phone
     * @param pwd
     * @returns {Promise<string>}
     */
    static async checkPwd(phone, pwd) {
        const rows = await query(sqlMap.user.select_phone_pwd, [phone, pwd]).catch(err => {
            console.log(err)
        });
        return rows.length > 0 ? rows[0].id : ''
    }

    /**
     * 获取用户信息
     * @param phone
     * @returns {Promise<*>}
     */
    static async getUserDetail(phone) {
        const rows = await query(sqlMap.user.select_phone, phone).catch(err => {
            console.log(err)
        });
        return rows[0]
    }

    /**
     * 更新用户信息
     * @param phone
     * @returns {Promise<void>}
     */
    static async updateLoginInfo(phone) {
        const update = {
            last_login: Date.parse(new Date()) / 1000,
            status: 1,
            device: ~~(Math.random() * 4 + 1) //设备状态暂时取随机数 [1~5]
        }
        const res = await query(sqlMap.user.update, [update, phone]).catch((err) => {
            console.log(err)
        })
    }


    /**
     * 保存seesion
     * @param req
     * @param phone
     * @returns {Promise<void>}
     */
    static async saveSession(req, phone) {
        req.session.phone = phone;
        return {
            phone: phone
        }
    }
}

