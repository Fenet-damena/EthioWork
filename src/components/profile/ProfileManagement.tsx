
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import FileUpload from './FileUpload';

interface ProfileManagementProps {
  initialProfile?: any;
  onSave: (profileData: any, profileImage?: File, resume?: File) => void;
  saving: boolean;
}

const ProfileManagement: React.FC<ProfileManagementProps> = ({
  initialProfile,
  onSave,
  saving
}) => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    location: '',
    phoneNumber: '',
    skills: [] as string[],
    experience: '',
    education: '',
    profileImageUrl: '',
    resumeUrl: '',
    resumeName: ''
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    if (initialProfile) {
      setProfileData({
        firstName: initialProfile.firstName || '',
        lastName: initialProfile.lastName || '',
        bio: initialProfile.bio || '',
        location: initialProfile.location || '',
        phoneNumber: initialProfile.phoneNumber || '',
        skills: initialProfile.skills || [],
        experience: initialProfile.experience || '',
        education: initialProfile.education || '',
        profileImageUrl: initialProfile.profileImageUrl || '',
        resumeUrl: initialProfile.resumeUrl || '',
        resumeName: initialProfile.resumeName || ''
      });
    }
  }, [initialProfile]);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(profileData, profileImage || undefined, resume || undefined);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  First Name *
                </label>
                <Input
                  value={profileData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Last Name *
                </label>
                <Input
                  value={profileData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <Input
                value={profileData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="+251 9XX XXX XXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Location
              </label>
              <Input
                value={profileData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="City, Country"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Professional Bio
              </label>
              <Textarea
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                placeholder="Tell us about yourself, your experience, and what you're looking for..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Profile Image */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Profile Image</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUpload
              onFileSelect={setProfileImage}
              accept="image/*"
              label="Upload Profile Image"
              currentFile={profileImage ? profileImage.name : (profileData.profileImageUrl ? 'Current profile image' : '')}
              onRemove={() => {
                setProfileImage(null);
                setProfileData(prev => ({ ...prev, profileImageUrl: '' }));
              }}
            />
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Professional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Years of Experience
              </label>
              <Input
                value={profileData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="e.g., 3 years"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Education
              </label>
              <Textarea
                value={profileData.education}
                onChange={(e) => handleInputChange('education', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Your educational background..."
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Skills
              </label>
              <div className="flex gap-2 mb-3">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white flex-1"
                  placeholder="Add a skill"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <Button
                  type="button"
                  onClick={addSkill}
                  variant="outline"
                  className="border-gray-700"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-emerald-500/20 text-emerald-400 border-emerald-500/20"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-2 hover:text-red-400"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resume */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Resume</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUpload
              onFileSelect={setResume}
              accept=".pdf,.doc,.docx"
              label="Upload Resume"
              currentFile={resume ? resume.name : (profileData.resumeUrl ? profileData.resumeName || 'Current resume' : '')}
              onRemove={() => {
                setResume(null);
                setProfileData(prev => ({ ...prev, resumeUrl: '', resumeName: '' }));
              }}
            />
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={saving}
            className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-8 py-3 hover:from-emerald-600 hover:to-blue-600"
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileManagement;
