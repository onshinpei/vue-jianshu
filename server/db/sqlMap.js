var sqlMap = {
    user: {
        add: 'insert into user( username, password) values ( ?, ?)',
        select_name: 'SELECT * from user where username = ?',    //查询 username
        select_password: 'SELECT * from user where password = ?',      //查询 password
        select_name_password: 'SELECT * from user where username = ? and password = ?'      //查询 password
    }
};

module.exports = sqlMap;