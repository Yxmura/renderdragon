import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';
import AdminResourcesManager from '@/components/admin/AdminResourcesManager';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const Admin = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cow-purple"></div>
      </div>
    );
  }

  const authorizedEmails = ['yamura@duck.com', 'theckie@protonmail.com', 'vovoplaygame3@gmail.com'];
  const isAuthorized = user && authorizedEmails.includes(user.email);

  if (!user || !isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Admin Panel - Renderdragon</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 cow-grid-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-8">
              <Shield className="h-8 w-8 text-cow-purple" />
              <h1 className="text-4xl md:text-5xl font-vt323">
                Admin <span className="text-cow-purple">Panel</span>
              </h1>
            </div>
            
            <AdminResourcesManager />
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
