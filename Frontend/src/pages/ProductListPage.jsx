import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductService from '../services/productService';
import Header from '../components/Header';

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
            console.error("Error loading products", error);
            setError('Could not load products. Ensure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await ProductService.remove(id);
                loadProducts();
            } catch (error) {
                console.error("Error deleting product", error);
                alert('Error deleting the product');
            }
        }
    };

    return (
        <div className="container">
            <Header title="Product List">
                <Link to="/products/new" className="btn btn-primary">New Product</Link>
            </Header>

            {error && <div className="alert alert-error">{error}</div>}

            {loading ? (
                <p>Loading products...</p>
            ) : (
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Actions</th>
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
                                            <Link to={`/products/edit/${product.id}`} className="btn btn-primary" style={{ marginRight: '0.5rem', padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>Edit</Link>
                                            <button onClick={() => handleDelete(product.id)} className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>No products found.</td>
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
