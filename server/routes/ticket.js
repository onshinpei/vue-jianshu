import https from 'https'
import express from "express";
import axios from "axios/index";
import request from 'request'

import {sendJson2} from "../common/util";


const router = express.Router();

router.get('/',  (req, res, next) => {
    res.send('这是12306');
});
router.get('/captchaImage', (req, res1, next) => {
    var url = 'https://kyfw.12306.cn/passport/captcha/captcha-image?login_site=E&module=login&rand=sjrand&0.12318317382443955';  //一张网络图片
    https.get({
        url: url,
        headers: {
            host: 'kyfw.12306.cn'
        }
    },function(res){
        var chunks = []; //用于保存网络请求不断加载传输的缓冲数据
        var size = 0;　　 //保存缓冲数据的总长度
        res.on('data',function(chunk){
            chunks.push(chunk);　 //在进行网络请求时，会不断接收到数据(数据不是一次性获取到的)，
            size += chunk.length;　　//累加缓冲数据的长度
        });

        res.on('end',function(err){
            var data = Buffer.concat(chunks, size);　　//Buffer.concat将chunks数组中的缓冲数据拼接起来，返回一个新的Buffer对象赋值给data
            console.log(Buffer.isBuffer(data));　　　　//可通过Buffer.isBuffer()方法判断变量是否为一个Buffer对象
            var base64Img = data.toString('base64');　　//将Buffer对象转换为字符串并以base64编码格式显示
            console.log(base64Img);　　 //进入终端terminal,然后进入index.js所在的目录，
            res1.send(base64Img)
            res1.end();
        });

    });
    // request.get('http://www.gintong.com/static/home/static/images/logo.png', (err, response, body) => {
    //     // console.log(response)
    //     //         'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
    //     let base64 =  new Buffer(body).toString('base64')
    //
    //     res.send(base64).end();
    // })
    // axios.get('https://kyfw.12306.cn/passport/captcha/captcha-image?login_site=E&module=login&rand=sjrand&0.12318317382443955', {
    //     headers: {
    //         host: 'kyfw.12306.cn',
    //         origin: 'https://kyfw.12306.cn/',
    //         // accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    //         // cookie: '_passport_ct=0faca7d217fa4231837f8df2342d858ct7873; _passport_session=f0d4870864e64bfe8b3d9a30cabc1ded7400; route=495c805987d0f5c8c84b14f60212447d; BIGipServerotn=65274378.24610.0000; RAIL_EXPIRATION=1524932362641; RAIL_DEVICEID=V_G7xMOGSajNF68IVZgrQPNPkTITl846j4VLalV2DnjYl5ppXtTZb7uFl0iO0IijItYTigDr58s5xZoFnMECw2gDXWZ0X5RvHSbHECrd3-wnUi_SIExtiV0Es2PuEnPF5Nzn3ReWMuxjkadBEelgh4r86x2BLMcj; _jc_save_fromStation=%u676D%u5DDE%2CHZH; _jc_save_toStation=%u5E7F%u5DDE%2CGZQ; _jc_save_fromDate=2018-04-28; _jc_save_toDate=2018-04-25; _jc_save_wfdc_flag=dc; BIGipServerpool_passport=200081930.50215.0000',
    //         'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
    //         // 'Content-type': 'image/jpeg',
    //     },
    //
    // }).then(async response => {
    //     res.set('Content-Type', 'image/jpeg');
    //     res.send(response.data);
    //     res.end();
    // }).catch(err => {
    //     console.log(err)
    // });

})


module.exports = router;
