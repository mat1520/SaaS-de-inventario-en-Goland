import React, { useEffect, useState } from 'react';
import ProductService from '../services/productService';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

    // Mock data for Inventory Movement
    const movementData = [
        { name: 'Mon', in: 40, out: 24 },
        { name: 'Tue', in: 30, out: 13 },
        { name: 'Wed', in: 20, out: 58 },
        { name: 'Thu', in: 27, out: 39 },
        { name: 'Fri', in: 18, out: 48 },
        { name: 'Sat', in: 23, out: 38 },
        { name: 'Sun', in: 34, out: 43 },
    ];

    // Mock data for Recent Activity
    const recentActivity = [
        { id: 1, action: 'Restocked', item: 'Wireless Mouse', time: '2 mins ago', type: 'positive' },
        { id: 2, action: 'Sold', item: 'Mechanical Keyboard', time: '15 mins ago', type: 'negative' },
        { id: 3, action: 'Updated', item: 'USB-C Cable', time: '1 hour ago', type: 'neutral' },
        { id: 4, action: 'Low Stock', item: 'Monitor Stand', time: '2 hours ago', type: 'warning' },
        { id: 5, action: 'Restocked', item: 'HDMI Adapter', time: '5 hours ago', type: 'positive' },
    ];

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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                        <span style={{ color: '#10b981', display: 'flex', alignItems: 'center' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>trending_up</span>
                            +12%
                        </span>
                        <span style={{ color: 'var(--text-secondary)' }}>from last month</span>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                        <span style={{ color: '#10b981', display: 'flex', alignItems: 'center' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>trending_up</span>
                            +5%
                        </span>
                        <span style={{ color: 'var(--text-secondary)' }}>from last month</span>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                        <span style={{ color: '#ef4444', display: 'flex', alignItems: 'center' }}>
                            {stats.lowStock > 0 ? 'Action needed' : 'All good'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Charts & Activity Section */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                {/* Chart */}
                <div style={{ flex: '2', minWidth: '300px', backgroundColor: 'var(--card-bg)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Inventory Movement</h3>
                    <div style={{ height: '300px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={movementData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#137fec" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#137fec" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                                    itemStyle={{ color: 'var(--text-color)' }}
                                />
                                <Area type="monotone" dataKey="in" stroke="#137fec" strokeWidth={2} fillOpacity={1} fill="url(#colorIn)" name="Stock In" />
                                <Area type="monotone" dataKey="out" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorOut)" name="Stock Out" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activity */}
                <div style={{ flex: '1', minWidth: '300px', backgroundColor: 'var(--card-bg)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Recent Activity</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {recentActivity.map((activity) => (
                            <div key={activity.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                                <div style={{ 
                                    width: '40px', 
                                    height: '40px', 
                                    borderRadius: '50%', 
                                    backgroundColor: activity.type === 'positive' ? 'rgba(16, 185, 129, 0.1)' : activity.type === 'negative' ? 'rgba(239, 68, 68, 0.1)' : activity.type === 'warning' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(19, 127, 236, 0.1)',
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    color: activity.type === 'positive' ? '#10b981' : activity.type === 'negative' ? '#ef4444' : activity.type === 'warning' ? '#f59e0b' : '#137fec'
                                }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                                        {activity.type === 'positive' ? 'add_shopping_cart' : activity.type === 'negative' ? 'shopping_cart_checkout' : activity.type === 'warning' ? 'priority_high' : 'edit'}
                                    </span>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: '0.9rem', fontWeight: '500' }}>{activity.action} <span style={{ fontWeight: 'bold' }}>{activity.item}</span></p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button style={{ 
                        width: '100%', 
                        marginTop: '1rem', 
                        padding: '0.75rem', 
                        backgroundColor: 'transparent', 
                        border: '1px solid var(--border-color)', 
                        borderRadius: '8px', 
                        color: 'var(--primary-color)', 
                        fontWeight: '500', 
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}>
                        View All Activity
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
