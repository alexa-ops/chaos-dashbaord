import './vendor/skeleton/normalize.css'
import './vendor/skeleton/skeleton.css'
import './index.css'

import React from 'react'
import { render } from 'react-dom'

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from './components/App'

const endpoint = process.env.GRAPHQL_ENDPOINT;

console.log('Using graphql endpoint: ' + endpoint)

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: endpoint }),
});

render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('app')
)
