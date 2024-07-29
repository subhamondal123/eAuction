import { io } from "socket.io-client"
import { CryptoDecoder } from "../../auth"
import { App_uri } from "../../config"

class WSService {
    initializeSocket = async () => {
        try {
            this.socket = io(App_uri.SOCKET_ROOT,
                 {
                transports: ['websocket']
            }
            )
            console.log("Initializing socket")

            this.socket.on('connect', (data) => {
                console.log("=========Socket Connected==========");
                const transport = this.socket.io.engine.transport.name; // in most cases, "polling"
                console.log("transports::::::",transport);
              
                this.socket.io.engine.on("upgrade", () => {
                  const upgradedTransport = this.socket.io.engine.transport.name; // in most cases, "websocket"
                  console.log("updated transports::::::",upgradedTransport);
                });
            })

            this.socket.on('disconnect', (data) => {
                console.log("=========Socket Disconnected==========");
            })

            this.socket.on('error', (data) => {
                console.log("=========Socket Error==========");
            })
            this.socket.on("connect_error", (data) => {
                console.log(`connect_error ${data}`)
                this.socket.io.opts.transports = ["polling", "websocket"];
            })

        } catch (err) {
            console.log("socket is not initialized", err)
        }
    }

    emit(event, data = {}) {
        this.socket.emit(event, data)
    }
    on(event, cb) {
        let mainData = {};
        this.socket.on(event, (data)=>{
            Object.assign(mainData,data);
            cb(mainData);
        })
    }
    removeListener(listenerName) {
        this.socket.removeListener(listenerName)
    }

    removeAllListeners(){
        this.socket.removeAllListeners()
    }
}

const socketServices = new WSService()

export default socketServices;