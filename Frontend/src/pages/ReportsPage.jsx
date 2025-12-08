import React, { useEffect, useState } from 'react';
import ProductService from '../services/productService';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';

const ReportsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [metrics, setMetrics] = useState({
        totalValue: 0,
        avgPrice: 0,
        totalItems: 0,
        lowStockCount: 0
    });
    const [productsOverTime, setProductsOverTime] = useState([]);
    const [priceDistribution, setPriceDistribution] = useState([]);
    const [topStock, setTopStock] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await ProductService.getAll();
            const productList = data || [];
            setProducts(productList);
            calculateMetrics(productList);
            generateChartsData(productList);
        } catch (error) {
            console.error("Error loading reports data", error);
        } finally {
            setLoading(false);
        }
    };

    const calculateMetrics = (data) => {
        const totalValue = data.reduce((acc, curr) => acc + (curr.price * curr.stock), 0);
        const totalItems = data.reduce((acc, curr) => acc + curr.stock, 0);
        const avgPrice = data.length > 0 ? totalValue / totalItems : 0; // Weighted average price
        const lowStockCount = data.filter(p => p.stock < 10).length;

        setMetrics({
            totalValue,
            avgPrice,
            totalItems,
            lowStockCount
        });
    };

    const generateChartsData = (data) => {
        // 1. Products Added Over Time (Mocking "Sales Report" visual)
        // Group by date (YYYY-MM-DD)
        const timeMap = {};
        data.forEach(p => {
            const date = new Date(p.created_at).toLocaleDateString();
            timeMap[date] = (timeMap[date] || 0) + 1;
        });
        // If not enough data, mock some distribution based on existing items for visualization
        // or just show what we have. Let's show what we have but sorted.
        const timeData = Object.keys(timeMap).map(date => ({
            name: date,
            value: timeMap[date]
        })).sort((a, b) => new Date(a.name) - new Date(b.name));
        
        // If empty or too few, let's just show the last 7 days with 0 if needed, 
        // but for now let's stick to real data.
        setProductsOverTime(timeData);

        // 2. Price Distribution (Mocking "Inventory Valuation" Pie Chart)
        // Ranges: 0-50, 50-100, 100-500, 500+
        let ranges = { '0-50': 0, '50-100': 0, '100-500': 0, '500+': 0 };
        data.forEach(p => {
            if (p.price <= 50) ranges['0-50'] += (p.price * p.stock);
            else if (p.price <= 100) ranges['50-100'] += (p.price * p.stock);
            else if (p.price <= 500) ranges['100-500'] += (p.price * p.stock);
            else ranges['500+'] += (p.price * p.stock);
        });
        const pieData = [
            { name: '$0 - $50', value: ranges['0-50'] },
            { name: '$50 - $100', value: ranges['50-100'] },
            { name: '$100 - $500', value: ranges['100-500'] },
            { name: '$500+', value: ranges['500+'] },
        ].filter(d => d.value > 0);
        setPriceDistribution(pieData);

        // 3. Top Stock Levels (Mocking "Stock Movement" visual)
        const sortedByStock = [...data].sort((a, b) => b.stock - a.stock).slice(0, 10);
        const stockData = sortedByStock.map(p => ({
            name: p.name.length > 10 ? p.name.substring(0, 10) + '...' : p.name,
            stock: p.stock
        }));
        setTopStock(stockData);
    };

    const COLORS = ['#137fec', '#22c55e', '#f59e0b', '#ef4444'];

    if (loading) return <div style={{ padding: '2rem' }}>Loading reports...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Header */}
            <header style={{ 
                position: 'sticky', 
                top: 0, 
                zIndex: 10, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '1rem 1.5rem', 
                borderBottom: '1px solid var(--border-color)', 
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                backdropFilter: 'blur(4px)'
            }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-color)' }}>Reports Center</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button style={{ 
                        position: 'relative', 
                        padding: '0.5rem', 
                        borderRadius: '50%', 
                        border: 'none', 
                        background: 'transparent', 
                        cursor: 'pointer' 
                    }}>
                        <span className="material-symbols-outlined" style={{ color: 'var(--text-secondary)' }}>notifications</span>
                        <span style={{ 
                            position: 'absolute', 
                            top: '6px', 
                            right: '6px', 
                            width: '10px', 
                            height: '10px', 
                            borderRadius: '50%', 
                            backgroundColor: 'var(--danger-color)', 
                            border: '2px solid var(--card-bg)' 
                        }}></span>
                    </button>
                    <button style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        height: '40px', 
                        padding: '0 1rem', 
                        backgroundColor: 'var(--primary-color)', 
                        color: 'white', 
                        fontSize: '0.875rem', 
                        fontWeight: 'bold', 
                        borderRadius: '0.5rem', 
                        border: 'none', 
                        cursor: 'pointer',
                        gap: '0.5rem'
                    }}>
                        <span className="material-symbols-outlined">download</span>
                        <span>Export Reports</span>
                    </button>
                </div>
            </header>

            <main style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    {/* Filters */}
                    <div style={{ 
                        padding: '1.5rem', 
                        borderRadius: '0.75rem', 
                        border: '1px solid var(--border-color)', 
                        backgroundColor: 'var(--card-bg)', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '1rem' 
                    }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Date Range</label>
                                <div style={{ position: 'relative' }}>
                                    <span className="material-symbols-outlined" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', fontSize: '20px' }}>calendar_today</span>
                                    <input type="text" defaultValue="Last 30 Days" style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Product Category</label>
                                <select style={{ width: '100%', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
                                    <option>All Categories</option>
                                    <option>Electronics</option>
                                    <option>Office Supplies</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Supplier</label>
                                <select style={{ width: '100%', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
                                    <option>All Suppliers</option>
                                    <option>TechPro Inc.</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '0.5rem', 
                                padding: '0.5rem 1rem', 
                                backgroundColor: 'var(--primary-color)', 
                                color: 'white', 
                                borderRadius: '0.5rem', 
                                border: 'none', 
                                fontWeight: 'bold', 
                                fontSize: '0.875rem',
                                cursor: 'pointer'
                            }}>
                                <span className="material-symbols-outlined">filter_alt</span>
                                Apply Filters
                            </button>
                        </div>
                    </div>

                    {/* Main Charts Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        
                        {/* Products Added Chart (Sales Report replacement) */}
                        <div style={{ gridColumn: 'span 2', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-color)' }}>Products Added Over Time</h3>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: 'rgba(19, 127, 236, 0.1)', color: 'var(--primary-color)', border: 'none', fontSize: '0.875rem', fontWeight: '500' }}>Daily</button>
                                    <button style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: 'transparent', color: 'var(--text-secondary)', border: 'none', fontSize: '0.875rem', fontWeight: '500' }}>Weekly</button>
                                </div>
                            </div>
                            <div style={{ height: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={productsOverTime}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                                            itemStyle={{ color: 'var(--text-color)' }}
                                        />
                                        <Bar dataKey="value" fill="var(--primary-color)" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Key Metrics */}
                        <div style={{ padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-color)' }}>Key Metrics</h3>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '0.5rem', backgroundColor: 'rgba(19, 127, 236, 0.1)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span className="material-symbols-outlined">attach_money</span>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Total Inventory Value</p>
                                    <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-color)' }}>${metrics.totalValue.toLocaleString()}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '0.5rem', backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span className="material-symbols-outlined">trending_up</span>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Avg. Item Price</p>
                                    <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-color)' }}>${metrics.avgPrice.toFixed(2)}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '0.5rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span className="material-symbols-outlined">inventory_2</span>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Total Items in Stock</p>
                                    <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-color)' }}>{metrics.totalItems.toLocaleString()}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '0.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span className="material-symbols-outlined">warning</span>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Low Stock Items</p>
                                    <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-color)' }}>{metrics.lowStockCount}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Charts Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        
                        {/* Stock Levels (Stock Movement replacement) */}
                        <div style={{ padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-color)', marginBottom: '1rem' }}>Top Stock Levels</h3>
                            <div style={{ height: '250px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={topStock}>
                                        <defs>
                                            <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#137fec" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#137fec" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                                            itemStyle={{ color: 'var(--text-color)' }}
                                        />
                                        <Area type="monotone" dataKey="stock" stroke="#137fec" fillOpacity={1} fill="url(#colorStock)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Price Distribution (Inventory Valuation replacement) */}
                        <div style={{ padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-color)', marginBottom: '1rem' }}>Inventory Value Distribution</h3>
                            <div style={{ height: '250px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={priceDistribution}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {priceDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                                            itemStyle={{ color: 'var(--text-color)' }}
                                            formatter={(value) => `$${value.toLocaleString()}`}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                                {priceDistribution.map((entry, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: COLORS[index % COLORS.length] }}></div>
                                        <span>{entry.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default ReportsPage;