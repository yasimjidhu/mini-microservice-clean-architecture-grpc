function createUser(id,userName,email,password){
    
    if (!userName) throw new Error('Username is required');
    if (!email) throw new Error('Email is required');
    if (!password) throw new Error('Password is required');

    return {
        id,
        userName,
        email,
        password
    }
}

module.exports = {createUser}