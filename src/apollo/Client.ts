import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  const API_KEY: string = process.env.SUPABASE_API_PROJECT_KEY as string;
  const apollo =  new ApolloClient({
    uri: process.env.SUPABASE_SERVER,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return apollo
};

export default createApolloClient;
