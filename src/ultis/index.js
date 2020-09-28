const authenticateUser = 'authenticatedUser';



export const isLogin = () => {
    if (sessionStorage.getItem(authenticateUser)) {
        return true;
    }

    return false;
}