const serverIP = 'http://localhost:3000';
const config = {
    // 服务ip
    serverIP: serverIP,

    //登录
    loginUrl: serverIP + '/users/loginuser',
    // 获取用户基本信息
    userInfoUrl: serverIP + '/users/userinfo'
};
export default config
