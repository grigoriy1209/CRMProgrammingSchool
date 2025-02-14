const baseURL = '/api'

const auth = '/all_users/auth'
const application = '/application'
const users = '/all_users/users'

const urls = {
    auth: {
        login: auth,
    },
    application:{
        base:application,
        byId:(id)=>`application/${id}`,
    },
    users:{
        base:users,
        byId:(id)=>`users/${id}`,
    }


}
export {
    baseURL,
    urls
};