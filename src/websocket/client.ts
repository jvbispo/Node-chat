import User from '../entities/User';
import { io } from '../http'
import ConnectionsService from '../services/ConnectionsService';
import MessagesService from '../services/MessagesService';
import UsersService from '../services/UsersService';

io.on("connect", socket => {
    const connectionsService = new ConnectionsService();
    const usersService = new UsersService();
    const messagesService = new MessagesService();

    socket.on("client_first_access", async params => {
        const socket_id = socket.id;
        const {text, email} = params;
        let user;

        const user_exists = await usersService.findByEmail(email);

        if(!user_exists) {
          user = await usersService.create(email);          
        } else {
          user = user_exists;
          const connection = await connectionsService.findByUserId(user.id);

          if(!connection) {
            await connectionsService.create({socket_id, user_id: user.id })   
          } else {
              connection.socket_id = socket.id;
              await connectionsService.create(connection);
          }

        }

        await messagesService.create({
            text,
            user_id: user.id,
        });

        const allMessages = await messagesService.listByUser(user.id);
     
        socket.emit("client_list_all", allMessages);
    });

    socket.on("client_send_to_admin", async params => {
      const {text, socket_admin_id} = params;

      const response = await connectionsService.findBySocketId(socket.id)

      if( response && response?.admin_id) {
        const message = await messagesService.create({
          text,
          user_id: response.user_id,
        })

        io.to(socket_admin_id).emit("admin_receive_message", {
          message,
          socket_id: socket.id
        })
      }
    });

   
    
});