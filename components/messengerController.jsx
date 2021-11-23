import Monitor from "./monitor";
import InputArea from "./input-area";
import {useEffect, useRef, useState} from "react";
import styles from "../styles/InputArea.module.css";

import {io} from "socket.io-client";
import {useAppContext} from "../state";
import Helper from "../helper";


const MessengerController = () => {
    const socket = useAppContext();

    const [state, setState] = useState({
        uuid: '',
        messages: [],
    })

    useEffect(() => {
        if (!socket) { return }

        socket.on("message", data => {
            console.log(data)
            setState((prev) => {
                return {
                    ...prev,
                    messages: [...prev.messages, data.message]
                }
            })
        });

        // CLEAN UP THE EFFECT
        return () => socket.off("message");
        //
    }, [socket]);


    const handlePost = (msg) => {
       if (socket) {
           socket.emit('message', {message: msg, uuid: state.uuid})
       }
    }



    useEffect(() => {
        if (!state.uuid) {setUUID()}
    }, [state.uuid, state.messages])

    function updateState(key, value) {
        setState((prev) => {
            return {
                ...prev,
                [key]: value
            }
        })
    }

    function setUUID() {
        const uuid = localStorage.getItem("uuid") || generateUUID()
        localStorage.setItem("uuid", uuid);
        updateState('uuid', uuid)
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
        <>
            <div className={styles.contents}>
                <div className={styles.chat}>
                    <Monitor data={state}/>
                    <InputArea handlePost={handlePost}/>
                </div>
            </div>

        </>
    );
}

export default MessengerController;