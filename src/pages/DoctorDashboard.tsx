import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Calendar, Clock, Users, LogOut, ToggleLeft, ToggleRight, Lock, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  treatment: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
}

interface AvailabilitySlot {
  id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
  is_active: boolean;
}

interface Doctor {
  id: number;
  full_name: string;
  email: string;
  specialization: string;
  profile_image?: string;
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function DoctorDashboard() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [activeTab, setActiveTab] = useState<'appointments' | 'schedule'>('appointments');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [newSchedule, setNewSchedule] = useState({
    day_of_week: '',
    start_time: '',
    end_time: '',
  });
  const [scheduleError, setScheduleError] = useState('');

  const API_URL = 'http://localhost/dental-care/api';

  useEffect(() => {
    const doctorData = sessionStorage.getItem('doctorData');
    if (doctorData) {
      const parsedDoctor = JSON.parse(doctorData);
      setDoctor(parsedDoctor);
      fetchBookings(parsedDoctor.id);
      fetchAvailability(parsedDoctor.id);
    } else {
      // No doctor data, redirect immediately
      window.location.href = '/admin';
    }
  }, []);

  const fetchBookings = async (doctorId: number) => {
    try {
      const response = await fetch(`${API_URL}/bookings.php?doctor_id=${doctorId}`);
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailability = async (doctorId: number) => {
    try {
      const response = await fetch(`${API_URL}/doctor-availability.php?doctor_id=${doctorId}`);
      const data = await response.json();
      setAvailability(data);
    } catch (err) {
      console.error('Failed to fetch availability:', err);
    }
  };

  const toggleAvailability = async (slotId: number, currentStatus: boolean) => {
    try {
      await fetch(`${API_URL}/doctor-availability.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: slotId, is_active: currentStatus ? 0 : 1 }),
      });
      
      if (doctor) {
        fetchAvailability(doctor.id);
      }
    } catch (err) {
      console.error('Failed to update availability:', err);
    }
  };

  const handleAddSchedule = async () => {
    setScheduleError('');

    if (!newSchedule.day_of_week || !newSchedule.start_time || !newSchedule.end_time) {
      setScheduleError('All fields are required');
      return;
    }

    // Validate time
    if (newSchedule.start_time >= newSchedule.end_time) {
      setScheduleError('End time must be after start time');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/doctor-availability.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctor_id: doctor?.id,
          day_of_week: newSchedule.day_of_week,
          start_time: newSchedule.start_time,
          end_time: newSchedule.end_time,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAddScheduleOpen(false);
        setNewSchedule({
          day_of_week: '',
          start_time: '',
          end_time: '',
        });
        if (doctor) {
          fetchAvailability(doctor.id);
        }
      } else {
        setScheduleError(data.error || 'Failed to add schedule');
      }
    } catch (err) {
      setScheduleError('Failed to add schedule. Please try again.');
    }
  };

  const handleDeleteSchedule = async (slotId: number) => {
    if (!confirm('Are you sure you want to delete this time slot?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/doctor-availability.php?id=${slotId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (doctor) {
          fetchAvailability(doctor.id);
        }
      } else {
        alert(data.error || 'Failed to delete schedule');
      }
    } catch (err) {
      alert('Failed to delete schedule');
    }
  };

  const updateBookingStatus = async (bookingId: number, status: 'pending' | 'confirmed' | 'cancelled' | 'completed') => {
    try {
      await fetch(`${API_URL}/update-booking.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: bookingId, status }),
      });
      
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status } : booking
      ));
    } catch (err) {
      console.error('Failed to update booking:', err);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('doctorData');
    sessionStorage.removeItem('adminAuth');
    sessionStorage.removeItem('userType');
    // Force clean redirect
    window.location.href = '/admin';
  };

  const handleChangePassword = async () => {
    setPasswordError('');

    if (!passwordData.current_password || !passwordData.new_password || !passwordData.confirm_password) {
      setPasswordError('All fields are required');
      return;
    }

    if (passwordData.new_password.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }

    if (passwordData.new_password !== passwordData.confirm_password) {
      setPasswordError('New passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/change-password.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctor_id: doctor?.id,
          current_password: passwordData.current_password,
          new_password: passwordData.new_password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('Password changed successfully!');
        setIsChangePasswordOpen(false);
        setPasswordData({
          current_password: '',
          new_password: '',
          confirm_password: '',
        });
      } else {
        setPasswordError(data.error || 'Failed to change password');
      }
    } catch (err) {
      setPasswordError('Failed to change password. Please try again.');
    }
  };

  const getUpcomingAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return bookings.filter(b => 
      b.status === 'confirmed' && b.preferred_date >= today
    ).sort((a, b) => a.preferred_date.localeCompare(b.preferred_date));
  };

  const getTodayAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return bookings.filter(b => 
      b.preferred_date === today && (b.status === 'confirmed' || b.status === 'pending')
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (!doctor) return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <section className="section-padding bg-secondary/30 min-h-screen">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={doctor.profile_image} />
                <AvatarFallback>{doctor.full_name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-serif font-semibold text-foreground">
                  Welcome, {doctor.full_name}
                </h1>
                <p className="text-muted-foreground">{doctor.specialization}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Lock className="w-4 h-4" />
                    Change Password
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    {passwordError && (
                      <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm">
                        {passwordError}
                      </div>
                    )}
                    <div>
                      <Label>Current Password</Label>
                      <Input
                        type="password"
                        value={passwordData.current_password}
                        onChange={(e) => setPasswordData({...passwordData, current_password: e.target.value})}
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <Label>New Password</Label>
                      <Input
                        type="password"
                        value={passwordData.new_password}
                        onChange={(e) => setPasswordData({...passwordData, new_password: e.target.value})}
                        placeholder="Enter new password (min 6 characters)"
                      />
                    </div>
                    <div>
                      <Label>Confirm New Password</Label>
                      <Input
                        type="password"
                        value={passwordData.confirm_password}
                        onChange={(e) => setPasswordData({...passwordData, confirm_password: e.target.value})}
                        placeholder="Re-enter new password"
                      />
                    </div>
                    <Button onClick={handleChangePassword} className="w-full">
                      Change Password
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button onClick={handleLogout} variant="outline" className="gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getTodayAppointments().length}</div>
                <p className="text-xs text-muted-foreground">
                  {getTodayAppointments().filter(b => b.status === 'confirmed').length} confirmed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getUpcomingAppointments().length}</div>
                <p className="text-xs text-muted-foreground">Next 30 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{bookings.length}</div>
                <p className="text-xs text-muted-foreground">
                  {bookings.filter(b => b.status === 'pending').length} pending
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-6">
            <Button
              onClick={() => setActiveTab('appointments')}
              variant={activeTab === 'appointments' ? 'default' : 'outline'}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Appointments
            </Button>
            <Button
              onClick={() => setActiveTab('schedule')}
              variant={activeTab === 'schedule' ? 'default' : 'outline'}
            >
              <Clock className="w-4 h-4 mr-2" />
              My Schedule
            </Button>
          </div>

          {/* Content */}
          {activeTab === 'appointments' ? (
            <div className="bg-card rounded-2xl shadow-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">My Appointments</h2>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {loading ? (
                <p className="text-center text-muted-foreground py-12">Loading...</p>
              ) : bookings.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">No appointments found</p>
              ) : (
                <div className="space-y-4">
                  {bookings
                    .filter(b => !selectedDate || b.preferred_date === selectedDate)
                    .map((booking) => (
                      <div key={booking.id} className="border border-border rounded-xl p-4 hover:bg-muted/30 transition-colors">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">{booking.name}</h3>
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status}
                              </Badge>
                            </div>
                            <div className="grid md:grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">Date:</span>
                                <span className="ml-2 font-medium">
                                  {new Date(booking.preferred_date).toLocaleDateString()}
                                </span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Time:</span>
                                <span className="ml-2 font-medium">{booking.preferred_time}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Treatment:</span>
                                <span className="ml-2">{booking.treatment}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Phone:</span>
                                <span className="ml-2">{booking.phone}</span>
                              </div>
                              <div className="md:col-span-2">
                                <span className="text-muted-foreground">Email:</span>
                                <span className="ml-2">{booking.email}</span>
                              </div>
                              {booking.message && (
                                <div className="md:col-span-2">
                                  <span className="text-muted-foreground">Note:</span>
                                  <span className="ml-2">{booking.message}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex md:flex-col gap-2">
                            {booking.status === 'pending' && (
                              <Button
                                size="sm"
                                onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Confirm
                              </Button>
                            )}
                            {booking.status === 'confirmed' && (
                              <Button
                                size="sm"
                                onClick={() => updateBookingStatus(booking.id, 'completed')}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                Complete
                              </Button>
                            )}
                            {(booking.status === 'pending' || booking.status === 'confirmed') && (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                              >
                                Cancel
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-card rounded-2xl shadow-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Weekly Schedule</h2>
                <Dialog open={isAddScheduleOpen} onOpenChange={setIsAddScheduleOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add Time Slot
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Time Slot</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      {scheduleError && (
                        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm">
                          {scheduleError}
                        </div>
                      )}
                      <div>
                        <Label>Day of Week</Label>
                        <Select 
                          value={newSchedule.day_of_week} 
                          onValueChange={(value) => setNewSchedule({...newSchedule, day_of_week: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select day" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Monday">Monday</SelectItem>
                            <SelectItem value="Tuesday">Tuesday</SelectItem>
                            <SelectItem value="Wednesday">Wednesday</SelectItem>
                            <SelectItem value="Thursday">Thursday</SelectItem>
                            <SelectItem value="Friday">Friday</SelectItem>
                            <SelectItem value="Saturday">Saturday</SelectItem>
                            <SelectItem value="Sunday">Sunday</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Start Time</Label>
                          <Input
                            type="time"
                            value={newSchedule.start_time}
                            onChange={(e) => setNewSchedule({...newSchedule, start_time: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label>End Time</Label>
                          <Input
                            type="time"
                            value={newSchedule.end_time}
                            onChange={(e) => setNewSchedule({...newSchedule, end_time: e.target.value})}
                          />
                        </div>
                      </div>
                      <Button onClick={handleAddSchedule} className="w-full">
                        Add Time Slot
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              {availability.length === 0 ? (
                <div className="text-center py-12 bg-muted/30 rounded-xl">
                  <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">No schedule set yet</p>
                  <Button onClick={() => setIsAddScheduleOpen(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Your First Time Slot
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {availability.map((slot) => (
                    <div key={slot.id} className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-muted/30 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{slot.day_of_week}</h3>
                        <p className="text-sm text-muted-foreground">
                          {slot.start_time.substring(0, 5)} - {slot.end_time.substring(0, 5)}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          onClick={() => toggleAvailability(slot.id, slot.is_active)}
                          variant={slot.is_active ? 'default' : 'outline'}
                          size="sm"
                          className="gap-2"
                        >
                          {slot.is_active ? (
                            <>
                              <ToggleRight className="w-5 h-5" />
                              Available
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="w-5 h-5" />
                              Unavailable
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={() => handleDeleteSchedule(slot.id)}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
