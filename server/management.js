import express from 'express'
import axios from 'axios'
//const cors = require("cors")
//var serveStatic = require('serve-static')
const app = express()
app.use(express.json())

const clientId = process.env.clientId
const clientSecret = process.env.clientSecret
const axiosAuth = axios.create({
  baseURL: process.env.AUTH_BASE_URL
}

app.post('/', async (req, res, next) => {
  
  const { body: { email } } = req
  
  try{
    const { data: { access_token, token_type } } = await axiosAuth.post('/oauth/token/', {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      audience: 'dev-p69g86kq.us.auth0.com/api/v2/'
    })
    
    try{
      const { data } = await axiosAuth.get(`/api/v2/users?q=email:"${email}"&search_engine=v3`, {
        headers: {
          "authorization": `${token_type} ${access_token}`
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
  }

})

export default {
  path: '/server/management',
  handler: app
}
