/**
 * 验证手机号是否正确
 * 
 * @param phoneNumber 
 * @returns 
 */
export const isPhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^1[3456789]\d{9}$/;
    return phoneRegex.test(phoneNumber);
}

/**
 * @description 是否为空
 * @param {unknown} value
 * @return {Boolean}
 */
export const isEmpty = (value: unknown) => {
    return value == null && typeof value == 'undefined'
}