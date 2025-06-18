
# EthioWork - Ethiopian Job Platform

## Project Overview

EthioWork is a comprehensive job platform designed specifically for the Ethiopian market, connecting job seekers with employers across various industries.

## Features

- **User Authentication**: Secure registration and login system
- **Role-based Access**: Job Seekers, Employers, and Administrators
- **Job Management**: Post, browse, and apply for jobs
- **Profile Management**: Complete user and company profiles
- **Application Tracking**: Track job applications and their status

## Technologies Used

This project is built with:

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn UI components
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **State Management**: React Query

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd ethiowork
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a Firebase project
   - Enable Authentication and Firestore
   - Update the Firebase configuration in `src/lib/firebase.ts`

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Application pages
├── hooks/         # Custom React hooks
├── contexts/      # React contexts
├── types/         # TypeScript type definitions
├── lib/           # Utility libraries and configurations
└── assets/        # Static assets
```

## User Roles

### Job Seekers
- Browse and search job listings
- Create and manage profiles
- Apply for jobs
- Track application status

### Employers
- Post and manage job listings
- View and manage job applications
- Company profile management

### Administrators
- User and content moderation
- System analytics and management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is proprietary and confidential.

## Contact

For questions or support, please contact the development team.
