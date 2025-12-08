import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductListPage from './pages/ProductListPage';
import ProductFormPage from './pages/ProductFormPage';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import SupportPage from './pages/SupportPage';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Navbar />
                    <div style={{ flex: 1 }}>
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/terms" element={<TermsPage />} />
                            <Route path="/privacy" element={<PrivacyPage />} />
                            <Route path="/support" element={<SupportPage />} />
                            
                            <Route path="/dashboard" element={
                                <PrivateRoute>
                                    <DashboardPage />
                                </PrivateRoute>
                            } />
                            <Route path="/products" element={
                                <PrivateRoute>
                                    <ProductListPage />
                                </PrivateRoute>
                            } />
                            <Route path="/products/new" element={
                                <PrivateRoute>
                                    <ProductFormPage />
                                </PrivateRoute>
                            } />
                            <Route path="/products/edit/:id" element={
                                <PrivateRoute>
                                    <ProductFormPage />
                                </PrivateRoute>
                            } />
                            <Route path="/profile" element={
                                <PrivateRoute>
                                    <ProfilePage />
                                </PrivateRoute>
                            } />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
