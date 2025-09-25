import Server from "./server/config.js";
import router from "./src/routes/index.routes.js";

const server = new Server();

server.app.use("/api", router)

server.listen();