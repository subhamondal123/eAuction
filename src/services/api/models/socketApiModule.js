import { io } from "socket.io-client";
import { App_uri } from "../../config";


const socket = io(App_uri.SOCKET_ROOT, {

    // 'secure':true,
    'reconnection': true,
    'autoConnect':true,
    'reconnectionDelay': 2000,
    'reconnectionAttempts': Infinity,
    // 'transports':  [ "websocket","polling"] ,
    'transports':  [ "websocket"] ,
});

export default socket;