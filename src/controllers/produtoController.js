const { Produto } = require('../models');

class produtoController {
    async index(req, res) {
    const produtos = await Produto.findAll();
    return res.status(200).json(produtos);
  }

 async store(req, res) {
    const { nome, preco, quantidade } = req.body;
    try {
      const produto = await Produto.create({ nome, preco, quantidade });
      return res.status(201).json(produto);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async destroy(req, res) {

        const { id } = req.params;

        await Produto.destroy({
            where: { id: id }
        });

        return res.status(200).json({
            mensagem: "Produto excluído com sucesso"
        });
    }
      }


module.exports = new produtoController();