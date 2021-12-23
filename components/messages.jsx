import styles from "../styles/messages.module.css";
const Messages = ({messages, uuid}) => {

    function mStyle(m) {
        return (
         m.user_id === uuid ?
             {justifyContent: 'end'} : null
        )
    }
    function pStyle(m) {
        return (
            m.user_id === uuid ?
                {color: 'blue'} : null
        )
    }

    return (
        <>
            {
                messages.map((m, i) => {
                    return (
                      <div className={styles.message} key={m.id || m.user_id + i} style={mStyle(m)}>
                          <p style={pStyle(m)}>
                              {m.message}
                          </p>
                      </div>
                    )
                })
            }
        </>
    );
}

export default Messages;