const SaveToken = (token: string, roles: string[], userid: number, username: string, avatar: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('roles', JSON.stringify(roles));
    localStorage.setItem('userid', JSON.stringify(userid))
    localStorage.setItem('username', JSON.stringify(username))
    localStorage.setItem('avatar', JSON.stringify(avatar))
};

export default SaveToken