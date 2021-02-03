import axios from 'axios'
export default async function ({ app: { $auth, $axios, $config: { browserBaseURL } } }) {
  if (!$auth.loggedIn) {
    return
  }
  if($auth) {
    const { email } = $auth.$storage.getUniversal('user')
  
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
        const { data } = await axios.post('/server/management', email)
        $auth.$storage.setUniversal('metaData', data, false)

      } catch (err) {
        console.log(err)
      }
    //}
  }
}
