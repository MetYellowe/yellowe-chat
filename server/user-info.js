import express from 'express'
import axios from 'axios'
const app = express()
app.use(express.json())
//const request = require('request')
//const port = process.env.PORT || '3000'
const userInfoAxios = axios.create({
    baseURL: process.env.AUTH_BASE_URL
})
app.post('/', async (req, res, next) => {
    const { body: { text, cloudData, email } } = req
    try{
      const { data: { access_token, token_type } } = await userInfoAxios.post('/oauth/token/', {
        grant_type: 'client_credentials',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: 'https://dev-p69g86kq.us.auth0.com/api/v2/'
      })
      const { data } = await userInfoAxios.get(`/api/v2/users?q=email:"${email}"&search_engine=v3`, {
        headers: {
          "authorization": `${token_type} ${access_token}`
        }
      })
      if(data[0]) {
        const user_id = data[0].user_id
      
        if(user_id) {
          var options = {
            method: 'PATCH',
            url: `/api/v2/users/${user_id}`,
            headers: {authorization: `${token_type} ${access_token}`, 'content-type': 'application/json'},
            data: {
              user_metadata: {
                  info: text,
                  cloudData: cloudData
              }
            }
          };      
          
          try {
            const { data: { user_metadata } } = await userInfoAxios.request(options)
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
    /*try{
      var options = { method: 'POST',
        url: 'https://dev-p69g86kq.us.auth0.com/oauth/token',
        headers: { 'content-type': 'application/json' },
        body: '{"client_id":"y4W7sXKqe6pOd6wxgRlbm2syLcZ9Zes4","client_secret":"4Umk4WQj6eM16hMLhrhNB5fav9RplvKwUWePYFDMjWJgUpOaQRAWjAOyb2nTU-N8","audience":"https://dev-p69g86kq.us.auth0.com/api/v2/","grant_type":"client_credentials"}'
      }

      request(options, function (error, response, body) {
        if (error) throw new Error(error)
        const data = JSON.parse(body)
        const token_type = data.token_type
        const access_token = data.access_token
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
                method: 'PUT',
                url: `https://dev-p69g86kq.us.auth0.com/api/v2/users/${user_id}`,
                headers: { authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhPdFBFRXU3NHE3N1ZrOWZuN1c5YSJ9.eyJpc3MiOiJodHRwczovL2Rldi1wNjlnODZrcS51cy5hdXRoMC5jb20vIiwic3ViIjoieTRXN3NYS3FlNnBPZDZ3eGdSbGJtMnN5TGNaOVplczRAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LXA2OWc4NmtxLnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjEyNzM3OTY3LCJleHAiOjE2MTI4MjQzNjcsImF6cCI6Ink0VzdzWEtxZTZwT2Q2d3hnUmxibTJzeUxjWjlaZXM0Iiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6YWN0aW9ucyB1cGRhdGU6YWN0aW9ucyBkZWxldGU6YWN0aW9ucyBjcmVhdGU6YWN0aW9ucyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.DfyGmnPzS8mTv2hQaPr3O6ptH7FhRWW5bTta8y7O3P1mJpz-iO0K_ckX4Jnh_HpVsp3rKqixwja2Pk3PCCoWD6FJqfU0Jo7HYeQHGgFXljdbI60dG6C-9EZ-06PZRt1rBFeeMXX8wuxkZFhFxpaPyY9RfF0EZao3W-2nMT1Oz2sjcosrqdZEmOH5MD1a7vzIHb3ihGBEFa3J24PdR-iB2U8m5hPcEo4K1ilHghPwQXt6exx20lrQ6scgq7Gl4JxCZJ928Umt_OQWTZyipXtoLCVP3YY-I5RXU3-fo9LIThjuffjyFoUy9WegIlwg41kumjS963lcAJJnji53Ung9Qg'},
                data: {
                  user_metadata: {
                    info: text,
                    cloudData: cloudData
                  }
                }
              }  
    
              request(options2, function(error, response, body) {
                if (error) throw new Error(error)
                const data = JSON.parse(body)
                return res.json(data[0].user_metadata)
              })
            }
          }
        })
      })
    }
      catch(err){
        console.log(err)
        next(err)
    }*/
})

export default {
    path: '/server/user-info',
    handler: app
}
