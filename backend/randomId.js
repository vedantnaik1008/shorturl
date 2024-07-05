export function generateRandomString(n) {
    const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomString = '';
    for (let i = 0; i < n; i++) {
        const random = Math.floor(Math.random() * str.length);
        randomString += str[random];
    }

    return randomString;
}
