import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section style={{ padding: '4rem 1rem', textAlign: 'center' }}>
                <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ maxWidth: '800px' }}>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', lineHeight: '1.1', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
                            Effortless Inventory Management
                        </h1>
                        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                            Streamline your stock, prevent shortages, and boost your bottom line with our intuitive platform.
                        </p>
                    </div>
                    <Link to="/register" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
                        Start Free 14-Day Trial
                    </Link>
                    
                    <div style={{ 
                        width: '100%', 
                        maxWidth: '900px', 
                        marginTop: '3rem', 
                        aspectRatio: '16/9', 
                        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBpfbaT-r8xrMd3vZQAn1JKwNf5yjI1kzZugQZ1p4XlqO8m0L8ox1pBsz3-5QIdnYSTCiD8Fb2mrlVsSlcaJShSWereHdScBaJA9AQ2ZgSevpKubMdgnUfRjOl6S9pJk2ZxTXNtijH-Cd1-mO5Q7DoSbiV9eJNjm3pGkt1ElUWyMzcDHo4SyGfPB31FDnDfQnhIUOIgh2bHcPGuFTrCQxQx_1GPdnYW-nrEsYPy6uOyO3UdlmLr92Kg5-IxJ9RmM8Wd7y5k7PmSYPg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '12px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}></div>
                </div>
            </section>

            {/* Features Section */}
            <section style={{ padding: '5rem 1rem' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                            Everything you need to manage inventory
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                            Our platform is designed to be powerful yet simple to use, giving you full control over your stock.
                        </p>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                        <FeatureCard 
                            icon="sync_alt" 
                            title="Real-Time Tracking" 
                            desc="Monitor stock levels across all locations instantly." 
                        />
                        <FeatureCard 
                            icon="assessment" 
                            title="Automated Reporting" 
                            desc="Generate insightful reports with a single click." 
                        />
                        <FeatureCard 
                            icon="warehouse" 
                            title="Multi-Warehouse Sync" 
                            desc="Keep your inventory perfectly synchronized." 
                        />
                        <FeatureCard 
                            icon="group" 
                            title="Supplier Management" 
                            desc="Manage purchase orders and supplier relationships." 
                        />
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section style={{ padding: '5rem 1rem' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Trusted by businesses worldwide</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Hear what our customers have to say about our platform.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        <TestimonialCard 
                            quote="Inventify is a game-changer. We've cut down our inventory errors by 90% and saved countless hours. It's incredibly intuitive."
                            name="John Doe"
                            role="CEO, TechPro"
                            img="https://lh3.googleusercontent.com/aida-public/AB6AXuB20-_aPOKtA7VLJ0K7b1ayxZEhpGw1MBcbVEVLKQMi7pUxIaSrxc6yIfJhwsBiI7VV-PdKwmrFPp1lha_e8Oyy46RarFqMcwZINn84-SgUQisblYopEzu-FALnYoIiLCY-aerNltHDJshwgc82K0Za7wXIHyC_0EfyAfyyoFdm6WE4T3PM7Z4m6A2K_yzEvq14tbDSK4V0O_1RfnuQoM6g7VIcySmokYkuytIP4E-_sBFejy1xVRhq41PQz4Hki8J1jLF5NOTkVXc"
                        />
                        <TestimonialCard 
                            quote="The real-time tracking feature is phenomenal. We always know exactly what we have in stock, which has significantly improved our order fulfillment."
                            name="Jane Smith"
                            role="Warehouse Manager"
                            img="https://lh3.googleusercontent.com/aida-public/AB6AXuAzCpX8f4S41nCtF6VB65BkVRbiDSCOIeacK0o9UfJhFuN_E8-MVAQUKvDiOSbqHpe1-dC2DAHvmM7MchLe_qO31jxiJ1C3QKUX8w8MYqoO3CN-m_GyFtaSkIwPLKYRsFntxJpw8r5kSPDwFADCzbFZ_9agjycvx_M2ChHNn4oHZLAHmT5Kcbug-ZZCxXbBCqCQltaNMtBeOGFmPverJx2flcgafLP3sch-ph-XD_lV-RoAlp7yBm2EqAaS4m19jMuEd8rHxE8uds4"
                        />
                        <TestimonialCard 
                            quote="The automated reports save me hours every week. I can get a snapshot of my business health with a single click. Highly recommended!"
                            name="Mike Johnson"
                            role="Owner, eCommerce Store"
                            img="https://lh3.googleusercontent.com/aida-public/AB6AXuDoZB9lRMnboJXrB3ZcLF3jh2Av5NiwCZtd7ktiucJQUVPiV55iIWdWryltTRxihpRGPoD67x6fm2qiQVzKrtNzX144jz2jg8e83KCkcfXHAc9K08rowC1aC8O4fOwAgzSmLQAjjQYEP16WLSmeT--WtAqQEGuOoHuG9rB_liei_utS19u0d1akDf07v48qqnhl6Y_He9aL_k0AKmBumNCmeSRJukZmeoAv2SgGRlim27HgimbQmrNA6QVvJjnlwNUnDhPNdbn1M2s"
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ padding: '4rem 1rem' }}>
                <div className="container">
                    <div style={{ 
                        backgroundColor: 'rgba(19, 127, 236, 0.1)', 
                        borderRadius: '12px', 
                        padding: '4rem 2rem', 
                        textAlign: 'center' 
                    }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Ready to take control of your inventory?</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                            Join thousands of businesses who trust Inventify for seamless inventory management. Start your free trial today, no credit card required.
                        </p>
                        <Link to="/register" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
                            Get Started for Free
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
        <div style={{ color: 'var(--primary-color)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>{icon}</span>
        </div>
        <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{desc}</p>
        </div>
    </div>
);

const TestimonialCard = ({ quote, name, role, img }) => (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1.5rem' }}>
        <p style={{ fontWeight: '500', fontSize: '1rem' }}>"{quote}"</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: 'auto' }}>
            <img src={img} alt={name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
            <div>
                <p style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{name}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{role}</p>
            </div>
        </div>
    </div>
);

export default LandingPage;
