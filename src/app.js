const express = require("express");
const fs = require('fs');
const ProductManager = require('./programa.js');

/**
 * Ya tenemos express instalado, sin embargo, antes de poder usarlo tenemos que inicializarlo.
 *
 * A partir de la linea de abajo, nuestra variable "app" tendrá todas las funcionalidades
 * que nos ofrece express.
 */
const app = express();
const productManager = new ProductManager();

app.get('/bienvenida',function(req,res) {
    res.sendFile('./src/index.html' , { root: '.' });
  });
  

app.get('/products', async (req,res) => {
  
  const productos = await productManager.getAll();
  const {query, limit} = req.query;
  let productsFiltrados = [...productos]

  if (limit) {
    productsFiltrados = productsFiltrados.slice(0, Number(limit))
  }

  res.json(productsFiltrados);
});

app.get("/products/:pid", async function(req, res) {

  const productos = await productManager.getAll();
  const idProducto = Number(req.params.pid);
  const producto = productos.find((p) => p.id === idProducto);
  if (!producto) return res.send({ error: "Producto no encontrado" });
  res.send(producto);
});

app.listen(8080, () => {
  console.log("Servidor arriba en el puerto 8080");
});
