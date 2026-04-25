import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { api } from '../utils/api';
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ChevronDown,
  ChevronRight,
  Home,
  BarChart3,
  Store
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    'Main': true,
    'Management': true,
    'Analytics': false,
    'Settings': false
  });
  const location = useLocation();
  const { user, logout } = useAuth();

  const [counts, setCounts] = useState({
    products: null,
    categories: null,
    orders: null,
    users: null
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [products, categories, orders, users] = await Promise.all([
          api.getProducts().catch(() => ({ data: [] })),
          api.getCategories().catch(() => ({ data: [] })),
          api.getOrders().catch(() => ({ data: [] })),
          api.getUsers().catch(() => [])
        ]);
        
        setCounts({
          products: products?.data?.length || 0,
          categories: categories?.data?.length || 0,
          orders: orders?.data?.length || 0,
          users: Array.isArray(users) ? users.length : 0
        });
      } catch (err) {
        console.error("Failed to fetch counts:", err);
      }
    };
    fetchCounts();
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const menuSections = [
    {
      title: 'Main',
      items: [
        { 
          name: 'Dashboard', 
          icon: LayoutDashboard, 
          path: '/admin', 
          description: 'Overview and analytics',
          badge: null
        }
      ]
    },
    {
      title: 'Management',
      items: [
        { 
          name: 'Products', 
          icon: Package, 
          path: '/admin/products', 
          description: 'Manage products',
          badge: counts.products !== null ? counts.products : '...'
        },
        { 
          name: 'Categories', 
          icon: Tags, 
          path: '/admin/categories', 
          description: 'Manage categories',
          badge: counts.categories !== null ? counts.categories : '...'
        },
        { 
          name: 'Orders', 
          icon: Store, 
          path: '/admin/orders', 
          description: 'Manage orders',
          badge: counts.orders !== null ? counts.orders : '...'
        },
        { 
          name: 'Users', 
          icon: Users, 
          path: '/admin/users', 
          description: 'Manage users',
          badge: counts.users !== null ? counts.users : '...'
        }
      ]
    },
    {
      title: 'Analytics',
      items: [
        { 
          name: 'Reports', 
          icon: BarChart3, 
          path: '/admin/reports', 
          description: 'View reports',
          badge: null
        }
      ]
    },
    {
      title: 'Settings',
      items: [
        { 
          name: 'Store Settings', 
          icon: Settings, 
          path: '/admin/settings', 
          description: 'Store configuration',
          badge: null
        }
      ]
    }
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out border-r border-gray-200
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-xs text-gray-500">Store Management</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
          {menuSections.map((section) => (
            <div key={section.title}>
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors"
              >
                <span>{section.title}</span>
                {expandedSections[section.title] ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {/* Section Items */}
              {expandedSections[section.title] && (
                <div className="mt-2 space-y-1">
                  {section.items.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`
                          group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                          ${isActive 
                            ? 'bg-primary text-white shadow-md' 
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          }
                        `}
                        onClick={() => setSidebarOpen(false)}
                      >
                        {/* Active Indicator */}
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                        )}

                        {/* Icon */}
                        <div className={`
                          flex items-center justify-center w-10 h-10 rounded-lg transition-all
                          ${isActive 
                            ? 'bg-white/20' 
                            : 'bg-gray-100 group-hover:bg-gray-200'
                          }
                        `}>
                          <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{item.name}</div>
                          <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                            {item.description}
                          </div>
                        </div>

                        {/* Badge */}
                        {item.badge && (
                          <span className={`
                            px-2 py-1 text-xs font-medium rounded-full
                            ${isActive 
                              ? 'bg-white/20 text-white' 
                              : 'bg-gray-100 text-gray-600'
                            }
                          `}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
            <div className="relative">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
                alt={user?.name || 'Admin'}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {user?.name || 'Admin User'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || 'admin@example.com'}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 lg:hidden sticky top-0 z-40">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
                <p className="text-xs text-gray-500">Store Management</p>
              </div>
            </div>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </header>

        {/* Desktop Breadcrumb */}
        <div className="hidden lg:block bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Home className="w-4 h-4" />
            <span>/</span>
            <span className="text-gray-900 font-medium">Admin</span>
            <span>/</span>
            <span className="text-gray-900 font-medium capitalize">
              {location.pathname.split('/').pop() || 'Dashboard'}
            </span>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6 lg:p-8 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
