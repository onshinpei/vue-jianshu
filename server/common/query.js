import query from '../db/db'
import sqlMap from '../db/sqlMap'

/** 
 * 检查手机号存在
 * @param phone
 * @returns {Promise<string>}
 */
export async function checkPhone(phone) {
    const rows = await query(sqlMap.user.select_phone, phone).catch(err => {
        console.log(err)
    });
    return rows.length > 0 
}