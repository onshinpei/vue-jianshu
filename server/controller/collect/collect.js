import query from '../../db/db'
import sqlMap from '../../db/sqlMap'

export default class Collect {
    static async addCollect(req, res) {
        const {type, dataObj} = req.body;
        const userId = req.session.user_id;
        const jianshuId = dataObj.object.data.id;

        let resData = await query(sqlMap.userCollect.insert, {
            'user_id': userId,
            'collect_obj': JSON.stringify(dataObj),
            'state': 1,
            'collect_time': new Date(),
            'jianshu_id': jianshuId
        }).catch(err => {
            throw err
        })
        if(resData) {
            return {
                success: true,
                message: '收藏成功'
            }
        }
    }

}
