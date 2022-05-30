import { Server } from 'socket.io';
import path from "path"
import { DB } from './db.js';

const dbFile = path.join(process.cwd(), './static/db.json');


export default {
    name: 'sveltekit-socket-io',
    configureServer(server) {
        const io = new Server(server.httpServer);

        let changing = false;
        const myDb = new DB(dbFile, () => {
            console.log("updated")
            if (changing) return;
            changing = true;
            setTimeout(() => {
                io.sockets.emit('change');
                changing = false;
            }, 1000)
        });

        io.on('connection', (socket) => {
            console.log("connected")
            // socket.on("ready", () => {
            //     socket.emit('change');
            // })
            socket.on("submitScore", (s) => {
                myDb.push(s)
            });
        });

        console.log("Socket.io is running")
    }
}









