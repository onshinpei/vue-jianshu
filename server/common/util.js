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
export function sendJson2(config) {
    let res = config.res;
    res.json({
        success: config.success || false,
        message: config.message || '',
        data: config.data
    });
    res.end();
}
