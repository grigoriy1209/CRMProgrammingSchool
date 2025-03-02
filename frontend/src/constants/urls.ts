const baseURL = '/api'

const auth = '/all_users/auth'
const application = '/application'
const users = '/all_users/users'

const urls = {
    auth:{
        login: auth,
    },
    application:{
        base:application,
        byId:(id:number):string => `application/${id}`,
    },
}



export {
    baseURL,
    urls
}