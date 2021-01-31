import express from 'express'
import axios from 'axios'
const app = express()
app.use(express.json())

const clientId = process.env.AUTH0_CLIENT_ID 
const clientSecret = process.env.AUTH0_CLIENT_SECRET

app.post('/', async (req, res, next) => {
    const { body: { text, cloudData, email } } = req
    try{
      const { data: { access_token, token_type } } = await axios.post('https://dev-p69g86kq.us.auth0.com/oauth/token/', {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        audience: 'https://dev-p69g86kq.us.auth0.com/api/v2/'
      })
      const { data } = await axios.get(`https://dev-p69g86kq.us.auth0.com/api/v2/users?q=email:"${email}"&search_engine=v3`, {
        headers: {
          "authorization": `${token_type} ${access_token}`
        }
      })
      if(data[0]) {
        const user_id = data[0].user_id
      
        if(user_id) {
          var options = {
            method: 'PATCH',
            url: `https://dev-p69g86kq.us.auth0.com/api/v2/users/${user_id}`,
            headers: {authorization: `${token_type} ${access_token}`, 'content-type': 'application/json'},
            data: {
              user_metadata: {
                  info: text,
                  cloudData: cloudData
              }
            }
          };      
          
          try {
            const { data: { user_metadata } } = await axios.request(options)
            res.json(user_metadata)
            //next()
          } catch(err) {
            console.log(err)
          }
        }
      }
      
      
    }
      catch(err){
        console.log(err)
        next(err)
    }
})

export default {
    path: '/server/user-info',
    handler: app
}