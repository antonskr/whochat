const fetch = require('cross-fetch');
const fetch1 = require('node-fetch');
const {ApolloClient, InMemoryCache, HttpLink, gql} = require("@apollo/client");

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({uri: 'http://localhost:8055/graphql', fetch})
});

let initialMessages;
let messages = []
let users = {}


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

function userRemovalOverTime (users, key, time) {
    setTimeout(() => {
        if(!users[key] || users[key].active) { return; }
        delete users[key];
        io.emit("users", users);
    }, time)
}

io.sockets.on('connection', async function (socket) {
    console.log('user connection');

    if (!initialMessages) { await getMessages(); }
    socket.emit("initialMessages", (initialMessages))

    socket.on('message', async function (data) {

        io.emit("message", data);
        await saveMessage(data.message, data.user_id);
        messages.push(data);
        initialMessages = initialMessages.concat(messages);
        messages = [];



        const body = {
            prompt: data.message,
            temperature: 1,
            top_k: 40, top_p: 0.9,
            seed: 0,
            stream: false
        };

        const response = await fetch1('https://bellard.org/textsynth/api/v1/engines/gptj_6B/completions', {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'}
        });
        const text = await response.json();
        io.emit("message", {message: await text.text});

    })

    socket.on('users', async function (data) {

        if (!users[data.uuid]) {
            users[data.uuid] = {
                user_id: data.uuid,
                active: false,
                sockets: {},
            }
        }

        users[data.uuid].sockets[socket.id] = socket.id;
        users[data.uuid].active = true
        io.emit("users", users);
    });

    socket.on('writes', async function (data) {
        io.emit("writes", data);
    });

    socket.on('disconnect', async (data) => {
        let currentUserKey = Object.keys(users).find(key => users[key].sockets[socket.id]);

        if(currentUserKey) {
            let UserSockets = users[currentUserKey].sockets;
            delete UserSockets[socket.id];
            if (Object.keys(UserSockets).length === 0)
            {
                users[currentUserKey].active = false
                io.emit("users", users);
                userRemovalOverTime(users, currentUserKey, 6000)
            }
        }
        console.log('user disconnected', data);
    });
});

server.listen(8000);