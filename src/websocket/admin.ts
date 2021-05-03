import { io } from "../http";
import ConnectionsService from "../services/ConnectionsService";
import MessagesService from "../services/MessagesService";



io.on("connection", async (socket) => {
    const connectionsService = new ConnectionsService();
    const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();
    const messagesService = new MessagesService();

    io.emit("admin_list_all_users", allConnectionsWithoutAdmin);

    socket.on("admin_list_messages_by_user", async (params, cb) => {
        const {user_id} = params;

        const allMessages = await messagesService.listByUser(user_id);

        cb(allMessages);
    }) 

    socket.on("admin_send_message", async params => {
        const {user_id, text} = params;

        await messagesService.create({
            text,
            user_id,
            admin_id: socket.id,
        });

        const connResponse = await connectionsService.findByUserId(user_id);

        if(connResponse) {
            io.to(connResponse.socket_id).emit("admin_send_to_client", {
                text,
                socket_id: socket.id,
            })
        }        
    });
});