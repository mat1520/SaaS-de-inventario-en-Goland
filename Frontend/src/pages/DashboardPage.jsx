import React, { useEffect, useState } from 'react';
import ProductService from '../services/productService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalValue: 0,
        lowStock: 0,
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await ProductService.getAll();
            const productList = data || [];
            setProducts(productList);
            calculateStats(productList);
            generateRecentActivity(productList);
            generateTopProducts(productList);
        } catch (error) {
            console.error("Error loading dashboard data", error);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (data) => {
        const totalProducts = data.reduce((acc, curr) => acc + curr.stock, 0);
        const totalValue = data.reduce((acc, curr) => acc + (curr.price * curr.stock), 0);
        const lowStock = data.filter(p => p.stock < 10).length;

        setStats({
            totalProducts,
            totalValue,
            lowStock
        });
    };

    const generateRecentActivity = (data) => {
        // Sort by updated_at or created_at descending
        const sorted = [...data].sort((a, b) => {
            const dateA = new Date(a.updated_at || a.created_at);
            const dateB = new Date(b.updated_at || b.created_at);
            return dateB - dateA;
        });

        const activity = sorted.slice(0, 5).map(p => {
            const isLowStock = p.stock < 10;
            const isNew = new Date(p.created_at).getTime() === new Date(p.updated_at).getTime();
            
            let action = 'Updated';
            let type = 'neutral';
            let icon = 'edit';

            if (isNew) {
                action = 'New Product';
                type = 'positive';
                icon = 'add_circle';
            } else if (isLowStock) {
                action = 'Low Stock Alert';
                type = 'warning';
                icon = 'warning';
            }

            return {
                id: p.id,
                action: action,
                item: p.name,
                time: new Date(p.updated_at || p.created_at).toLocaleDateString(),
                type: type,
                icon: icon
            };
        });

        setRecentActivity(activity);
    };

    const generateTopProducts = (data) => {
        // Top 5 products by total value (price * stock)
        const sorted = [...data].sort((a, b) => (b.price * b.stock) - (a.price * a.stock));
        const top = sorted.slice(0, 5).map(p => ({
            name: p.name.length > 10 ? p.name.substring(0, 10) + '...' : p.name,
            value: p.price * p.stock
        }));
        setTopProducts(top);
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading dashboard...</div>;

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text-color)' }}>Dashboard</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Overview of your inventory status.</p>
            </div>
            
            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ backgroundColor: 'var(--card-bg)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Total Stock</p>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginTop: '0.5rem' }}>{stats.totalProducts}</h3>
                        </div>
                        <div style={{ padding: '0.5rem', backgroundColor: 'rgba(19, 127, 236, 0.1)', borderRadius: '8px', color: 'var(--primary-color)' }}>
                            <span className="material-symbols-outlined">inventory_2</span>
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: 'var(--card-bg)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Stock Value</p>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginTop: '0.5rem' }}>${stats.totalValue.toLocaleString()}</h3>
                        </div>
                        <div style={{ padding: '0.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', color: '#10b981' }}>
                            <span className="material-symbols-outlined">attach_money</span>
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: 'var(--card-bg)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Low Stock Items</p>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginTop: '0.5rem' }}>{stats.lowStock}</h3>
                        </div>
                        <div style={{ padding: '0.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', color: '#ef4444' }}>
                            <span className="material-symbols-outlined">warning</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts & Activity Section */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                {/* Chart */}
                <div style={{ flex: '2', minWidth: '300px', backgroundColor: 'var(--card-bg)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Top Products by Value</h3>
                    <div style={{ height: '300px', width: '100%' }}>
                        {topProducts.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topProducts} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                                        itemStyle={{ color: 'var(--text-color)' }}
                                        formatter={(value) => [`$${value.toLocaleString()}`, 'Value']}
                                    />
                                    <Bar dataKey="value" fill="var(--primary-color)" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
                                No data available
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Activity */}
                <div style={{ flex: '1', minWidth: '300px', backgroundColor: 'var(--card-bg)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Recent Activity</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {recentActivity.length > 0 ? (
                            recentActivity.map((activity) => (
                                <div key={activity.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                                    <div style={{ 
                                        width: '40px', 
                                        height: '40px', 
                                        borderRadius: '50%', 
                                        backgroundColor: activity.type === 'positive' ? 'rgba(16, 185, 129, 0.1)' : activity.type === 'warning' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(19, 127, 236, 0.1)',
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        color: activity.type === 'positive' ? '#10b981' : activity.type === 'warning' ? '#f59e0b' : '#137fec'
                                    }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                                            {activity.icon}
                                        </span>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontSize: '0.9rem', fontWeight: '500' }}>{activity.action} <span style={{ fontWeight: 'bold' }}>{activity.item}</span></p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{activity.time}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '1rem' }}>
                                No recent activity
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
