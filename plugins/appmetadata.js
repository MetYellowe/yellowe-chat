//import axios from 'axios'
export default async function ({ app: { $auth, $axios, store } }) {
  if (!$auth.loggedIn) {
    return
  }
    //setTimeout(function() {
        const { email } = $auth.$storage.getUniversal('user')
    //}, 0)
    
    //const appMetaData = $auth.$storage.getUniversal('appMetaData')
    //if(!appMetaData) {
      /*const headers = {
        'content-type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
        'Access-Control-Allow-Headers': 'append,delete,entries,foreach,get,has,keys,set,values,Authorization',
        //'RewriteEngine': 'On',
        //'RewriteCond': '%{REQUEST_METHOD} OPTIONS',
        //'RewriteRule': '^(.*)$ $1 [R=200,L]'
      }*/
      try{
        const  dataJSON   = await $axios.$post('/server/management', { email })
       
        const data = JSON.parse(dataJSON)
        const metaData = {
          userMetaData: data[0].user_metadata,
          appMetaData: data[0].app_metadata,
          user_id: data[0].user_id
        }
        //$auth.$storage.setUniversal('metaData', metaData, false)
        store.dispatch('setData', metaData)

      } catch (err) {
        console.log(err)
      }
    //}
  
}
