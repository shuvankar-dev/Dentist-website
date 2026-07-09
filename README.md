# 🦷 Dental Care Multi-Doctor Booking System

A complete, professional dental clinic management system with multi-doctor support, appointment booking, and comprehensive dashboards.

![Version](https://img.shields.io/badge/version-2.1-blue)
![PHP](https://img.shields.io/badge/PHP-8.0%2B-purple)
![React](https://img.shields.io/badge/React-18-cyan)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)

## ✨ Features

### 👨‍💼 Admin Dashboard
- **Doctor Management**
  - Add/Remove doctors with auto-generated passwords
  - Upload doctor profile images (max 5MB)
  - Toggle doctor availability
  - View doctor statistics
  
- **Appointment Management**
  - View all bookings across all doctors
  - Filter by status (pending, confirmed, cancelled, completed)
  - Filter by date
  - Bulk status updates

- **Calendar View**
  - Daily schedule overview
  - Organized by date and time
  - Doctor-wise appointment distribution

### 👨‍⚕️ Doctor Dashboard
- **Appointment Management**
  - View personal appointments
  - Confirm/Cancel/Complete bookings
  - Filter by date
  - Patient contact details

- **Schedule Management** ⭐ NEW
  - Add custom time slots
  - Delete unwanted slots
  - Toggle availability on/off
  - Multiple slots per day support
  - Full independence from admin

- **Profile Management**
  - Change password securely
  - View personal statistics
  - Today's appointments summary

### 🏥 Patient Booking
- **Doctor Selection**
  - Browse all available doctors
  - View doctor profiles and specializations
  - See doctor photos

- **Appointment Booking**
  - Select preferred doctor
  - Choose date and time
  - Add treatment type
  - Include special notes
  - Instant booking confirmation

## 🚀 Quick Start

### Prerequisites
- XAMPP (Apache + MySQL)
- Node.js 16+
- Modern web browser

### Installation (5 minutes)

```bash
# 1. Start XAMPP
Start Apache and MySQL

# 2. Setup Database
Go to http://localhost/phpmyadmin
Run: DATABASE_SETUP.sql
Run: SAMPLE_DATA.sql (optional, for demo data)

# 3. Create Upload Folders
Visit: http://localhost/dental-care/api/setup-folders.php

# 4. Install Dependencies
npm install

# 5. Start Development Server
npm run dev

# 6. Open Browser
http://localhost:5173
```

**Done!** 🎉

## 🔐 Default Credentials

### Admin
- URL: `http://localhost:5173/admin`
- Username: `admin`
- Password: `admin123`

### Sample Doctors
- Username: `dr.smith` / Password: `doctor123`
- Username: `dr.johnson` / Password: `doctor123`
- Username: `dr.patel` / Password: `doctor123`
- Username: `dr.chen` / Password: `doctor123`
- Username: `dr.williams` / Password: `doctor123`

## 📊 Sample Data

When you run `SAMPLE_DATA.sql`, you get:
- **35 realistic appointments**
- **5 doctors** with complete profiles
- **Appointments** spread across the week
- **Multiple statuses** (pending, confirmed, completed, cancelled)
- **Various treatments** and specializations

Perfect for demos, testing, and screenshots!

## 🎯 User Workflows

### Adding a New Doctor (Admin)
```
1. Login → Doctors Tab
2. Click "Add Doctor"
3. Fill form (username, name, email, etc.)
4. Upload profile photo
5. Submit
6. Copy generated password (shown once!)
7. Share credentials with doctor
```

### Doctor First Login
```
1. Login with provided credentials
2. Click "Change Password"
3. Set new secure password
4. Go to "My Schedule"
5. Add working hours/slots
6. Ready to receive appointments!
```

### Patient Booking
```
1. Visit booking page
2. Select doctor
3. Fill personal details
4. Choose treatment
5. Pick date & time
6. Submit
7. Wait for confirmation
```

## 📁 Project Structure

```
dental-care/
├── api/                          # PHP Backend
│   ├── config.php               # Database config
│   ├── doctors.php              # Doctor CRUD
│   ├── doctor-availability.php  # Schedule management
│   ├── bookings.php             # Appointments
│   ├── login.php                # Authentication
│   ├── change-password.php      # Password update
│   └── upload-image.php         # Image upload
│
├── src/                         # React Frontend
│   ├── pages/
│   │   ├── Admin.tsx           # Admin dashboard
│   │   ├── DoctorDashboard.tsx # Doctor dashboard
│   │   ├── Booking.tsx         # Booking page
│   │   └── ...
│   └── components/             # Reusable components
│
├── uploads/
│   └── doctors/                # Profile images
│
├── DATABASE_SETUP.sql          # Main database script
├── SAMPLE_DATA.sql             # Demo data
├── QUICK_START.md              # 5-min setup guide
├── SETUP_INSTRUCTIONS.md       # Full documentation
└── README.md                   # This file
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **shadcn/ui** - UI components
- **React Router** - Navigation
- **Zod** - Form validation

### Backend
- **PHP 8+** - Server-side logic
- **MySQL 8** - Database
- **REST API** - Communication

### Tools
- **Vite** - Build tool
- **XAMPP** - Local server
- **phpMyAdmin** - Database management

## 📚 Documentation

| File | Description |
|------|-------------|
| `QUICK_START.md` | 5-minute setup guide |
| `SETUP_INSTRUCTIONS.md` | Complete installation guide |
| `ADMIN_QUICK_GUIDE.md` | Admin user manual |
| `DOCTOR_SCHEDULE_GUIDE.md` | Doctor schedule management |
| `SAMPLE_DATA_INFO.md` | Sample data details |

## 🎨 Key Features Highlight

### ⭐ Auto-Generated Passwords
When admin adds a doctor, system generates secure 8-character passwords automatically. No manual password creation needed!

### 📸 Image Upload
Direct file upload for doctor profiles. Supports JPG, PNG, GIF, WebP up to 5MB. Preview before saving.

### 📅 Self-Service Scheduling
Doctors have full control over their schedules. Add, delete, or toggle availability without admin intervention.

### 🔐 Secure Password Change
Doctors can change their password after first login. Validates current password and ensures security.

### 📊 Real-Time Updates
All changes reflect immediately. No refresh needed. Appointments, schedules, and status updates are instant.

## 🚧 Customization

### Adding New Treatment Types
Edit `src/pages/Booking.tsx`:
```typescript
const treatments = [
  'General Check-up',
  'Your New Treatment',
  // ...
];
```

### Changing Time Slots
Edit time slot options in `src/pages/Booking.tsx`:
```typescript
const timeSlots = [
  { label: '09:00 AM - 11:00 AM', value: '09:00 AM - 11:00 AM' },
  // Add more...
];
```

### Adding Doctor Specializations
Doctors can have any specialization when added via admin panel.

## ⚠️ Security Notes

**For Production:**
1. Change default admin password
2. Use hashed passwords (implement `password_hash()`)
3. Enable HTTPS
4. Restrict database access
5. Add CSRF protection
6. Implement rate limiting
7. Add session timeout

**Current Setup:**
- Plain text passwords (demo only)
- Basic authentication
- Suitable for local development/testing

## 🧪 Testing

### Test Admin Features
```bash
# Login as admin
# Add a new doctor → Check credentials displayed
# Upload a doctor photo → Verify upload
# Delete a doctor → Check cascade delete
# Confirm an appointment → Check status update
```

### Test Doctor Features
```bash
# Login as doctor
# Change password → Verify new password works
# Add schedule slot → Check it appears
# Toggle availability → Check booking page
# Delete slot → Confirm removal
# Update appointment → Check status change
```

### Test Booking
```bash
# Select doctor → Check available doctors
# Fill form → Check validation
# Submit booking → Check confirmation
# Admin check → Verify booking appears
```

## 📈 Statistics

- **Total Files**: 50+
- **API Endpoints**: 8
- **Database Tables**: 4
- **React Pages**: 10+
- **UI Components**: 40+
- **Default Doctors**: 5
- **Sample Appointments**: 35

## 🤝 Contributing

This is a complete project for dental clinic management. Feel free to:
- Report bugs
- Suggest features
- Improve documentation
- Add new functionalities

## 📄 License

MIT License - Feel free to use for your projects!

## 🎓 Learning Resources

- React: https://react.dev
- PHP: https://php.net
- MySQL: https://mysql.com
- TailwindCSS: https://tailwindcss.com
- shadcn/ui: https://ui.shadcn.com

## 🆘 Support

Having issues? Check:
1. `QUICK_START.md` - Quick setup
2. `SETUP_INSTRUCTIONS.md` - Detailed guide
3. Browser Console (F12) - Error messages
4. MySQL Logs - Database errors
5. PHP Errors - Server issues

## 🎉 Features Coming Soon

- [ ] Email notifications
- [ ] SMS reminders
- [ ] Online payment integration
- [ ] Patient portal
- [ ] Medical records
- [ ] Prescription management
- [ ] Analytics dashboard
- [ ] Multi-language support

## 📞 Contact

For questions or support:
- Check documentation files
- Review code comments
- Test with sample data
- Verify setup steps

---

**Made with ❤️ for Dental Clinics**

**Version 2.1** - January 2026

---

## 🌟 Quick Links

- [5-Minute Setup](QUICK_START.md)
- [Full Documentation](SETUP_INSTRUCTIONS.md)
- [Admin Guide](ADMIN_QUICK_GUIDE.md)
- [Doctor Guide](DOCTOR_SCHEDULE_GUIDE.md)
- [Sample Data Info](SAMPLE_DATA_INFO.md)

**Start building your dental clinic management system today!** 🦷✨
