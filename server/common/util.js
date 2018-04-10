/**
 * 发送信息
 * @param res
 * @param success
 * @param msg
 */
export function sendJson(res, success = true, data) {
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
 * 通用发送信息
 * @param config
 */
export function sendJson2(config) {
    let res = config.res;
    const resJson = {
        success: config.success || false,
        message: config.message || '',
        data: config.data
    }
    console.log(resJson);
    res.json(resJson);
    res.end();
}

/**
 * 检测登录
 * @param req
 * @param res
 * @returns {Promise<boolean>}
 */
export async function checkLogin(req, res) {
    if (req.session.phone) {
        return true
    } else {
        return false
    }
}

