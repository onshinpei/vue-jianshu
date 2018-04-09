const sqlMap = {
    user: {
        add: 'insert into user( phone, pwd, qq, time) values ( ?, ?, ?, ?)',
        insert: 'insert into user set ?',
        update: 'update user set ? where phone = ? ',
        select_name: 'SELECT * from user where username = ?',    //查询 username
        select_phone: 'SELECT * from user where phone = ? limit 1',    //查询 username
        select_password: 'SELECT * from user where password = ?',      //查询 password
        select_name_password: 'SELECT * from user where username = ? and password = ?',      //查询 password
        select_phone_pwd: 'SELECT * from user where phone = ? and pwd = ?'      //查询 用户，密码
    }
};

export default sqlMap
