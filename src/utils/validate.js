export const checkValidData = (data) => {
    const validEmailRegEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/g;
    const validPasswordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    const { emailId, password } = data;
    const isEmailValid = validEmailRegEx.test(emailId);
    const isPasswordValid = validPasswordRegEx.test(password);
    if (!isEmailValid) return { field: 'email', message: 'Email id is incorrect' };
    if (!isPasswordValid) return { field: 'password', message: 'Password is incorrect' };
};