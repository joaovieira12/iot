const { Router } = require("express");

const produtoController = require("./controllers/produtoController");

const routes = Router();

routes.get("/", (req, res) => {
  return res.status(200).json({ message: "Server on" });
});

routes.get("/produtos", produtoController.index);
routes.post("/produtos", produtoController.store);
routes.put("/produtos/:id", produtoController.update);
routes.delete("/produtos/:id", produtoController.destroy);
routes.patch("/produtos/:id", produtoController.update);

module.exports = routes;

