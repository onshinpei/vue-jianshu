const sqlMap = {
    user: {
        add: 'insert into user( phone, pwd, qq, time) values ( ?, ?, ?, ?)',
        insert: 'insert into user set ?',
        update: 'update user set ? where phone = ? ',
        select_name: 'SELECT * from user where username = ?',    //查询 username
        select_phone: 'SELECT * from user where phone = ? limit 1',    //查询 username
        select_password: 'SELECT * from user where password = ?',      //查询 password
        select_name_password: 'SELECT * from user where username = ? and password = ?',      //查询 password
        select_phone_pwd: 'SELECT * from user where phone = ? and pwd = ?',      //查询 用户，密码
    },
    userDetail: {
        insert: 'insert into user_detail set ?',
        update: 'update user_detail set ? where user_id = ? ',
        select_user_id: 'select * from user_detail where user_id = ?'
    },
    userInfoDetail: {
        select_user_id: 'select a.*, b.phone, b.status, b.qq from user_detail a join user b on a.user_id = ? and b.id=a.user_id'
    },
    userCollect: {
        insert: 'insert into user_collects set ?',
        select_jianshu_id: 'select * from user_collects where user_id = ? and jianshu_id = ?',
        select_user_id: 'select * from user_collects where user_id = ?'
    }
};

export default sqlMap
