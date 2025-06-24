
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Upload, 
  Link, 
  MapPin, 
  Briefcase, 
  Plus, 
  X, 
  ArrowLeft,
  Building2,
  Save
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile } from '@/hooks/useAuth';
import { updateUserProfile, uploadFile } from '@/services/firebase';

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { profile, loading } = useUserProfile(currentUser?.uid || null);
  const { toast } = useToast();
  
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    location: '',
    bio: '',
    skills: [] as string[],
    experience: '',
    education: '',
    companyName: '',
    companyDescription: '',
    industry: '',
    links: {
      linkedin: '',
      github: '',
      portfolio: ''
    }
  });
  
  const [newSkill, setNewSkill] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);

  useEffect(() => {
    if (profile?.profile) {
      setProfileData({
        firstName: profile.profile.firstName || '',
        lastName: profile.profile.lastName || '',
        email: profile.email || '',
        phoneNumber: profile.profile.phoneNumber || '',
        location: profile.profile.location || '',
        bio: profile.profile.bio || '',
        skills: profile.profile.skills || [],
        experience: profile.profile.experience || '',
        education: profile.profile.education || '',
        companyName: profile.profile.companyName || '',
        companyDescription: profile.profile.companyDescription || '',
        industry: profile.profile.industry || '',
        links: profile.profile.links || {
          linkedin: '',
          github: '',
          portfolio: ''
        }
      });
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLinkChange = (platform: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      links: {
        ...prev.links,
        [platform]: value
      }
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

  const handleFileUpload = (file: File, type: 'image' | 'resume') => {
    if (type === 'image') {
      setProfileImage(file);
    } else {
      setResume(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) return;

    try {
      setSaving(true);
      
      let profileImageUrl = profile?.profile?.profileImageUrl || '';
      let resumeUrl = profile?.profile?.resumeUrl || '';

      // Upload profile image if selected
      if (profileImage) {
        profileImageUrl = await uploadFile(
          profileImage, 
          `profiles/${currentUser.uid}/profile-image-${Date.now()}`
        );
      }

      // Upload resume if selected
      if (resume) {
        resumeUrl = await uploadFile(
          resume, 
          `profiles/${currentUser.uid}/resume-${Date.now()}`
        );
      }

      const updatedProfile = {
        profile: {
          ...profileData,
          profileImageUrl,
          resumeUrl
        }
      };

      await updateUserProfile(currentUser.uid, updatedProfile);
      
      toast({
        title: "Profile updated successfully",
        description: "Your profile information has been saved."
      });

      // Clear file inputs
      setProfileImage(null);
      setResume(null);
      
    } catch (error: any) {
      toast({
        title: "Failed to update profile",
        description: error.message,
        variant: "destructive"
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

  const isEmployer = profile?.role === 'employer';

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Button 
          onClick={() => navigate('/dashboard')} 
          variant="ghost" 
          className="mb-6 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            {isEmployer ? 'Company Profile' : 'My Profile'}
          </h1>
          <p className="text-gray-400 mt-2">
            {isEmployer ? 'Manage your company information' : 'Manage your personal profile'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                {isEmployer ? <Building2 className="h-6 w-6 mr-2 text-emerald-400" /> : <User className="h-6 w-6 mr-2 text-emerald-400" />}
                {isEmployer ? 'Company Information' : 'Personal Information'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center">
                  {profileImage ? (
                    <img 
                      src={URL.createObjectURL(profileImage)} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : profile?.profile?.profileImageUrl ? (
                    <img 
                      src={profile.profile.profileImageUrl} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-white" />
                  )}
                </div>
                <div>
                  <Label htmlFor="profile-image" className="cursor-pointer">
                    <Button variant="outline" className="border-gray-700">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                  </Label>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'image')}
                  />
                  <p className="text-gray-400 text-sm mt-1">JPG, PNG or GIF (max 5MB)</p>
                </div>
              </div>

              {isEmployer ? (
                <>
                  <div>
                    <Label htmlFor="companyName" className="text-gray-300">Company Name *</Label>
                    <Input
                      id="companyName"
                      value={profileData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="industry" className="text-gray-300">Industry</Label>
                    <Select value={profileData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="companyDescription" className="text-gray-300">Company Description</Label>
                    <Textarea
                      id="companyDescription"
                      value={profileData.companyDescription}
                      onChange={(e) => handleInputChange('companyDescription', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      rows={4}
                      placeholder="Describe your company..."
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-300">First Name *</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-300">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio" className="text-gray-300">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      rows={4}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber" className="text-gray-300">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location" className="text-gray-300">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                    placeholder="City, Country"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {!isEmployer && (
            <>
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Briefcase className="h-6 w-6 mr-2 text-emerald-400" />
                    Skills & Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Skills</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {profileData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-emerald-500/20 text-emerald-400">
                          {skill}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSkill(skill)}
                            className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill"
                        className="bg-gray-800 border-gray-700 text-white"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      />
                      <Button onClick={addSkill} type="button" variant="outline" className="border-gray-700">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="experience" className="text-gray-300">Experience Level</Label>
                    <Select value={profileData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level (0-1 years)</SelectItem>
                        <SelectItem value="junior">Junior Level (1-3 years)</SelectItem>
                        <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                        <SelectItem value="senior">Senior Level (5-8 years)</SelectItem>
                        <SelectItem value="lead">Lead Level (8+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="education" className="text-gray-300">Education</Label>
                    <Input
                      id="education"
                      value={profileData.education}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Your highest education level"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Upload className="h-6 w-6 mr-2 text-emerald-400" />
                    Resume Upload
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                    {resume ? (
                      <div className="space-y-2">
                        <div className="text-emerald-400">{resume.name}</div>
                        <div className="text-gray-400 text-sm">{(resume.size / 1024 / 1024).toFixed(2)} MB</div>
                        <Button 
                          type="button"
                          variant="outline" 
                          onClick={() => setResume(null)}
                          className="border-gray-700"
                        >
                          Remove
                        </Button>
                      </div>
                    ) : profile?.profile?.resumeUrl ? (
                      <div className="space-y-2">
                        <div className="text-emerald-400">Resume uploaded</div>
                        <Button 
                          type="button"
                          variant="outline" 
                          onClick={() => window.open(profile.profile.resumeUrl, '_blank')}
                          className="border-gray-700"
                        >
                          View Current Resume
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                        <div className="text-gray-300">Drop your resume here or click to browse</div>
                        <div className="text-gray-400 text-sm">PDF, DOC, DOCX (max 5MB)</div>
                        <Label htmlFor="resume-upload" className="cursor-pointer">
                          <Button type="button" variant="outline" className="border-gray-700">
                            Choose File
                          </Button>
                        </Label>
                        <input
                          id="resume-upload"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'resume')}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Link className="h-6 w-6 mr-2 text-emerald-400" />
                Professional Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="linkedin" className="text-gray-300">LinkedIn Profile</Label>
                <Input
                  id="linkedin"
                  value={profileData.links.linkedin}
                  onChange={(e) => handleLinkChange('linkedin', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              
              {!isEmployer && (
                <div>
                  <Label htmlFor="github" className="text-gray-300">GitHub Profile</Label>
                  <Input
                    id="github"
                    value={profileData.links.github}
                    onChange={(e) => handleLinkChange('github', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="https://github.com/yourusername"
                  />
                </div>
              )}
              
              <div>
                <Label htmlFor="portfolio" className="text-gray-300">
                  {isEmployer ? 'Company Website' : 'Portfolio Website'}
                </Label>
                <Input
                  id="portfolio"
                  value={profileData.links.portfolio}
                  onChange={(e) => handleLinkChange('portfolio', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder={isEmployer ? "https://yourcompany.com" : "https://yourportfolio.com"}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button 
              type="button"
              variant="outline" 
              className="border-gray-700"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-emerald-500 to-blue-500"
              disabled={saving}
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Profile
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
