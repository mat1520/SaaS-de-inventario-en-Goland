import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductListPage from './pages/ProductListPage';
import ProductFormPage from './pages/ProductFormPage';
import ProfilePage from './pages/ProfilePage';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <div style={{ padding: '20px' }}>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        
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
                        
                        <Route path="/" element={<Navigate to="/products" />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
