const baseURL = '/api'

const auth = '/all_users/auth'
const application = '/application'

const urls = {
    auth: {
        login: auth,
    },
    application:{
        base:application,
        byId:(id)=>`application/${id}`,
    }

}
export {
    baseURL,
    urls
};