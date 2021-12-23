import Monitor from "./monitor";
import InputArea from "./input-area";
import styles from "../styles/InputArea.module.css";
import {useUuidContext} from "../contexts/uuid";

const MessengerController = () => {
    const uuid = useUuidContext();
    return (
        <>
            <div className={styles.contents}>
                <div className={styles.chat}>
                    <Monitor uuid={uuid}/>
                    <InputArea uuid={uuid}/>
                </div>
            </div>

        </>
    );
}

export default MessengerController;