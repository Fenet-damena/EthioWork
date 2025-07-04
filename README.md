
# EthioWork - Job Board Platform

A modern job board platform built with React, TypeScript, and Firebase, featuring Supabase storage for file uploads. This platform connects job seekers with employers in an intuitive and professional interface.

## Features

### For Job Seekers
- **User Authentication**: Secure login and registration system
- **Profile Management**: Complete profile creation with photo and resume upload
- **Job Search**: Browse and search for job opportunities
- **Job Applications**: Apply to jobs with cover letters
- **Saved Jobs**: Bookmark jobs for later viewing
- **Real-time Notifications**: Get notified about new jobs and application status updates
- **Application Tracking**: Monitor application status (pending, shortlisted, accepted, rejected)

### For Employers
- **Job Posting**: Create detailed job listings
- **Application Management**: Review and manage job applications
- **Candidate Profiles**: View complete applicant profiles including resumes
- **Application Status Control**: Shortlist, accept, or reject applications
- **Candidate Communication**: Direct contact with applicants
- **Dashboard Analytics**: Track job posting performance

### For Administrators
- **User Management**: Manage all users on the platform
- **Content Moderation**: Monitor and moderate job postings
- **Platform Analytics**: View platform usage statistics

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: Shadcn/ui component library
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **File Storage**: Supabase Storage
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Web-ready build system

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Firebase project setup
- Supabase project setup

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Fenet-damena/EthioWork.git
cd EthioWork
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase configuration:
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication and Firestore
   - Update the Firebase configuration in `src/lib/firebase.ts`

4. Set up Supabase storage:
   - Create a Supabase project at https://supabase.com
   - Update the Supabase configuration in `src/integrations/supabase/client.ts`

5. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Dashboard components
│   ├── notifications/  # Notification system
│   ├── profile/        # Profile management
│   └── ui/            # Base UI components
├── contexts/           # React context providers
├── hooks/             # Custom React hooks
├── integrations/      # Third-party integrations
├── lib/              # Utility libraries
├── pages/            # Main application pages
├── services/         # API and business logic
└── types/            # TypeScript type definitions
```

## Key Features Implementation

### File Uploads
- **Profile Images**: Stored in Supabase `profiles` bucket
- **Resumes**: Stored in Supabase `resumes` bucket
- **File Validation**: 10MB size limit with type checking
- **Drag & Drop**: Intuitive file upload interface

### Notification System
- **Job Alerts**: Automatic notifications for new job postings
- **Application Updates**: Status change notifications
- **Real-time Updates**: Instant notification delivery

### User Role Management
- **Job Seekers**: Can browse jobs, apply, and manage profiles
- **Employers**: Can post jobs, review applications, restricted from applying
- **Admins**: Full platform management capabilities

### Security Features
- **Role-based Access Control**: Different permissions for different user types
- **File Security**: Secure file upload and access policies
- **Data Validation**: Input validation and sanitization

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Setup

The application requires proper configuration of:

1. **Firebase Services**:
   - Authentication
   - Firestore Database
   - Storage (if used)

2. **Supabase Services**:
   - Storage buckets for file uploads
   - Proper RLS policies

## Deployment

The application is ready for deployment on platforms like:
- Vercel
- Netlify
- Firebase Hosting
- Any static hosting service

Build the project with `npm run build` and deploy the `dist` folder.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact the development team or create an issue in the repository.
