import styles from "../styles/InputArea.module.css";
import {useEffect, useState} from "react";
import {useSocketContext} from "../contexts/socket";

const InputArea = ({uuid}) => {
    const socket = useSocketContext();

    const [text, setText] = useState('');


    useEffect(() => {
        let div = document.querySelector(`.${styles.taFrame}`);
        let ta = document.querySelector('textarea');

      /*  ta.addEventListener('keydown', autosize);

        function autosize() {
            setTimeout(function () {
                ta.style.cssText = 'height:50px'; // 文字を削除した場合にscrollHeightを縮めるためにこれが必要
                let height = Math.min(50 * 5, ta.scrollHeight);
                div.style.cssText = 'height:' + height + 'px';
                ta.style.cssText = 'height:' + height + 'px';
            }, 0);
        }*/

    }, [text])




    async function submitMessage(e) {
        if (e.code === 'Enter' || e.type === 'click' && text && socket) {
            socket.emit('message', {message: text, user_id: uuid})
            setText('')
        }
    }

    function writer(e) {
        setText(e.target.value)
        socket.emit('writes', {user_id: uuid})
    }

    return (
        <div className={styles.taFrame}>
                <div className={styles.textAreaContainer}>
                <textarea onChange={writer}
                          onKeyPress={submitMessage}
                          rows='1' value={text}
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