export default function({app, redirect}){
    if(app.$auth.loggedIn){
        const appMetaData = app.$auth.$storage.getUniversal('appMetaData')
        if(appMetaData.role !== "administrator"){
            return redirect('/')
        }
    }
}