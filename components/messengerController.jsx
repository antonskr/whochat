import Monitor from "./monitor";
import InputArea from "./input-area";
import {useEffect, useState} from "react";


const MessengerController = () => {
    const [state, setState] = useState({
        text: '',
        messages: []
    });

    useEffect(() => {
    },[state])

    function updateState(key, value) {
        setState((prev) => {
            return {
                ...prev,
                [key]: [...prev.messages, value]
            }
        })
    }

    function controller (value) {
       value && updateState("messages", value)
    }

    return (
        <>
            <Monitor data={state}/>
            <InputArea controller={controller}/>
        </>
    );
}

export default MessengerController;