import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductService from '../services/productService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DashboardPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalValue: 0,
        lowStock: 0,
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await ProductService.getAll();
            const productList = data || [];
            setProducts(productList);
            calculateStats(productList);
        } catch (error) {
            console.error("Error cargando datos del dashboard", error);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (data) => {
        const totalProducts = data.length;
        const totalValue = data.reduce((acc, curr) => acc + (curr.price * curr.stock), 0);
        const lowStock = data.filter(p => p.stock < 10).length;

        setStats({
            totalProducts,
            totalValue,
            lowStock
        });
    };

    // Mock data for sales chart (since backend doesn't have sales yet)
    const salesData = [
        { name: 'Ene', ventas: 4000 },
        { name: 'Feb', ventas: 3000 },
        { name: 'Mar', ventas: 2000 },
        { name: 'Abr', ventas: 2780 },
        { name: 'May', ventas: 1890 },
        { name: 'Jun', ventas: 2390 },
        { name: 'Jul', ventas: 3490 },
        { name: 'Ago', ventas: 4200 },
        { name: 'Sep', ventas: 3800 },
        { name: 'Oct', ventas: 5100 },
        { name: 'Nov', ventas: 4800 },
        { name: 'Dic', ventas: 6000 },
    ];

    const stockData = [
        { name: 'Stock Bajo', value: stats.lowStock },
        { name: 'Stock Saludable', value: stats.totalProducts - stats.lowStock },
    ];

    const COLORS = ['#e74c3c', '#2ecc71'];

    if (loading) return <div className="container">Cargando dashboard...</div>;

    return (
        <div className="container">
            <h2 style={{ marginBottom: '2rem' }}>Dashboard General</h2>
            
            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="card" style={{ borderLeft: '5px solid #4a90e2' }}>
                    <h3 style={{ color: 'var(--text-color)', fontSize: '1rem', opacity: 0.7 }}>Total Productos</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-color)' }}>{stats.totalProducts}</p>
                </div>
                <div className="card" style={{ borderLeft: '5px solid #2ecc71' }}>
                    <h3 style={{ color: 'var(--text-color)', fontSize: '1rem', opacity: 0.7 }}>Valor del Inventario</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-color)' }}>${stats.totalValue.toLocaleString()}</p>
                </div>
                <div className="card" style={{ borderLeft: '5px solid #e74c3c' }}>
                    <h3 style={{ color: 'var(--text-color)', fontSize: '1rem', opacity: 0.7 }}>Stock Bajo Alert</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-color)' }}>{stats.lowStock}</p>
                </div>
            </div>

            {/* Charts Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                <div className="card">
                    <h3 style={{ marginBottom: '1.5rem' }}>Estado del Stock</h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stockData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {stockData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center' }}>
                <Link to="/products" className="btn btn-primary">Ver Inventario Completo</Link>
            </div>
        </div>
    );
};

export default DashboardPage;
