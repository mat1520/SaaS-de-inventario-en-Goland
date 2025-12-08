import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PublicLayout from './components/PublicLayout';
import DashboardLayout from './components/DashboardLayout';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductListPage from './pages/ProductListPage';
import ProductFormPage from './pages/ProductFormPage';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ReportsPage from './pages/ReportsPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import SupportPage from './pages/SupportPage';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
                    <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
                    <Route path="/register" element={<PublicLayout><RegisterPage /></PublicLayout>} />
                    <Route path="/terms" element={<PublicLayout><TermsPage /></PublicLayout>} />
                    <Route path="/privacy" element={<PublicLayout><PrivacyPage /></PublicLayout>} />
                    <Route path="/support" element={<PublicLayout><SupportPage /></PublicLayout>} />
                    
                    {/* Private Routes */}
                    <Route path="/dashboard" element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <DashboardPage />
                            </DashboardLayout>
                        </PrivateRoute>
                    } />
                    <Route path="/reports" element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <ReportsPage />
                            </DashboardLayout>
                        </PrivateRoute>
                    } />
                    <Route path="/products" element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <ProductListPage />
                            </DashboardLayout>
                        </PrivateRoute>
                    } />
                    <Route path="/products/new" element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <ProductFormPage />
                            </DashboardLayout>
                        </PrivateRoute>
                    } />
                    <Route path="/products/edit/:id" element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <ProductFormPage />
                            </DashboardLayout>
                        </PrivateRoute>
                    } />
                    <Route path="/settings" element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <ProfilePage />
                            </DashboardLayout>
                        </PrivateRoute>
                    } />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
