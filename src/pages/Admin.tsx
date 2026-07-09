import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Calendar, Users, LogOut, UserPlus, Edit, Trash2, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  treatment: string;
  preferred_date: string;
  preferred_time: string;
  doctor_name?: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
}

interface Doctor {
  id: number;
  username: string;
  full_name: string;
  email: string;
  phone?: string;
  specialization?: string;
  qualifications?: string;
  experience_years?: number;
  profile_image?: string;
  bio?: string;
  is_available: boolean;
}

export default function AdminPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'admin' | 'doctor'>('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'bookings' | 'appointments' | 'doctors'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
  const [generatedCredentials, setGeneratedCredentials] = useState<{username: string; password: string} | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    username: '',
    full_name: '',
    email: '',
    phone: '',
    specialization: '',
    qualifications: '',
    experience_years: 0,
    profile_image: '',
    bio: '',
  });

  const API_URL = 'http://localhost/dental-care/api';

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth');
    const storedUserType = sessionStorage.getItem('userType');
    if (auth === 'true') {
      setIsAuthenticated(true);
      setUserType(storedUserType as 'admin' | 'doctor');
      
      if (storedUserType === 'doctor') {
        // Redirect to doctor dashboard immediately
        window.location.href = '/doctor-dashboard';
      } else {
        fetchBookings();
        fetchDoctors();
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, user_type: userType }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('adminAuth', 'true');
        sessionStorage.setItem('userType', data.user_type);
        
        if (data.user_type === 'doctor') {
          sessionStorage.setItem('doctorData', JSON.stringify(data.user));
          // Use window.location for clean redirect
          window.location.href = '/doctor-dashboard';
        } else {
          fetchBookings();
          fetchDoctors();
        }
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      if (username === 'admin' && password === 'admin123' && userType === 'admin') {
        setIsAuthenticated(true);
        sessionStorage.setItem('adminAuth', 'true');
        sessionStorage.setItem('userType', 'admin');
        fetchBookings();
        fetchDoctors();
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
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('doctorData');
    setUsername('');
    setPassword('');
    setBookings([]);
    setDoctors([]);
    // Force a clean state before redirecting
    setTimeout(() => {
      window.location.href = '/admin';
    }, 100);
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_URL}/bookings.php`);
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`${API_URL}/doctors.php`);
      const data = await response.json();
      setDoctors(data);
    } catch (err) {
      console.error('Failed to fetch doctors:', err);
    }
  };

  const handleAddDoctor = async () => {
    try {
      const response = await fetch(`${API_URL}/doctors.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDoctor),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store generated credentials to show to admin
        setGeneratedCredentials({
          username: data.username,
          password: data.password
        });
        
        fetchDoctors();
        
        // Reset form
        setNewDoctor({
          username: '',
          full_name: '',
          email: '',
          phone: '',
          specialization: '',
          qualifications: '',
          experience_years: 0,
          profile_image: '',
          bio: '',
        });
      } else {
        alert(data.error || 'Failed to add doctor');
      }
    } catch (err) {
      alert('Failed to add doctor');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size too large. Maximum 5MB allowed.');
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type. Only JPG, PNG, GIF, and WebP are allowed.');
      return;
    }

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${API_URL}/upload-image.php`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setNewDoctor({...newDoctor, profile_image: data.image_url});
      } else {
        alert(data.error || 'Failed to upload image');
      }
    } catch (err) {
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const closeAddDoctorDialog = () => {
    setIsAddDoctorOpen(false);
    setGeneratedCredentials(null);
  };

  const handleDeleteDoctor = async (id: number) => {
    if (!confirm('Are you sure you want to delete this doctor? This will also delete all their appointments.')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/doctors.php?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok && data.success) {
        fetchDoctors();
        fetchBookings();
      } else {
        alert(data.error || 'Failed to delete doctor');
      }
    } catch (err) {
      alert('Failed to delete doctor');
    }
  };

  const toggleDoctorAvailability = async (doctorId: number, currentStatus: boolean) => {
    try {
      await fetch(`${API_URL}/doctors.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: doctorId, is_available: currentStatus ? 0 : 1 }),
      });
      fetchDoctors();
    } catch (err) {
      alert('Failed to update doctor availability');
    }
  };

  const updateBookingStatus = async (id: number, status: 'pending' | 'confirmed' | 'cancelled' | 'completed') => {
    try {
      await fetch(`${API_URL}/update-booking.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      
      setBookings(bookings.map(booking => 
        booking.id === id ? { ...booking, status } : booking
      ));
    } catch (err) {
      setBookings(bookings.map(booking => 
        booking.id === id ? { ...booking, status } : booking
      ));
    }
  };

  const getAppointmentsByDate = () => {
    const grouped: { [key: string]: Booking[] } = {};
    const confirmedBookings = bookings.filter(booking => booking.status === 'confirmed');
    const filteredBookings = selectedDate 
      ? confirmedBookings.filter(booking => booking.preferred_date === selectedDate)
      : confirmedBookings;
    
    filteredBookings.forEach((booking) => {
      if (!grouped[booking.preferred_date]) {
        grouped[booking.preferred_date] = [];
      }
      grouped[booking.preferred_date].push(booking);
    });
    
    return grouped;
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <section className="section-padding min-h-[70vh] flex items-center">
          <div className="container-custom">
            <div className="max-w-md mx-auto">
              <div className="bg-card rounded-3xl shadow-card p-8">
                <h1 className="text-3xl font-serif font-semibold text-foreground mb-6 text-center">
                  Login
                </h1>
                
                {/* User Type Selector */}
                <div className="flex gap-2 mb-6">
                  <button
                    type="button"
                    onClick={() => setUserType('admin')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                      userType === 'admin' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('doctor')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                      userType === 'doctor' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    Doctor
                  </button>
                </div>

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
                
                <div className="mt-6 text-sm text-muted-foreground text-center">
                  <p>Admin: admin / admin123</p>
                  <p>Doctor: dr.smith / doctor123</p>
                </div>
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
        <div className="container mx-auto px-4 max-w-[1600px]">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-serif font-semibold text-foreground">
              Admin Dashboard
            </h1>
            <Button onClick={handleLogout} variant="outline" className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8 max-w-5xl">
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
              <p className="text-sm text-muted-foreground mt-1">{bookings.length} total</p>
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
              onClick={() => setActiveTab('doctors')}
              className={`p-6 rounded-2xl border-2 transition-all ${
                activeTab === 'doctors'
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <Stethoscope className={`w-8 h-8 mx-auto mb-3 ${activeTab === 'doctors' ? 'text-primary' : 'text-muted-foreground'}`} />
              <h3 className="font-semibold text-lg text-foreground">Doctors</h3>
              <p className="text-sm text-muted-foreground mt-1">{doctors.length} doctors</p>
            </button>
          </div>

          {activeTab === 'bookings' && (
            <div className="bg-card rounded-2xl shadow-card overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">All Bookings</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1200px]">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-3 py-4 text-left text-sm font-semibold text-foreground">ID</th>
                      <th className="px-3 py-4 text-left text-sm font-semibold text-foreground">Patient</th>
                      <th className="px-3 py-4 text-left text-sm font-semibold text-foreground">Doctor</th>
                      <th className="px-3 py-4 text-left text-sm font-semibold text-foreground">Treatment</th>
                      <th className="px-3 py-4 text-left text-sm font-semibold text-foreground">Date & Time</th>
                      <th className="px-3 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                      <th className="px-3 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-muted/30">
                        <td className="px-3 py-4 text-sm">#{booking.id}</td>
                        <td className="px-3 py-4">
                          <div className="text-sm font-medium">{booking.name}</div>
                          <div className="text-xs text-muted-foreground">{booking.email}</div>
                        </td>
                        <td className="px-3 py-4 text-sm">{booking.doctor_name || 'N/A'}</td>
                        <td className="px-3 py-4 text-sm">{booking.treatment}</td>
                        <td className="px-3 py-4">
                          <div className="text-sm">{new Date(booking.preferred_date).toLocaleDateString()}</div>
                          <div className="text-xs text-muted-foreground">{booking.preferred_time}</div>
                        </td>
                        <td className="px-3 py-4">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                            booking.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-3 py-4">
                          <div className="flex gap-2">
                            {booking.status !== 'confirmed' && (
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
                              >
                                Confirm
                              </button>
                            )}
                            {booking.status !== 'cancelled' && (
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="bg-card rounded-2xl shadow-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Appointments by Date</h2>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {Object.keys(getAppointmentsByDate()).length === 0 ? (
                <p className="text-center text-muted-foreground py-12">No appointments found</p>
              ) : (
                Object.entries(getAppointmentsByDate()).map(([date, dateBookings]) => (
                  <div key={date} className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">
                      {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </h3>
                    <div className="space-y-3">
                      {dateBookings.map((booking) => (
                        <div key={booking.id} className="p-4 border border-border rounded-xl">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-semibold">{booking.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {booking.preferred_time} - {booking.treatment}
                              </p>
                              <p className="text-sm text-muted-foreground">Doctor: {booking.doctor_name}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'doctors' && (
            <div className="bg-card rounded-2xl shadow-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Manage Doctors</h2>
                <Dialog open={isAddDoctorOpen} onOpenChange={setIsAddDoctorOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <UserPlus className="w-4 h-4" />
                      Add Doctor
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Doctor</DialogTitle>
                    </DialogHeader>
                    
                    {generatedCredentials ? (
                      <div className="py-6">
                        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
                          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold text-green-900 mb-4">Doctor Added Successfully!</h3>
                          <div className="bg-white rounded-lg p-4 mb-4">
                            <p className="text-sm text-gray-600 mb-3">Please share these login credentials with the doctor:</p>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded">
                                <span className="font-medium text-gray-700">Username:</span>
                                <span className="font-mono text-lg font-bold text-gray-900">{generatedCredentials.username}</span>
                              </div>
                              <div className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded">
                                <span className="font-medium text-gray-700">Password:</span>
                                <span className="font-mono text-lg font-bold text-primary">{generatedCredentials.password}</span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-3">⚠️ The doctor can change this password after first login</p>
                          </div>
                          <Button onClick={closeAddDoctorDialog} className="w-full">Close</Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Username *</Label>
                              <Input
                                value={newDoctor.username}
                                onChange={(e) => setNewDoctor({...newDoctor, username: e.target.value})}
                                placeholder="dr.smith"
                              />
                            </div>
                            <div>
                              <Label>Full Name *</Label>
                              <Input
                                value={newDoctor.full_name}
                                onChange={(e) => setNewDoctor({...newDoctor, full_name: e.target.value})}
                                placeholder="Dr. John Smith"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Email *</Label>
                              <Input
                                type="email"
                                value={newDoctor.email}
                                onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})}
                                placeholder="doctor@example.com"
                              />
                            </div>
                            <div>
                              <Label>Phone</Label>
                              <Input
                                value={newDoctor.phone}
                                onChange={(e) => setNewDoctor({...newDoctor, phone: e.target.value})}
                                placeholder="+44 20 1234 5678"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Specialization</Label>
                              <Input
                                value={newDoctor.specialization}
                                onChange={(e) => setNewDoctor({...newDoctor, specialization: e.target.value})}
                                placeholder="General Dentistry"
                              />
                            </div>
                            <div>
                              <Label>Experience (years)</Label>
                              <Input
                                type="number"
                                value={newDoctor.experience_years}
                                onChange={(e) => setNewDoctor({...newDoctor, experience_years: parseInt(e.target.value) || 0})}
                                placeholder="10"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label>Qualifications</Label>
                            <Input
                              value={newDoctor.qualifications}
                              onChange={(e) => setNewDoctor({...newDoctor, qualifications: e.target.value})}
                              placeholder="BDS, MFDS RCS"
                            />
                          </div>
                          
                          <div>
                            <Label>Profile Image</Label>
                            <div className="mt-2">
                              <input
                                type="file"
                                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                onChange={handleImageUpload}
                                className="block w-full text-sm text-gray-500
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded-lg file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-primary file:text-primary-foreground
                                  hover:file:bg-primary/90 cursor-pointer"
                                disabled={uploadingImage}
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                Max 5MB. Supported: JPG, PNG, GIF, WebP
                              </p>
                              {uploadingImage && (
                                <p className="text-sm text-primary mt-2">Uploading...</p>
                              )}
                              {newDoctor.profile_image && (
                                <div className="mt-3">
                                  <img 
                                    src={newDoctor.profile_image} 
                                    alt="Preview" 
                                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <Label>Bio</Label>
                            <Textarea
                              value={newDoctor.bio}
                              onChange={(e) => setNewDoctor({...newDoctor, bio: e.target.value})}
                              placeholder="Brief description about the doctor..."
                              rows={3}
                            />
                          </div>
                        </div>
                        <Button onClick={handleAddDoctor} className="w-full">Add Doctor</Button>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                {doctors.map((doctor) => (
                  <div key={doctor.id} className="flex items-center gap-4 p-4 border border-border rounded-xl">
                    {doctor.profile_image && (
                      <img 
                        src={doctor.profile_image} 
                        alt={doctor.full_name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{doctor.full_name}</h3>
                      <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                      <p className="text-xs text-muted-foreground">
                        {doctor.email} | {doctor.experience_years} years exp.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={doctor.is_available ? 'default' : 'outline'}
                        onClick={() => toggleDoctorAvailability(doctor.id, doctor.is_available)}
                      >
                        {doctor.is_available ? 'Available' : 'Unavailable'}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteDoctor(doctor.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
