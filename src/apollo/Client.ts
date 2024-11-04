import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  const API_KEY: string = process.env
    .NEXT_PUBLIC_SUPABASE_API_PROJECT_KEY as string;

  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_SUPABASE_SERVER,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      apiKey: API_KEY,
    },
  });
};

export default createApolloClient;
