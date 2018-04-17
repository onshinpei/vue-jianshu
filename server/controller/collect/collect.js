import query from '../../db/db'
import sqlMap from '../../db/sqlMap'

export default class Collect {
    static async addCollect(req, res) {
        const {type, dataObj} = req.body;
        const userId = req.session.user_id;
        const jianshuId = dataObj.object.data.id;
        delete dataObj.isCollect;
        let resData = await query(sqlMap.userCollect.insert, {
            'user_id': userId,
            'collect_obj': JSON.stringify(dataObj),
            'state': 1,
            'collect_time': new Date(),
            'jianshu_id': jianshuId
        }).catch(err => {
            throw err
        })
        if (resData) {
            return {
                success: true,
                message: '收藏成功'
            }
        }
    }

    static async allCollect(req, res) {
        try {
            let {pageSize = 10, pageNum = 1} = req.query;
            const userId = req.session.user_id;
            let start = (pageNum -1) * pageSize;
            let end = pageSize * pageNum ;
            let resData = [];
            let rowsData = await query(sqlMap.userCollect.select_user_id, [userId, start, end]);
            rowsData.forEach((rowData) => {
                resData.push(JSON.parse(rowData.collect_obj))
            })
            const data = {

            }
            return resData
        } catch (e) {
            console.log(e)
        }
    }
}
