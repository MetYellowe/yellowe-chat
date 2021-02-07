import express from 'express'
import axios from 'axios'
const app = express()
app.use(express.json())

const clientId = process.env.AUTH0_CLIENT_ID 
const clientSecret = process.env.AUTH0_CLIENT_SECRET

app.post('/', async (req, res, next) => {
    const { body: { text, cloudData, email } } = req
    try{
      var options = { method: 'POST',
        url: 'https://dev-p69g86kq.us.auth0.com/oauth/token',
        headers: { 'content-type': 'application/json' },
        body: '{"client_id":"y4W7sXKqe6pOd6wxgRlbm2syLcZ9Zes4","client_secret":"4Umk4WQj6eM16hMLhrhNB5fav9RplvKwUWePYFDMjWJgUpOaQRAWjAOyb2nTU-N8","audience":"https://dev-p69g86kq.us.auth0.com/api/v2/","grant_type":"client_credentials"}'
      }

      request(options, function (error, response, body) {
        if (error) throw new Error(error)
        const token_type = body.token_type
        const access_token = body.access_token
        var options1 = { method: 'GET',
          url: `https://dev-p69g86kq.us.auth0.com/api/v2/users?q=email:"${email}"&search_engine=v3`,
          headers: { authorization: `${token_type} ${access_token}` }
        }
      
        request(options1, function (error, response, body) {
          if (error) throw new Error(error)
          const data = JSON.parse(body)
          if(data[0]) {
            const user_id = data[0].user_id
      
            if(user_id) {
              var options2 = {
                method: 'PATCH',
                url: `https://dev-p69g86kq.us.auth0.com/api/v2/users/${user_id}`,
                headers: {authorization: `${token_type} ${access_token}`, 'content-type': 'application/json'},
                body: {
                  user_metadata: {
                    info: text,
                    cloudData: cloudData
                  }
                }
              }  
    
              request(options2, function (error, response, body) {
                if (error) throw new Error(error)
                const data = JSON.parse(body)
                return res.json(data[0].user_metadata)
            }
          }
        })
      })
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
