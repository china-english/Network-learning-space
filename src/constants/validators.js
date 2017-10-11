import * as strings from './strings'
// validation functions
export const required = value => value == null || value == '' ? strings.REQUIRED : undefined
export const is_online_required = value => (value == null || value == '') && value.is_online ? strings.REQUIRED : undefined
export const is_not_online_required = value => (value == null || value == '') && !value.is_online ? strings.REQUIRED : undefined
export const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? strings.INVALID_EMAIL : undefined
export const number = value => value && !/^[\-]{0,1}[0-9]+[\.][0-9]+|[\-]{0,1}[0-9]+$/i.test(value) ? strings.INVALID_NUMBER : undefined
export const integer = value => value && !/^(0|[1-9][0-9]*)$/i.test(value) ? strings.INVALID_INTEGER : undefined
