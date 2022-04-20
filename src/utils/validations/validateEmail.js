export function validateEmail(value) {
    let error
    if (!value) {
        error = "Required email"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = "Email is invalid or already taken"
    }
    return error
}

export function validatePassword(value) {
    let error
    if (!value) {
        error = "Required password"
    } else if (value.length <= 5) {
        error = "password too short"
    }
    return error
}

export function validateUsername(value) {
    let error
    if (!value) {
        error = "Required username"
    }
    return error
}