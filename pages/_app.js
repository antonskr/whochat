import {AppSocketContext} from '../contexts/socket'; // import based on where you put it
import {AppUuidContext} from '../contexts/uuid'; // import based on where you put it


export default function Application({Component, pageProps}) {
    return (
        <AppSocketContext>
            <AppUuidContext>
                <Component {...pageProps} />
            </AppUuidContext>
        </AppSocketContext>
    )
}

