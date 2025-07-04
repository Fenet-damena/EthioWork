
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile } from '@/hooks/useAuth';
import { updateUserProfile } from '@/services/dataService';
import { uploadFile } from '@/services/firebase';
import { useToast } from '@/hooks/use-toast';
import ProfileManagement from '@/components/profile/ProfileManagement';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser } = useAuth();
  const { profile, loading } = useUserProfile(currentUser?.uid || null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const handleSaveProfile = async (profileData: any, profileImage?: File, resume?: File) => {
    if (!currentUser) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to update your profile.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      console.log('Saving profile data:', profileData);
      
      let updatedProfile = { ...profileData };

      // Upload profile image if provided
      if (profileImage) {
        console.log('Uploading profile image...');
        try {
          const timestamp = Date.now();
          const fileExtension = profileImage.name.split('.').pop() || 'jpg';
          const imagePath = `profiles/${currentUser.uid}/profile-image-${timestamp}.${fileExtension}`;
          
          const imageUrl = await uploadFile(profileImage, imagePath);
          updatedProfile.profileImageUrl = imageUrl;
          console.log('Profile image uploaded:', imageUrl);
        } catch (uploadError) {
          console.error('Error uploading profile image:', uploadError);
          toast({
            title: "Image Upload Failed",
            description: "Failed to upload profile image. Please try again.",
            variant: "destructive",
          });
          setSaving(false);
          return;
        }
      }

      // Upload resume if provided
      if (resume) {
        console.log('Uploading resume...');
        try {
          const timestamp = Date.now();
          const fileExtension = resume.name.split('.').pop() || 'pdf';
          const resumePath = `profiles/${currentUser.uid}/resume-${timestamp}.${fileExtension}`;
          
          const resumeUrl = await uploadFile(resume, resumePath);
          updatedProfile.resumeUrl = resumeUrl;
          updatedProfile.resumeName = resume.name;
          console.log('Resume uploaded:', resumeUrl);
        } catch (uploadError) {
          console.error('Error uploading resume:', uploadError);
          toast({
            title: "Resume Upload Failed",
            description: "Failed to upload resume. Please try again.",
            variant: "destructive",
          });
          setSaving(false);
          return;
        }
      }

      // Update profile in database
      await updateUserProfile(currentUser.uid, {
        profile: updatedProfile,
        updatedAt: new Date()
      });

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });

      console.log('Profile saved successfully');
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast({
        title: "Save Failed",
        description: error.message || "Failed to save profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <div className="text-white text-lg">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            onClick={() => navigate('/dashboard')}
            className="mr-4 bg-gray-800 text-white hover:bg-gray-700 border border-gray-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Profile Management
            </h1>
            <p className="text-gray-400 text-lg">Update your professional information</p>
          </div>
        </div>

        <ProfileManagement 
          initialProfile={profile?.profile}
          onSave={handleSaveProfile}
          saving={saving}
        />
      </div>
    </div>
  );
};

export default Profile;
