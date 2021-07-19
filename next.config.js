const store = {}

// ...immediately invoked function expression to generate access token
const getVideoaskAccessToken = (async () => {
  const urlEncoded = new URLSearchParams();
  urlEncoded.append("grant_type", "refresh_token");
  urlEncoded.append("refresh_token", process.env.VIDEOASK_REFRESH_TOKEN);
  urlEncoded.append("client_id", process.env.VIDEOASK_CLIENT_ID);
  urlEncoded.append("client_secret", process.env.VIDEOASK_CLIENT_SECRET);

  const requestOptions = {
    method: 'POST',
    body: urlEncoded,
    redirect: 'follow'
  };

  const res = await fetch(`${process.env.VIDEOASK_AUTH_BASE_URL}/oauth/token`, requestOptions);
  const data = await res.json();

  // ...validation
  if (data.access_token) {
    store.token = data.access_token;
  } else {
    console.error('Access Token could not be generated...')
  }
 })()

module.exports = {
  serverRuntimeConfig: { store },
  reactStrictMode: true,
};
