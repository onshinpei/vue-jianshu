export function getOptions() {
    return {
        method: 'post',
        url: 'http://localhost:3000/users/loginuser',
        data: {
            phone: '18501308131',
            pwd: '123456'
        }
    }
}
