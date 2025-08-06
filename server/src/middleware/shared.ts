/**
 * validates that the param is a number
 * @param number number to verify
 * @returns boolean based on if it is a valid number
 */
export function validateNumber(number: number) {
    return typeof number === 'number' && Number.isFinite(number) && number > 0;
};
