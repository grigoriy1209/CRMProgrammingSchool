const baseURL = '/api'

const auth = '/all_users/auth'
const application = '/application'
const users = '/all_users/users'
const admins = '/all_users/admins'
const group = '/groups'

const urls = {
    auth: {
        login: auth,
    },
    users: {
        base: users,
        byId: (id: number): string => `users/${id}`,


    },
    admins:{
        base: admins,
        banUser: (id: number): string => `admins/${id}/ban`,
        unbanUser: (id: number): string => `admins/${id}/unban`,
    },
    application: {
        base: application,
        byId: (orderId: number): string => `application/${orderId}`,
        update:(orderId: number): string => `application/${orderId}`,
        addComment: (orderId: number): string => `application/${orderId}/addComment`,
    },
    group: {
        base: group,
        
    }

}


export {
    baseURL,
    urls
}