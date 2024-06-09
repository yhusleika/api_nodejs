import {Productos} from '../models/producto.js'


export const getProductos = async(req, res) =>{
    try {
        const productos = await Productos.findAll()
        res.json(productos)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const getProducto = async(req, res) =>{
    try {
        const {id_produc} = req.params
        const producto = await Productos.findOne({
            where:{
                id_produc
            },
        });
        if(!producto)
            return res.status(404).json({message: "Producto no existente"});
        res.json(producto)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const createProductos = async(req, res) =>{
    const {nombre_produc, desc_produc, precio_produc, stock_produc} = req.body

    try {
        const newProducto = await Productos.create({
            nombre_produc,
            desc_produc,
            precio_produc,
            stock_produc
        });
    
        res.json(newProducto)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const updateProductos = async(req, res) =>{
    try {
        const {id_produc} = req.params;
        const {nombre_produc, desc_produc, precio_produc,stock_produc} = req.body

        const producto = await Productos.findByPk(id_produc)
        producto.nombre_produc = nombre_produc
        producto.desc_produc = desc_produc
        producto.precio_produc = precio_produc
        producto.stock_produc = stock_produc
        await producto.save()

        res.json(producto)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const deleteProductos = async(req, res) =>{
    try {
        const {id_produc} = req.params;
        await Productos.destroy({
            where: {
                id_produc,
            },
        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};