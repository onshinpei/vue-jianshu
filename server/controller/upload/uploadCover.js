import fs from 'fs'
import multer from 'multer'
import query from '../../db/db'
import sqlMap from '../../db/sqlMap'

import { checkLogin } from '../../common/util'

const upload = multer({
    //定义图片上传的临时目录
    dest: global.__publicPath + '/uploads'
})
/**
 * 上传封面照片
 */
export default class uploadCover {
    static async uploadCover(req, res) {
        let isLogin = await checkLogin(req, res);
        if (!isLogin) {
            return {
                message: '请登录'
            };
        }
        return new Promise((resolve, reject) => {
            const uploadArea = upload.single('imageFile');
            uploadArea(req, res, (err) => {
                if (err) {
                    reject(err)
                }
                let originalname = req.file.originalname;
                let suffix = originalname.substring(originalname.lastIndexOf('.'));
                let fileUrl = "/uploads2/" + req.session.user_id + (new Date().getTime()) + suffix;
                fs.rename(req.file.path, global.__publicPath + fileUrl, async (err) => {
                    if (err) {
                        reject(err)
                    }
                    //插入数据库
                    query(sqlMap.userDetail.update, [{ profile_bg: fileUrl }, req.session.user_id]).then(qureyRes => {
                        resolve({
                            success: true,
                            message: '上传成功',
                            data: {
                                imageUrl: fileUrl
                            }
                        })
                    }).catch(err => {
                        reject(err);
                    });
                })
            })
        })
    }
}
