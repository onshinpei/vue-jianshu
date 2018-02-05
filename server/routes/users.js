var express = require('express');
var router = express.Router();
var query = require('../db/db');
var sql = require('../db/sqlMap');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.get('/allusers', (req, res, next) => {
    query('select * from user').then(sqlRes => {
        res.send(sqlRes)
    });
});
router.post('/loginuser', (req, res, next) => {
    const {phone, pwd} = req.body;
    if (phone.trim() !== '' && pwd.trim() !== '') {
        query(sql.user.select_phone_pwd, [phone, pwd]).then((result) => {
            if (result.length > 0) {
                //保存session
                updateLoginInfo(phone);
                let loginStatus = saveSeesion(req, phone);
                loginStatus.isLogin = 1;
                console.log(req.session);
                sendJson(res);
            } else {
                sendJson(res, false, '用户不存在或密码错误');
            }
        }).catch((err) => {
            console.log(err)
        })
    } else {
        sendJson(res, false, '用户名和密码不能为空');
    }
})

router.post('/adduser', (req, res, next) => {
    const {phone, pwd} = req.body;
    if (phone.trim() !== '' && pwd.trim() !== '') {
        query(sql.user.select_phone, phone).then((result) => {
            if (result[0] === undefined) {
                const qq = 172634791;
                query(sql.user.add, [phone, pwd, qq]).then((result) => {
                    if (result) {
                        sendJson(res);
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
function sendJson(res, success = true, msg) {
    if (typeof success === 'boolean') {
        res.json({
            success: success,
            msg: msg
        })
    } else {
        let sendJson = Object.assign({}, {data: success, msg, success: true})
        res.json(sendJson)
    }
}
/**
 * 保存session
 * @param req
 * @param username
 * @returns {{user: {username: *}}}
 */
function saveSeesion(req, phone) {
    req.session.phone = phone;
    return {
        user: {
            phone: phone
        }
    }
}
/**
 * 更新用户信息
 * @param username
 * @param field
 */
function updateLoginInfo(phone) {
    const update = {
        last_login: Date.parse(new Date())
    }
    query(sql.user.update, [update, phone]).then((result) => {
    }).catch((err) => {
        console.log(err);
    })
}
module.exports = router;
