import {useEffect, useState} from "react";
import styles from "../styles/monitor.module.css";
import Messages from "./messages";
import {useSocketContext} from "../contexts/socket";


const Monitor = ({uuid}) => {
    const socket = useSocketContext();
    const [isWrite, setWrite] = useState(false)
    const [state, setState] = useState({
        messages: null,
    })


    useEffect(() => {
    }, [state.messages])

    let timer;
    function offWrites() {
        timer = setTimeout(() => {
            setWrite(false)
        }, 1000)
    }
    useEffect(() => {
        if (!socket) {
            return
        }
        socket.on("message", data => {
            setState((prev) => {
                return {
                    ...prev,
                    messages: [...prev.messages,
                        {
                            message: data.message,
                            user_id: data.user_id,
                            id: data.id
                        }]
                }
            })
        });

        socket.on("initialMessages", data => {
            setState((prev) => {
                return {
                    ...prev,
                    messages: data
                }
            })
        });


        socket.on("writes", data => {
            clearTimeout(timer)
            setWrite(true)
            offWrites(timer)
        });

        // CLEAN UP THE EFFECT
        return () => {
            socket.off("message")
            socket.off("initialMessages")
        };
        //
    }, [socket]);


    return (
        <div className={styles.monitor}>
            {
                state.messages ? <Messages messages={state.messages} uuid={uuid}/> : null
            }

          <div className={styles.placeholder}>

                  <div className={styles.writes}>someone writes..</div>

          </div>

        </div>
    );
}

export default Monitor;