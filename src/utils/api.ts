const AUTH0_DOMAIN = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.NEXT_PUBLIC_AUTH0_API_CLIENT_ID;
const AUTH0_CLIENT_SECRET = process.env.NEXT_PUBLIC_AUTH0_API_CLIENT_SECRET;

/**
 * Obtiene un token de acceso de Auth0 para la autenticación de la API.
 */
export async function getAuth0Token() {
  const response = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: AUTH0_CLIENT_ID,
      client_secret: AUTH0_CLIENT_SECRET,
      audience: `https://${AUTH0_DOMAIN}/api/v2/`,
      grant_type: "client_credentials",
    }),
  });

  if (!response.ok) {
    console.error("Error obteniendo el token de Auth0:", await response.text());
    throw new Error("Error obteniendo el token de Auth0");
  }

  const data = await response.json();
  return data;
}

export async function createAuth0User(
  userData: { email: string; password: string; connection: string },
  accessToken: string,
  tokenType: string
) {
  const response = await fetch(`https://${AUTH0_DOMAIN}/api/v2/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${tokenType} ${accessToken}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    console.error("Error creando el usuario en Auth0:", await response.text());
    return null;
  }

  const auth0User = await response.json();
  return auth0User;
}
