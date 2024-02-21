const SaveToken = (token: string, roles: string[]) => {
    localStorage.setItem('token', token);
    localStorage.setItem('roles', JSON.stringify(roles));
};

export default SaveToken