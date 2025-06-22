
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Building2, Clock, DollarSign, Briefcase, Heart, Bookmark, Share2, Upload } from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();
  const [isApplying, setIsApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState<File | null>(null);

  // Sample job data (in real app, fetch by ID)
  const job = {
    id: 1,
    title: "Senior Software Developer",
    company: "TechCorp Ethiopia",
    location: "Addis Ababa, Ethiopia",
    jobType: "Full-time",
    workMode: "Hybrid",
    salary: "80,000 - 120,000 ETB",
    description: "We are looking for an experienced software developer to join our growing team. You will be responsible for developing and maintaining web applications using modern technologies.",
    responsibilities: [
      "Develop and maintain web applications using React and Node.js",
      "Collaborate with cross-functional teams to define and implement new features",
      "Write clean, maintainable, and efficient code",
      "Participate in code reviews and technical discussions",
      "Mentor junior developers and share best practices"
    ],
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "5+ years of experience in software development",
      "Strong knowledge of React, Node.js, and JavaScript",
      "Experience with databases (MongoDB, PostgreSQL)",
      "Good communication skills in English and Amharic"
    ],
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "REST APIs"],
    postedDate: "2 days ago",
    expiryDate: "30 days",
    logo: "🏢",
    companyInfo: {
      name: "TechCorp Ethiopia",
      industry: "Technology",
      size: "50-100 employees",
      website: "www.techcorp.et",
      description: "Leading technology company in Ethiopia, focused on innovative solutions for local and international markets."
    }
  };

  const handleApply = () => {
    setIsApplying(true);
  };

  const handleSubmitApplication = () => {
    console.log('Application submitted:', { coverLetter, resume });
    // TODO: Implement application submission
    setIsApplying(false);
  };

  const handleFileUpload = (file: File) => {
    setResume(file);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Job Header */}
        <Card className="bg-gray-900/50 border-gray-800 mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center text-3xl">
                  {job.logo}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-400 text-lg mb-3">
                    <div className="flex items-center">
                      <Building2 className="h-5 w-5 mr-2" />
                      {job.company}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      {job.postedDate}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 mb-4">
                    <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400">
                      {job.jobType}
                    </Badge>
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                      {job.workMode}
                    </Badge>
                    <div className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                      {job.salary}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-emerald-400">
                  <Bookmark className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button 
                onClick={handleApply}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 px-8"
              >
                Apply Now
              </Button>
              <Button variant="outline" className="border-gray-700">
                Save Job
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">{job.description}</p>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-300">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-300">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Required Skills */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Required Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">About the Company</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{job.companyInfo.name}</h3>
                  <p className="text-gray-300 text-sm mb-3">{job.companyInfo.description}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Industry:</span>
                    <span className="text-white">{job.companyInfo.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Company Size:</span>
                    <span className="text-white">{job.companyInfo.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Website:</span>
                    <span className="text-blue-400">{job.companyInfo.website}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Details */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Job Type:</span>
                  <span className="text-white">{job.jobType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Work Mode:</span>
                  <span className="text-white">{job.workMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Posted:</span>
                  <span className="text-white">{job.postedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Expires in:</span>
                  <span className="text-white">{job.expiryDate}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Application Modal */}
        {isApplying && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="bg-gray-900 border-gray-800 w-full max-w-2xl m-4">
              <CardHeader>
                <CardTitle className="text-white">Apply for {job.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-gray-300 text-sm">Upload Resume</label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center mt-2">
                    {resume ? (
                      <div className="space-y-2">
                        <div className="text-emerald-400">{resume.name}</div>
                        <div className="text-gray-400 text-sm">{(resume.size / 1024 / 1024).toFixed(2)} MB</div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                        <div className="text-gray-300">Upload your resume</div>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                          className="hidden"
                          id="resume-upload"
                        />
                        <label htmlFor="resume-upload">
                          <Button variant="outline" className="border-gray-700" asChild>
                            <span>Choose File</span>
                          </Button>
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-gray-300 text-sm">Cover Letter (Optional)</label>
                  <Textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white mt-2"
                    rows={6}
                    placeholder="Tell us why you're interested in this position..."
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsApplying(false)}
                    className="border-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSubmitApplication}
                    className="bg-gradient-to-r from-emerald-500 to-blue-500"
                    disabled={!resume}
                  >
                    Submit Application
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
