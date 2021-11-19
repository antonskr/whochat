import styles from "../styles/InputArea.module.css";
import {useEffect, useState} from "react";


const InputArea = ({controller}) => {

    const [state, setState] = useState({
            text: ''
    });

    useEffect(() => {
    }, [state.text])


    function updateState(key, value) {
        setState((prev) => {
            return {
                ...prev,
                [key]: value
            }
        })
    }

    function submitMessage (e) {
        if (e.code === 'Enter') {
            let textArea = document.getElementById('textarea')
            textArea.style.height = `${textArea.clientHeight + 10}px`
        }
        if(e.code === 'Enter' || e.type === 'click') {
            controller(state.text)
            updateState('text', '') // clear textarea
        }
    }

    function writer(e){
        updateState('text', e.target.value)
    }

    return (
        <div className={styles.inputContainer}>
           <div id={"textarea"}>
                <textarea onChange={writer}
                          onKeyDown={submitMessage}
                          value={state.text}
                          placeholder={'Message'}

                />
           </div>
            <div className={styles.submitBtn}
                 onClick={submitMessage}>
                SUBMIT
            </div>
        </div>
    );
}

export default InputArea;