/**
 * 判断对象类型
 * @param data
 * @returns {boolean}
 */
export function getType(data) {
    return Object.prototype.toString.call(data).substr(8, -1) === 'Object';
}
