import getConfig from 'next/config';

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";

module.exports = new function () {
    this.formatDate = function (_date) {
        var result = '';

        _date = new Date(_date);

        result += _date.getDate() > 9 ? _date.getDate() : '0' + _date.getDate();
        result += '.';
        result += _date.getMonth() + 1 > 9 ? (_date.getMonth() + 1) : ('0' + (_date.getMonth() + 1));
        result += '.';
        result += _date.getFullYear();

        return result;
    };

    const client = new ApolloClient({
        uri: 'http://localhost:8055/graphql',
        cache: new InMemoryCache()
    });

    this.getMessages = async function () {




        client.query({query: gql`query {
                messages {id,message}
      }`}).then((res) => {
          console.log(res)
         return res
        });


    }

    this.sendMessage = async function (message) {
        client.mutate({mutation: gql` mutation {
       create_messages_item(data: { message: "${message}"}) 
       {message}
     }`}).then(result => result);
    }

    this.fetchReviews = async function () {
        const url = `http://localhost:3000/api/socketio
		`.replace(/\s/g, '');
        const response = await fetch(url, {
            body: JSON.stringify('hello')
        });
        const json = await response.json();

        if (!json ||
            json.errors
        ) {
            console.warn('Reviews fetching error', json ? json.errors : null);
        }

        return json || null;
    };


}