import fs from 'fs'
/**
 * 上传封面照片
 */
export default class uploadCover {
    static async uploadCover(req, res) {
        return new Promise((resolve, reject) => {
            fs.rename(req.file.path, "/www/vue-jianshu/server/public/uploads2/" + req.file.originalname, function(err) {
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
