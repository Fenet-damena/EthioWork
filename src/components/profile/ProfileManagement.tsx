
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Upload, Link, MapPin, Briefcase, Plus, X } from 'lucide-react';

const ProfileManagement = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    location: '',
    bio: '',
    skills: [] as string[],
    experience: '',
    education: '',
    links: {
      linkedin: '',
      github: '',
      portfolio: ''
    }
  });
  
  const [newSkill, setNewSkill] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLinkChange = (platform: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      links: {
        ...prev.links,
        [platform]: value
      }
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfile(prev => ({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile data:', profile);
    console.log('Profile image:', profileImage);
    console.log('Resume:', resume);
    // TODO: Implement profile update logic
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <User className="h-6 w-6 mr-2 text-emerald-400" />
            Personal Information
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber" className="text-gray-300">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={profile.phoneNumber}
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
                value={profile.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
                placeholder="City, Country"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bio" className="text-gray-300">Bio</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              rows={4}
              placeholder="Tell us about yourself..."
            />
          </div>
        </CardContent>
      </Card>

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
              {profile.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-emerald-500/20 text-emerald-400">
                  {skill}
                  <Button
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
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
              <Button onClick={addSkill} variant="outline" className="border-gray-700">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="experience" className="text-gray-300">Experience Level</Label>
            <Select value={profile.experience} onValueChange={(value) => handleInputChange('experience', value)}>
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
              value={profile.education}
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
            <Link className="h-6 w-6 mr-2 text-emerald-400" />
            Professional Links
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="linkedin" className="text-gray-300">LinkedIn Profile</Label>
            <Input
              id="linkedin"
              value={profile.links.linkedin}
              onChange={(e) => handleLinkChange('linkedin', e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
          
          <div>
            <Label htmlFor="github" className="text-gray-300">GitHub Profile</Label>
            <Input
              id="github"
              value={profile.links.github}
              onChange={(e) => handleLinkChange('github', e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="https://github.com/yourusername"
            />
          </div>
          
          <div>
            <Label htmlFor="portfolio" className="text-gray-300">Portfolio Website</Label>
            <Input
              id="portfolio"
              value={profile.links.portfolio}
              onChange={(e) => handleLinkChange('portfolio', e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="https://yourportfolio.com"
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
                  variant="outline" 
                  onClick={() => setResume(null)}
                  className="border-gray-700"
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <div className="text-gray-300">Drop your resume here or click to browse</div>
                <div className="text-gray-400 text-sm">PDF, DOC, DOCX (max 5MB)</div>
                <Label htmlFor="resume-upload" className="cursor-pointer">
                  <Button variant="outline" className="border-gray-700">
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

      <div className="flex justify-end space-x-4">
        <Button variant="outline" className="border-gray-700">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          className="bg-gradient-to-r from-emerald-500 to-blue-500"
        >
          Save Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileManagement;
