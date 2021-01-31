export default async function({ $auth, $axios }) {
    try{
        const clientId = process.env.clientId
        const clientSecret = process.env.clientSecret
        const { data: { access_token, token_type } } = await $axios.$post('https://dev-p69g86kq.us.auth0.com/oauth/token/', {
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret,
          audience: 'https://dev-p69g86kq.us.auth0.com/api/v2/'
        })
        const { email } = $auth.$storage.getUniversal('user')
        try{
          const { data } = await $axios.$get(`https://dev-p69g86kq.us.auth0.com/api/v2/users?q=email:"${email}"&search_engine=v3`, {
            headers: {
              "authorization": `${token_type} ${access_token}`
            }
          })
          const metaData = {
            userMetaData: data[0].user_metadata,
            appMetaData: data[0].app_metadata,
            user_id: data[0].user_id
          }
          alert(metaData)
          $auth.$storage.setUniversal('metaData', data, false)
          alert($auth.$storage.getUniversal('metaData').userMetaData.info)
        }catch(err){
          console.log(err)
          next(err)
        }
    
      }catch(err){
        console.log(err)
        next(err)
      }
}