import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Layout from '../components/layout/Layout';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import UserDashboard from '../pages/user/UserDashboard';
import EarthquakeList from '../pages/earthquakes/EarthquakeList';
import EarthquakeDetails from '../pages/earthquakes/EarthquakeDetails';
import CreateEarthquake from '../pages/earthquakes/CreateEarthquake';
import EditEarthquake from '../pages/earthquakes/EditEarthquake';
import AnalyticsDashboard from '../pages/analytics/AnalyticsDashboard';
import MagnitudeAnalytics from '../pages/analytics/MagnitudeAnalytics';
import DepthAnalytics from '../pages/analytics/DepthAnalytics';
import CountryAnalytics from '../pages/analytics/CountryAnalytics';
import TimeAnalytics from '../pages/analytics/TimeAnalytics';
import StatisticsDashboard from '../pages/statistics/StatisticsDashboard';
import SearchPage from '../pages/search/SearchPage';
import Profile from '../pages/user/Profile';
import Settings from '../pages/user/Settings';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserManagement from '../pages/admin/UserManagement';
import SystemSettings from '../pages/admin/SystemSettings';
import AuditLogs from '../pages/admin/AuditLogs';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user?.role)) return <Navigate to="/dashboard" />;
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="earthquakes" element={<EarthquakeList />} />
        <Route path="earthquakes/create" element={<PrivateRoute allowedRoles={['admin', 'moderator']}><CreateEarthquake /></PrivateRoute>} />
        <Route path="earthquakes/:id" element={<EarthquakeDetails />} />
        <Route path="earthquakes/:id/edit" element={<PrivateRoute allowedRoles={['admin', 'moderator']}><EditEarthquake /></PrivateRoute>} />
        <Route path="analytics" element={<AnalyticsDashboard />} />
        <Route path="analytics/magnitude" element={<MagnitudeAnalytics />} />
        <Route path="analytics/depth" element={<DepthAnalytics />} />
        <Route path="analytics/country" element={<CountryAnalytics />} />
        <Route path="analytics/time" element={<TimeAnalytics />} />
        <Route path="statistics" element={<StatisticsDashboard />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="admin/dashboard" element={<PrivateRoute allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>} />
        <Route path="admin/users" element={<PrivateRoute allowedRoles={['admin']}><UserManagement /></PrivateRoute>} />
        <Route path="admin/settings" element={<PrivateRoute allowedRoles={['admin']}><SystemSettings /></PrivateRoute>} />
        <Route path="admin/audit-logs" element={<PrivateRoute allowedRoles={['admin']}><AuditLogs /></PrivateRoute>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
