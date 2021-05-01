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
});