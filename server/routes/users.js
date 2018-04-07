import express from 'express'
import query from '../db/db'
import sql from '../db/sqlMap'
import {sendJson2} from "../common/util";

import Login from '../controller/login/login'

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
    console.log(info)
    if (info) {
        sendJson2({
            res: res,
            success: info.success,
            data: info.data,
            message: info.message
        })
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
    let phone = req.session.phone;
    if(phone) {
        query(sql.user.select_phone, phone).then((result) => {
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
router.post('/adduser', (req, res, next) => {
    const {phone, pwd} = req.body;
    if (phone.trim() !== '' && pwd.trim() !== '') {
        query(sql.user.select_phone, phone).then((result) => {
            if (result[0] === undefined) {
                const qq = 172634791;
                query(sql.user.add, [phone, pwd, qq]).then((result) => {
                    if (result) {
                        sendJson(res, true, '添加成功');
                    }
                })
            } else {
                sendJson(res, false, '用户已存在');
            }
        }).catch((err) => {
            console.log(err);
        });
    } else {
        sendJson(res, false, '用户名和密码不能为空');
    }
});
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
