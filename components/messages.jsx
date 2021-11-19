const Messages = ({messages}) => {
    return (
        <>
            {
                messages.map((message, i) => {
                    return (
                      <div key={message + i}>
                          <p >
                              {message}
                          </p>
                      </div>
                    )
                })
            }
        </>
    );
}

export default Messages;