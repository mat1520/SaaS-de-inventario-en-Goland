import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductService from '../services/productService';

const ProductFormPage = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: ''
    });
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    useEffect(() => {
        if (isEdit) {
            loadProduct();
        }
    }, [id]);

    const loadProduct = async () => {
        try {
            const data = await ProductService.getById(id);
            setProduct(data);
        } catch (error) {
            console.error("Error cargando producto", error);
            setError('Error al cargar el producto');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await ProductService.update(id, product);
            } else {
                await ProductService.create(product);
            }
            navigate('/products');
        } catch (error) {
            console.error("Error guardando producto", error);
            setError('Error al guardar el producto. Verifique los datos.');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '600px' }}>
            <div className="card">
                <h2 style={{ marginBottom: '1.5rem' }}>{isEdit ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                {error && <div className="alert alert-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={product.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Descripción:</label>
                        <textarea
                            name="description"
                            className="form-control"
                            value={product.description}
                            onChange={handleChange}
                            required
                            style={{ minHeight: '100px' }}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Precio:</label>
                        <input
                            type="number"
                            name="price"
                            className="form-control"
                            value={product.price}
                            onChange={handleChange}
                            required
                            min="0.01"
                            step="0.01"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Stock:</label>
                        <input
                            type="number"
                            name="stock"
                            className="form-control"
                            value={product.stock}
                            onChange={handleChange}
                            required
                            min="0"
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button type="submit" className="btn btn-primary">Guardar</button>
                        <button type="button" className="btn" style={{ backgroundColor: '#ccc' }} onClick={() => navigate('/products')}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductFormPage;
