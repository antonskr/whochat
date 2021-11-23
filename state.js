import {createContext, useContext, useEffect, useState} from 'react';
import {io} from "socket.io-client";

const AppContext = createContext();

export function AppWrapper({ children }) {
    const [socket, setSocket] = useState(null);

    useEffect(  () => {
        setSocket(io('http://localhost:8000', {transports: ['websocket']}));
        /*      updateState('messages', getAllMessages()..messages)*/
        return () => socket.disconnect();
    }, []);

    return (
        <AppContext.Provider value={socket}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}