export const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const isValidPassword = (password) => {
    // At least 6 chars, 1 number, 1 special char is a common requirement, 
    // but for now let's stick to a simple length check and maybe one number to be "production-grade"ish
    // or just length > 6 for simplicity matching likely backend.
    return password.length >= 6;
};
