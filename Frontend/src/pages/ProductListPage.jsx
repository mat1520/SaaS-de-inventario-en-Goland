import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductService from '../services/productService';

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await ProductService.getAll();
            setProducts(data || []);
        } catch (error) {
            console.error("Error cargando productos", error);
            setError('No se pudieron cargar los productos. Asegúrate de que el backend esté corriendo.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            try {
                await ProductService.remove(id);
                loadProducts();
            } catch (error) {
                console.error("Error eliminando producto", error);
                alert('Error al eliminar el producto');
            }
        }
    };

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Lista de Productos</h2>
                <Link to="/products/new" className="btn btn-primary">Nuevo Producto</Link>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            {loading ? (
                <p>Cargando productos...</p>
            ) : (
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>${product.price}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <Link to={`/products/edit/${product.id}`} className="btn btn-primary" style={{ marginRight: '0.5rem', padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>Editar</Link>
                                            <button onClick={() => handleDelete(product.id)} className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>No hay productos registrados.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProductListPage;
