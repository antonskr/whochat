import styles from "../styles/navbar.module.css";
import {useSocketContext} from "../contexts/socket";
import {useEffect, useRef, useState} from "react";
import {useUuidContext} from "../contexts/uuid";


const Navbar = () => {
    const uuid = useUuidContext();
    const socket = useSocketContext();
    const [users, setUsers] = useState([])
    let ref = useRef(null)

    useEffect(() => {
    }, [users])


    useEffect(() => {
        if (!socket) {
            return;
        }
        socket.on("users", data => {

            if (data.active) {
                setUsers(data)
            } else {
                setUsers(data);
            }
        })


        socket.emit('users', {uuid: uuid, socketId: socket.id})
        // CLEAN UP THE EFFECT
        return () => {
            socket.off("users")
        };
        //
    }, [socket]);

    function userStyleController(user) {
        if (user.user_id === uuid) { return styles.active; }
        if (!user.active) { return styles.inActive; }
        return styles.user
    }

    return (
        <div className={styles.users}>
            <p className={styles.title}>Users {Object.keys(users).length}</p>
            {
                Object.keys(users).map((key, i) => {
                    return (
                        <p className={userStyleController(users[key], styles.user)}
                           key={users[key].user_id + i}
                           id={users[key].user_id}>
                            {`user_${users[key].user_id.substring(0, 4)}`}
                            <span className={styles.status}/>
                        </p>
                    )
                })
            }
        </div>
    )
}

export default Navbar;