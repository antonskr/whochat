import styles from "../styles/InputArea.module.css";
import {useEffect, useState} from "react";
import Helper from "../helper";


const InputArea = ({handlePost}) => {

    const [state, setState] = useState({
        text: ''
    });


    useEffect(() => {
        let div = document.querySelector(`.${styles.taFrame}`);
        let ta = document.querySelector('textarea');

        ta.addEventListener('keydown', autosize);

        function autosize() {
            setTimeout(function () {
                ta.style.cssText = 'height:52px'; // 文字を削除した場合にscrollHeightを縮めるためにこれが必要
                let height = Math.min(50 * 5, ta.scrollHeight);
                div.style.cssText = 'height:' + height + 'px';
                ta.style.cssText = 'height:' + height + 'px';
            }, 0);
        }

    }, [state.text])


    function updateState(key, value) {
        setState((prev) => {
            return {
                ...prev,
                [key]: value
            }
        })
    }

    async function submitMessage(e) {
        if (e.code === 'Enter' || e.type === 'click' && state.text) {
            Helper.sendMessage(state.text);
            handlePost(state.text)
            updateState('text', '')
        }
    }

    function writer(e) {
        updateState('text', e.target.value)
    }

    return (
        <div className={styles.taFrame}>
                <div className={styles.textAreaContainer}>
                <textarea onChange={writer}
                          onKeyPress={submitMessage}
                          rows='1' value={state.text}
                />
                </div>
                <div className={styles.btnContainer}>
                    <button onClick={submitMessage}>
                        SUBMIT
                    </button>
                </div>
        </div>
    );
}

export default InputArea;