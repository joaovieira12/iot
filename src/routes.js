const { Router } = require("express");

const produtoController = require("./controllers/produtoController");

const routes = Router();

routes.get("/", (req, res) => {
  return res.status(200).json({ message: "Server on" });
});

routes.get("/produtos", produtoController.index);
routes.post("/produtos", produtoController.store);

module.exports = routes;

