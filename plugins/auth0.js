import createAuth0Client from '@auth0/auth0-spa-js'

export default async function(ctx, inject) {
  const $auth = await createAuth0Client({
    domain: 'dev-p69g86kq.us.auth0.com',
    client_id: '3waBNUoS0juK0IDLtRLFMHTt5wwDcHcQ',
    useRefreshTokens: true
  })

  inject('auth0', $auth)
  ctx.$auth0 = $auth
}