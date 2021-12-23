import {createContext, useContext, useEffect, useState} from 'react';
import {io} from "socket.io-client";

const UUIDContext = createContext();

export function AppUuidContext({ children }) {
    const [uuid, setUuid] = useState(null)

    useEffect(() => {
        if (!uuid) {setUUID()}
    }, [uuid])

    function setUUID() {
        const uuid = localStorage.getItem("uuid") || generateUUID()
        localStorage.setItem("uuid", uuid);
        setUuid(uuid)
    }

    function generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if (d > 0) {//Use timestamp until depleted
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    return (
        <UUIDContext.Provider value={uuid}>
            {children}
        </UUIDContext.Provider>
    );
}

export function useUuidContext() {
    return useContext(UUIDContext);
}