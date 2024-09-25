export interface User {
    id: string,
    userNumber: string,
    Email: string,
    userName: string,
    userPhone: string,
    passWord: string,
    date: string,
    userSex: string,
    section: string,
    brief: string,
    userRole: string,
    state: boolean,
    token?: string
}



export interface TypeuserInfo {
    avatar?: string,
    routes?: string[],
    userId?: string,
    userName?: string
}

