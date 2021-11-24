const fetch = require('cross-fetch');
const {ApolloClient, InMemoryCache, HttpLink, gql} = require("@apollo/client");


const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({uri: 'http://localhost:8055/graphql', fetch})
});


saveMessage = async function (message, uuid) {
    client.mutate({
        mutation: gql` mutation {
       create_messages_item(data: { message: "${message}", user_id: "${uuid}"}) {
       message
       user_id
       }
     }`
    }).then(result => result);
}


let initialMessages;
let messages = []
let users = {}

getMessages = async function () {
    initialMessages = (await client.query({
        query: gql`query {
                messages(sort: ["sort", "date_created"]) {
                id,
                user_id
                message
          }
      }`
    }).then((res) => {
        return res
    })).data.messages;
}


const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


io.sockets.on('connection', async function (socket) {
    console.log('user connection');
    if (!initialMessages) {
        await getMessages()
    }
    socket.emit("initialMessages", (initialMessages))

    socket.on('message', async function (data) {
        io.emit("message", data)
        await saveMessage(data.message, data.user_id)
        messages.push(data)
        initialMessages = initialMessages.concat(messages)
        messages = []
    })

    socket.on('users', async function (data) {
        users[`${socket.id}`] = {
            user_id: data.uuid,
            socket_id: socket.id
        }
        io.emit("users", users)
    });

    socket.on('disconnect', async (data) => {
        delete users[socket.id]
        io.emit("users", users)
        console.log('user disconnected', users);
    });
});

server.listen(8000)