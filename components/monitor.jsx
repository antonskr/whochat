import {useEffect, useState} from "react";
import styles from "../styles/monitor.module.css";
import Messages from "./messages";


const Monitor = ({data}) => {


    console.log(data.messages.length)

    return (
        <div className={styles.monitor}>
            {
               <Messages messages={data.messages}/>
            }
        </div>
    );
}

export default Monitor;