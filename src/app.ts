import {http} from './http';
import "./websocket/client";

http.listen(3000, () => {
    console.log('server running on port 3000!');
});