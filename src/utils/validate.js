export const checkValidData = (data) => {
    const validEmailRegEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/g;
    const validPasswordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g;
    const { emailId, password } = data;
    const isEmailValid = validEmailRegEx.test(emailId);
    const isPasswordValid = validPasswordRegEx.test(password);
    if (!isEmailValid) return 'Email id is incorrect';
    if (!isPasswordValid) return 'Password is incorrect';
};