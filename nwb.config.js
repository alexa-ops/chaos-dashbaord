module.exports = {
  type: 'react-app',
  webpack: {
    define: {
      'process.env': {
        'GRAPHQL_ENDPOINT': '"https://6czcj9684c.execute-api.us-east-1.amazonaws.com/dev/graphql"'
      } 
    },
  },
}
