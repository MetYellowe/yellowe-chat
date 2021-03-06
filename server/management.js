import express from 'express'
//import axios from 'axios'
//const cors = require('cors')
//var serveStatic = require('serve-static')
const request = require('request')
const app = express()
app.use(express.json())

const clientId = process.env.AUTH0_CLIENT_ID
const clientSecret = process.env.AUTH0_CLIENT_SECRET
const authURL = process.env.AUTH_BASE_URL
/*const managementAxios = axios.create({
  baseURL: process.env.AUTH_BASE_URL
})*/

app.post('/', async (req, res, next) => {
  
  const { body: { email } } = req
  
  try{
    var options = { method: 'POST',
      url: `${authURL}/oauth/token`,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({"client_id":clientId,"client_secret":clientSecret,"audience":"https://dev-p69g86kq.us.auth0.com/api/v2/","grant_type":"client_credentials"})
    }

    request(options, function (error, response, body) {
      if (error) throw new Error(error)
      const data = JSON.parse(body)
      var options1 = { method: 'GET',
        url: `${authURL}/api/v2/users?q=email:"${email}"&search_engine=v3`,
        headers: { authorization: `${data.token_type} ${data.access_token}` }
      }
      
      request(options1, function (error, response, body) {
        if (error) throw new Error(error)
        
        return res.json(body)
      })
    })
      
    /*const { data: { access_token, token_type } } = await managementAxios.post('/oauth/token/', {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      audience: 'dev-p69g86kq.us.auth0.com/api/v2/'
    })
    //return res.json({ access_token })
    try{
      const { data } = await managementAxios.get(`/api/v2/users?q=email:"${email}"&search_engine=v3`, {
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
    }*/
    
  }catch(err){
    console.log(err)
    next(err)
  }

})

export default {
  path: '/server/management',
  handler: app
}
