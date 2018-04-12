import request from 'request-promise'
import axios from 'axios'
export default class Recommend {
    static async getRecommend(req, res) {
        const params = req.query;
        const headers = req.headers;
        headers.host = 'www.jianshu.com';
        return request({
            url: 'https://www.jianshu.com/mobile/trending/now?page=1&count=15',
            method: 'GET',
            headers: headers,
        })
        // return axios.get('https://www.jianshu.com/mobile/trending/now', {
        //     headers: {
        //         Host: 'www.jianshu.com',
        //
        //         Referer: 'https://www.jianshu.com/',
        //         'Content-Type': 'application/json;charset=utf-8',
        //         'User-Agent': headers['user-agent']
        //
        //     },
        //     data: params
        // }).then(response => {
        //     console.log(response);
        // }).catch(err => {
        //     console.log(err)
        //     throw err
        // })
    }
}
