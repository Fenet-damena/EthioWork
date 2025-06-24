import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X, MapPin, Building2, DollarSign, ArrowLeft } from 'lucide-react';
import { useJobs } from '@/hooks/useJobs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const PostJob = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { createJob } = useJobs();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    workMode: '',
    description: '',
    requirements: '',
    responsibilities: '',
    salaryMin: '',
    salaryMax: '',
    currency: 'ETB',
    category: '',
    expiryDate: ''
  });

  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setJobData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      navigate('/auth');
      return;
    }

    try {
      setLoading(true);
      
      const jobPayload = {
        ...jobData,
        employerId: currentUser.uid,
        skills,
        salaryMin: jobData.salaryMin ? parseInt(jobData.salaryMin) : null,
        salaryMax: jobData.salaryMax ? parseInt(jobData.salaryMax) : null,
        expiryDate: jobData.expiryDate ? new Date(jobData.expiryDate) : null
      };

      await createJob(jobPayload);
      
      toast({
        title: "Job posted successfully",
        description: "Your job listing is now live and visible to job seekers."
      });

      // Redirect back to dashboard instead of job-seekers page
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Failed to post job",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

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
            Post a New Job
          </h1>
          <p className="text-gray-400 mt-2">Find the perfect candidate for your position</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Building2 className="h-6 w-6 mr-2 text-emerald-400" />
                Job Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title" className="text-gray-300">Job Title *</Label>
                  <Input
                    id="title"
                    value={jobData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="e.g., Senior Software Developer"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="company" className="text-gray-300">Company *</Label>
                  <Input
                    id="company"
                    value={jobData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="e.g., TechCorp Ethiopia"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location" className="text-gray-300">Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="location"
                      value={jobData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                      placeholder="e.g., Addis Ababa, Ethiopia"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="category" className="text-gray-300">Category *</Label>
                  <Select value={jobData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type" className="text-gray-300">Job Type *</Label>
                  <Select value={jobData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="workMode" className="text-gray-300">Work Mode *</Label>
                  <Select value={jobData.workMode} onValueChange={(value) => handleInputChange('workMode', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select work mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <DollarSign className="h-6 w-6 mr-2 text-emerald-400" />
                Salary Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="salaryMin" className="text-gray-300">Minimum Salary</Label>
                  <Input
                    id="salaryMin"
                    type="number"
                    value={jobData.salaryMin}
                    onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="50000"
                  />
                </div>
                <div>
                  <Label htmlFor="salaryMax" className="text-gray-300">Maximum Salary</Label>
                  <Input
                    id="salaryMax"
                    type="number"
                    value={jobData.salaryMax}
                    onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="80000"
                  />
                </div>
                <div>
                  <Label htmlFor="currency" className="text-gray-300">Currency</Label>
                  <Select value={jobData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ETB">ETB</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Job Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="description" className="text-gray-300">Description *</Label>
                <Textarea
                  id="description"
                  value={jobData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={4}
                  placeholder="Describe the role and what the candidate will be doing..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="responsibilities" className="text-gray-300">Responsibilities</Label>
                <Textarea
                  id="responsibilities"
                  value={jobData.responsibilities}
                  onChange={(e) => handleInputChange('responsibilities', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={3}
                  placeholder="List the main responsibilities..."
                />
              </div>

              <div>
                <Label htmlFor="requirements" className="text-gray-300">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={jobData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={3}
                  placeholder="List the requirements and qualifications..."
                />
              </div>

              <div>
                <Label className="text-gray-300">Required Skills</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {skills.map((skill, index) => (
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
                    placeholder="Add a required skill"
                    className="bg-gray-800 border-gray-700 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  />
                  <Button onClick={addSkill} type="button" variant="outline" className="border-gray-700">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="expiryDate" className="text-gray-300">Application Deadline (Optional)</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={jobData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button 
              variant="outline" 
              type="button" 
              className="border-gray-700"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-emerald-500 to-blue-500"
              disabled={loading}
            >
              {loading ? 'Posting...' : 'Post Job'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
