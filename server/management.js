import express from 'express'
import axios from 'axios'
//const cors = require("cors")
//var serveStatic = require('serve-static')
const app = express()
app.use(express.json())

//const clientId = process.env.AUTH0_CLIENT_ID
//const clientSecret = process.env.AUTH0_CLIENT_SECRET
const axiosAuth = axios.create({
  baseURL: process.env.AUTH_BASE_URL
})

app.post('/', async (req, res, next) => {
  
  const { body: { email } } = req
  return res.json('hello')
  /*try{
    const { data: { access_token, token_type } } = await axiosAuth.post('/oauth/token/', {
      grant_type: 'client_credentials',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      audience: 'dev-p69g86kq.us.auth0.com/api/v2/'
    })
    //return res.json({ access_token })
    try{
      const { data } = await axiosAuth.get(`/api/v2/users?q=email:"${email}"&search_engine=v3`, {
        headers: {
          "authorization": `${token_type} ${access_token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        }
      })
      
      const metaData = {
        userMetaData: data[0].user_metadata,
        appMetaData: data[0].app_metadata,
        user_id: data[0].user_id
      }
      return res.json(metaData)
    }catch(err){
      console.log(err)
      next(err)
    }
    
  }catch(err){
    console.log(err)
    next(err)
  }*/

})

export default {
  path: '/server/management',
  handler: app
}
