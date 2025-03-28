const baseURL = '/api'

const auth = '/all_users/auth'
const application = '/application'
const users = '/all_users/users'

const urls = {
    auth: {
        login: auth,
    },
    users:{
        base:users,
        byId:(id:number):string => `users/${id}`,


    },
    application: {
        base: application,
        byId: (id: number): string => `application/${id}`,
    },
    addComment: {
        addComment: (orderId: number): string => `application/${orderId}/addComment`,
    }
}


export {
    baseURL,
    urls
}