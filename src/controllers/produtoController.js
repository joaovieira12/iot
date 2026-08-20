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

  async update(req, res) {
    const { id } = req.params;
    const { nome, preco, quantidade } = req.body;

    await Produto.update(
      { nome, preco, quantidade },
      { where: { id } }
    );

    return res.status(200).json({
      mensagem: "Produto atualizado com sucesso"
    });
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