var express = require('express');
var router = express.Router();
var db = require('../db/db');
var sql = require('../db/sqlMap');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/allusers', (req, res, next) => {
    db('select * from user').then(sqlRes => {
        res.send(sqlRes)
    });
});
router.post('/loginuser', (req, res, next) => {
    const {username, password} = req.body;
    if (username.trim() !=='' && password.trim() !=='') {
        db(sql.user.select_name_password, [username, password]).then((result) => {
            if(result.length > 0) {
                //保存session

                res.json({
                    success: true
                })
            } else {
                res.json({
                    success: false,
                    msg: '用户不存在或密码错误'
                })
            }

        }).catch((err) => {
            console.log(err)
        })
    } else {
        res.json({
            success: false,
            msg: '用户名和密码不能为空'
        })
    }
})

router.post('/adduser', (req, res, next) => {
    const {username, password} = req.body;
    if (username.trim() !=='' && password.trim() !=='') {
        db(sql.user.select_name, username).then((result) => {
            if(result[0] === undefined) {
                db(sql.user.add, [username, password]).then((result) => {
                   if(result) {
                       res.json({
                           success: true
                       })
                   }
                })
            } else {
                res.json({
                    success: false,
                    msg: '用户已存在'
                })
            }
        }).catch((err) => {
            console.log(err);
        });
    } else {
        res.json({
            success: false,
            msg: '用户名和密码不能为空'
        })
    }


});
module.exports = router;
