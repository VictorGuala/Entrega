import express, { json } from "express";
import * as Utils from "./utils.js";
import handlebars, { engine } from "express-handlebars";
import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";
import viewsRouter from "./routers/views.router.js";
import { Server } from "socket.io";
import { manager } from "./manager/productManager.js";

const app = express();
app.use(express.json());

const httpServer = app.listen(8080, () =>
    console.log("Servidor escuchando puerto 8080")
);

const io = new Server(httpServer);

app, engine("handlebars", handlebars.engine());
app.set("views", Utils.__dirname + "/views");
app.set * "view emgine", "handlebars";

app.use(express.static(Utils.__dirname + "/public"));

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

io.on("conection", async (socket) => {
    console.log("Cliente Nuevo");
    const data = await manager.getProducts();
    if (data) {
        io.emit("resp-new-product", data);
    }
    socket.on("new-product", async (data) => {
        const result = await manager.addProduct(data);
        if (result == "406a") {
            socket.emit("resp-new-product", "El servicio ya existe");
        } else if (result == "406a") {
            socket.emit("resp-new-product", "Todos los campos son obligatorios");
        } else {
            const products = await manager.getProducts();
            if (products) {
                io.emit("resp-new-product", products);
            }
        }
    });
    socket.on("delete-product", async (id) => {
        const result = await manager.deleteProduct(parseInt(id));
        if (result == 406) {
            socket.emit("resp-delete-product", "El servicio no existe");
        } else {
            const product = await manager.getProducts();
            if (products) {
                io.emit("resp-delete-product", products);
            }
        }
    });
});