import express from 'express'
import query from '../db/db'
import sql from '../db/sqlMap'
import {sendJson2} from "../common/util";

import Login from '../controller/login/login'
import Register from '../controller/Register'
import UploadCover from '../controller/upload/uploadCover'
import Collect from '../controller/collect/collect'
import Recommend from '../controller/recommend/Recommend'

import {checkLogin} from "../common/util";

const router = express.Router();
// var register = require('../controller/register');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.get('/allusers', (req, res, next) => {
    query('select * from user').then(sqlRes => {
        res.send(sqlRes)
    });
});
// router.post('/register/phone', async(req, res) => {
//     const result = await register.sendMessage(req, res);
//     res.json(result)
// })
/*router.post('/loginuser', (req, res, next) => {
    const {phone, pwd} = req.body;
    if (phone.trim() !== '' && pwd.trim() !== '') {
        query(sql.user.select_phone_pwd, [phone, pwd]).then((result) => {
            if (result.length > 0) {
                //保存session
                updateLoginInfo(phone);
                let loginStatus = saveSeesion(req, phone);
                console.log(loginStatus);
                sendJson(res, true, '登录成功');
            } else {
                sendJson(res, false, '用户不存在或密码错误');
            }
        }).catch((err) => {
            console.log(err)
        })
    } else {
        sendJson(res, false, '用户名和密码不能为空');
    }
})*/

router.post('/loginuser', loginuser)
async function loginuser(req, res) {
    const info = await Login.login(req, res);
    if (info) {
        sendJson2(Object.assign({res}, info));
    }
}

async function checkUser(phone, pwd) {
    query(sql.user.select_phone_pwd, [phone, pwd]).then((result) => {
        if (result.length > 0) {
            //保存session
            updateLoginInfo(phone);
            let loginStatus = saveSeesion(req, phone);
            console.log(loginStatus);
            sendJson(res, true, '登录成功');
        } else {
            sendJson(res, false, '用户不存在或密码错误');
        }
    }).catch((err) => {
        console.log(err)
    })
}


router.get('/session', (req, res) => {

    sendJson(res, true, req.session);
});
router.get('/userinfo', (req, res) => {
    let userId = req.session.user_id;
    if(userId) {
        query(sql.userInfoDetail.select_user_id, userId).then((result) => {
            sendJson(res, true, result[0]);
        })
    } else {
        sendJson(res, false, '请登录');
    }
})
router.all('/logoutuser', (req, res) => {
    delete req.session.phone;
   sendJson(res, true, '退出成功');
});

router.post('/adduser', async(req, res) => {
    const info = await Register.register(req, res);
    console.log(info)
    sendJson2(Object.assign({res},info))
})

router.post('/uploadCover', async(req, res, next) => {
    let sendJson = {};
    const info = await UploadCover.uploadCover(req, res).catch(err => {
        next(err)
    });
    if (info) {
        sendJson2(Object.assign({res},info))
    }
})
router.post('/addCollect', async(req, res, next) => {
    const loginFlag = await checkLogin(req, res);
    if(!loginFlag) {
        sendJson2({res, message: '请登录'});
        return;
    }
    const info = await Collect.addCollect(req, res).catch(err => {
        next(err)
    });
    if(info) {
        sendJson2(Object.assign({res},info))
    }
})
router.get('/getRecommend', async(req, res, next) => {
     await Recommend.getRecommend(req, res).then(res => {
         console.log(res)
     }).catch(err => {
         next(err)
     });
    // sendJson2({res})
})

/**
 * 发送信息
 * @param res
 * @param success
 * @param msg
 */
function sendJson(res, success = true, data) {
    if (typeof success === 'boolean') {
        res.json({
            success: success,
            data: data
        });
        res.end();
    } else {
        let sendJson = Object.assign({}, {data: success, msg, success: true})
        res.json(sendJson);
        res.end();
    }
}
/**
 * 保存session
 * @param req
 * @param username
 * @returns {{user: {username: *}}}
 */
function saveSeesion(req, phone) {
    req.session.user = {
        phone: phone,
        isLogin: 1
    }
    return req.session.user
}
/**
 * 更新用户信息
 * @param username
 * @param field
 */
function updateLoginInfo(phone) {
    const update = {
        last_login: Date.parse(new Date())/1000
    }
    query(sql.user.update, [update, phone]).then((result) => {
    }).catch((err) => {
        console.log(err);
    })
}
module.exports = router;
