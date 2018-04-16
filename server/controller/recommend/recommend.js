import axios from 'axios'
import query from '../../db/db'
import sqlMap from '../../db/sqlMap'
export default class Recommend {
    static async getRecommend(req, res) {
        const params = req.query;
        const headers = req.headers;
        return axios.get('https://www.jianshu.com/mobile/trending/now', {
            headers: {
                Accept: 'application/json',
                'user-agent': headers['user-agent']
            },
            params: params
        }).then(async response => {
            const lists = response.data;
            const userId = req.session.user_id;

            if (userId) {
                let queryCollectFns = [];
                // for (let i=0, list; list=lists[i++]; ) {
                //     let jianshuId = list.object.data.id;
                //     let rows = await query(sqlMap.userCollect.select_jianshu_id, [userId, jianshuId]);
                //     list.isCollect = rows.length > 0;
                // }
                lists.forEach(async(list) => {
                    let jianshuId = list.object.data.id;
                    let rows = await query(sqlMap.userCollect.select_jianshu_id, [userId, jianshuId]);
                    list.isCollect = rows.length > 0;
                })
                console.log('return')
                return lists
            } else {
                return lists
            }
        })
    }
}
