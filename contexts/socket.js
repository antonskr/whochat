import {createContext, useContext, useEffect, useState} from 'react';
import {io} from "socket.io-client";

const SocketContext = createContext();

export function AppSocketContext({ children }) {
    const [socket, setSocket] = useState(null);

    useEffect(  () => {
        setSocket(io('http://localhost:8000', {transports: ['websocket']}));
        /*      updateState('messages', getAllMessages()..messages)*/
        return () => socket.disconnect();
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export function useSocketContext() {
    return useContext(SocketContext);
}