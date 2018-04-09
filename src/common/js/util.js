/**
 * 判断对象类型
 * @param data
 * @returns {boolean}
 */
export function getType(data) {
    return Object.prototype.toString.call(data).substr(8, -1) === 'Object';
}

/**
 * 深度拷贝
 * @param data
 * @returns {*}
 */
export function deepClone(data) {
    const type = getType(data);
    let obj;
    if (type === 'Array') {
        obj = [];
    } else if (type === 'Object') {
        obj = {};
    } else {
        //不再具有下一层次
        return data;
    }
    if (type === 'Array') {
        for (let i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]));
        }
    } else if (type === 'Object') {
        for (let key in data) {
            obj[key] = deepClone(data[key]);
        }
    }
    return obj;
}

/**
 * 深度合并对象
 * @param obj1
 * @param obj2
 * @returns {*}
 */
export function deepMerge(obj1, obj2) {
    if (getType(obj1) === 'Object' && getType(obj2) === 'Object') {
        for (let prop2 in obj2) {
            //obj1无值,都有取obj2
            if (!obj1[prop2]) {
                obj1[prop2] = obj2[prop2];
            } else {
                //递归赋值
                obj1[prop2] = deepMerge(obj1[prop2], obj2[prop2]);
            }
        }
    } else if (getType(obj1) === 'Array' && getType(obj2) === 'Array') {
        // 两个都是数组，进行合并
        obj1 = obj1.concat(obj2);
    } else if (obj2) {
        //取obj2的值
        obj1 = obj2;
    }
    return obj1;
}
