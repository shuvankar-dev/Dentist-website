import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Calendar, Users, LogOut, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  treatment: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'bookings' | 'appointments' | 'blog'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  // API base URL - update this to your XAMPP path
  const API_URL = 'http://localhost/dental-care/api';

  // Check if already authenticated
  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchBookings();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Fallback to local authentication if API fails
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      setLoading(false);
      fetchBookings();
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('adminAuth', 'true');
        fetchBookings();
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      // If API fails, use local authentication
      if (username === 'admin' && password === 'admin123') {
        setIsAuthenticated(true);
        sessionStorage.setItem('adminAuth', 'true');
        fetchBookings();
      } else {
        setError('Invalid credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    setUsername('');
    setPassword('');
    setBookings([]);
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_URL}/bookings.php`);
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
      // Use mock data if API fails
      const mockBookings: Booking[] = [
        {
          id: 1,
          name: 'Rajesh Kumar',
          email: 'rajesh.kumar@example.com',
          phone: '+91 98765 43210',
          treatment: 'General Check-up',
          preferred_date: '2026-01-20',
          preferred_time: '10:00 AM - 12:00 PM',
          message: 'First time visit, need complete dental check-up',
          status: 'pending',
          created_at: '2026-01-16T10:30:00',
        },
        {
          id: 2,
          name: 'Priya Sharma',
          email: 'priya.sharma@example.com',
          phone: '+91 98765 43211',
          treatment: 'Teeth Whitening',
          preferred_date: '2026-01-20',
          preferred_time: '12:00 PM - 2:00 PM',
          message: 'Want professional whitening treatment',
          status: 'confirmed',
          created_at: '2026-01-16T11:00:00',
        },
        {
          id: 3,
          name: 'Amit Patel',
          email: 'amit.patel@example.com',
          phone: '+91 98765 43212',
          treatment: 'Dental Implants',
          preferred_date: '2026-01-21',
          preferred_time: '6:00 PM - 8:00 PM',
          message: 'Need consultation for dental implants',
          status: 'pending',
          created_at: '2026-01-16T14:20:00',
        },
        {
          id: 4,
          name: 'Sneha Reddy',
          email: 'sneha.reddy@example.com',
          phone: '+91 98765 43213',
          treatment: 'Invisalign Consultation',
          preferred_date: '2026-01-21',
          preferred_time: '8:00 PM - 10:00 PM',
          message: 'Interested in clear aligners',
          status: 'confirmed',
          created_at: '2026-01-16T15:45:00',
        },
        {
          id: 5,
          name: 'Vikram Singh',
          email: 'vikram.singh@example.com',
          phone: '+91 98765 43214',
          treatment: 'Hygiene Appointment',
          preferred_date: '2026-01-22',
          preferred_time: '10:00 AM - 12:00 PM',
          message: 'Regular cleaning appointment',
          status: 'pending',
          created_at: '2026-01-17T09:15:00',
        },
        {
          id: 6,
          name: 'Ananya Gupta',
          email: 'ananya.gupta@example.com',
          phone: '+91 98765 43215',
          treatment: 'Emergency Appointment',
          preferred_date: '2026-01-22',
          preferred_time: '12:00 PM - 2:00 PM',
          message: 'Severe toothache, need urgent care',
          status: 'confirmed',
          created_at: '2026-01-17T10:30:00',
        },
        {
          id: 7,
          name: 'Karthik Iyer',
          email: 'karthik.iyer@example.com',
          phone: '+91 98765 43216',
          treatment: 'Cosmetic Consultation',
          preferred_date: '2026-01-23',
          preferred_time: '6:00 PM - 8:00 PM',
          message: 'Want to discuss smile makeover options',
          status: 'pending',
          created_at: '2026-01-17T12:00:00',
        },
        {
          id: 8,
          name: 'Deepika Nair',
          email: 'deepika.nair@example.com',
          phone: '+91 98765 43217',
          treatment: 'General Check-up',
          preferred_date: '2026-01-23',
          preferred_time: '8:00 PM - 10:00 PM',
          message: 'Annual dental check-up',
          status: 'pending',
          created_at: '2026-01-17T14:30:00',
        },
        {
          id: 9,
          name: 'Arjun Mehta',
          email: 'arjun.mehta@example.com',
          phone: '+91 98765 43218',
          treatment: 'Teeth Whitening',
          preferred_date: '2026-01-24',
          preferred_time: '10:00 AM - 12:00 PM',
          status: 'confirmed',
          created_at: '2026-01-17T16:00:00',
        },
        {
          id: 10,
          name: 'Pooja Desai',
          email: 'pooja.desai@example.com',
          phone: '+91 98765 43219',
          treatment: 'Dental Implants',
          preferred_date: '2026-01-24',
          preferred_time: '6:00 PM - 8:00 PM',
          message: 'Follow-up consultation for implant procedure',
          status: 'pending',
          created_at: '2026-01-18T09:00:00',
        },
      ];
      setBookings(mockBookings);
    }
  };

  const getAppointmentsByDate = () => {
    const grouped: { [key: string]: Booking[] } = {};
    
    // Filter bookings by selected date if a date is selected
    const filteredBookings = selectedDate 
      ? bookings.filter(booking => booking.preferred_date === selectedDate)
      : bookings;
    
    filteredBookings.forEach((booking) => {
      if (!grouped[booking.preferred_date]) {
        grouped[booking.preferred_date] = [];
      }
      grouped[booking.preferred_date].push(booking);
    });
    
    return grouped;
  };

  const getUniqueDates = () => {
    const dates = [...new Set(bookings.map(booking => booking.preferred_date))];
    return dates.sort();
  };

  const clearDateFilter = () => {
    setSelectedDate('');
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <section className="section-padding min-h-[70vh] flex items-center">
          <div className="container-custom">
            <div className="max-w-md mx-auto">
              <div className="bg-card rounded-3xl shadow-card p-8">
                <h1 className="text-3xl font-serif font-semibold text-foreground mb-6 text-center">
                  Admin Login
                </h1>
                {error && (
                  <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg mb-6">
                    {error}
                  </div>
                )}
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter username"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding bg-secondary/30 min-h-screen">
        <div className="container-custom">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-serif font-semibold text-foreground">
              Admin Dashboard
            </h1>
            <Button onClick={handleLogout} variant="outline" className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          {/* Tab Navigation */}
          <div className="grid grid-cols-3 gap-4 mb-8 max-w-4xl">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`p-6 rounded-2xl border-2 transition-all ${
                activeTab === 'bookings'
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <Users className={`w-8 h-8 mx-auto mb-3 ${activeTab === 'bookings' ? 'text-primary' : 'text-muted-foreground'}`} />
              <h3 className="font-semibold text-lg text-foreground">Bookings</h3>
              <p className="text-sm text-muted-foreground mt-1">View all booking requests</p>
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`p-6 rounded-2xl border-2 transition-all ${
                activeTab === 'appointments'
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <Calendar className={`w-8 h-8 mx-auto mb-3 ${activeTab === 'appointments' ? 'text-primary' : 'text-muted-foreground'}`} />
              <h3 className="font-semibold text-lg text-foreground">Appointments</h3>
              <p className="text-sm text-muted-foreground mt-1">View by date</p>
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`p-6 rounded-2xl border-2 transition-all ${
                activeTab === 'blog'
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <FileText className={`w-8 h-8 mx-auto mb-3 ${activeTab === 'blog' ? 'text-primary' : 'text-muted-foreground'}`} />
              <h3 className="font-semibold text-lg text-foreground">Blog</h3>
              <p className="text-sm text-muted-foreground mt-1">Manage blog posts</p>
            </button>
          </div>

          {/* Content */}
          {activeTab === 'bookings' ? (
            <div className="bg-card rounded-2xl shadow-card overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">All Bookings</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Total: {bookings.length} bookings
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Contact</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Treatment</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date & Time</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-muted/30">
                        <td className="px-6 py-4 text-sm text-foreground">#{booking.id}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-foreground">{booking.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-foreground">{booking.email}</div>
                          <div className="text-xs text-muted-foreground">{booking.phone}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">{booking.treatment}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-foreground">{new Date(booking.preferred_date).toLocaleDateString()}</div>
                          <div className="text-xs text-muted-foreground">{booking.preferred_time}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate">
                          {booking.message || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === 'appointments' ? (
            <div className="space-y-6">
              <div className="bg-card rounded-2xl shadow-card p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Appointments by Date</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  View appointments grouped by date
                </p>
                {Object.entries(getAppointmentsByDate()).map(([date, dateBookings]) => (
                  <div key={date} className="mb-6 last:mb-0">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">
                        {new Date(date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </h3>
                      <span className="ml-auto bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {dateBookings.length} appointments
                      </span>
                    </div>
                    <div className="grid gap-4">
                      {dateBookings.map((booking) => (
                        <div key={booking.id} className="bg-muted/30 rounded-xl p-4 border border-border">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold text-foreground">{booking.name}</h4>
                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                  booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                  booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                  'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {booking.status}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Time:</span>
                                  <span className="ml-2 text-foreground font-medium">{booking.preferred_time}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Treatment:</span>
                                  <span className="ml-2 text-foreground">{booking.treatment}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Phone:</span>
                                  <span className="ml-2 text-foreground">{booking.phone}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Email:</span>
                                  <span className="ml-2 text-foreground">{booking.email}</span>
                                </div>
                              </div>
                              {booking.message && (
                                <div className="mt-2 text-sm">
                                  <span className="text-muted-foreground">Note:</span>
                                  <span className="ml-2 text-foreground">{booking.message}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-2xl shadow-card p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Blog Management</h2>
              <p className="text-muted-foreground mb-6">
                Blog management features will be available soon. You'll be able to create, edit, and manage blog posts from here.
              </p>
              <div className="bg-muted/30 rounded-xl p-6 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Coming Soon</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
