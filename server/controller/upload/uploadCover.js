import fs from 'fs'
import path from 'path'
import {checkLogin} from '../../common/util'
/**
 * 上传封面照片
 */
export default class uploadCover {
    static async uploadCover(req, res) {
        const publicPath = path.resolve(__dirname, '../../public');
        let isLogin = await checkLogin(req, res);
        console.log(isLogin)
        return new Promise((resolve, reject) => {
            fs.rename(req.file.path, publicPath + "/uploads2/" + req.file.originalname, function(err) {
                if(err) {
                    throw err;
                }
                resolve({
                    success: true,
                    message: '上传成功',
                    data: {
                        imageUrl: '/uploads2/'+ req.file.originalname
                    }
                })
            })
        })

    }
}
