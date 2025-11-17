import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Briefcase, Users, Eye } from "lucide-react";

const EmployerDashboard = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);

  // Job form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [visaTypes, setVisaTypes] = useState<string[]>([]);
  const [skills, setSkills] = useState("");

  useEffect(() => {
    fetchProfile();
    fetchJobs();
  }, []);

  const fetchProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data } = await supabase
      .from("employer_profiles")
      .select("*, profiles(*)")
      .eq("user_id", session.user.id)
      .single();

    if (data) {
      setProfile(data);
    }
  };

  const fetchJobs = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data: employerProfile } = await supabase
      .from("employer_profiles")
      .select("id")
      .eq("user_id", session.user.id)
      .single();

    if (employerProfile) {
      const { data } = await supabase
        .from("jobs")
        .select("*")
        .eq("employer_id", employerProfile.id)
        .order("created_at", { ascending: false });

      setJobs(data || []);
    }
  };

  const fetchApplications = async (jobId: string) => {
    const { data } = await supabase
      .from("applications")
      .select(`
        *,
        candidate:candidate_profiles(
          *,
          profiles(*)
        )
      `)
      .eq("job_id", jobId);

    setApplications(data || []);
  };

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      const { error } = await supabase.from("jobs").insert({
        employer_id: profile.id,
        title,
        description,
        location,
        salary_min: salaryMin ? parseInt(salaryMin) : undefined,
        salary_max: salaryMax ? parseInt(salaryMax) : undefined,
        job_type: jobType,
        work_authorization: visaTypes as any,
        skills_required: skills.split(',').map(s => s.trim()).filter(Boolean),
      } as any);

      if (error) throw error;

      toast({
        title: "Job posted successfully!",
      });
      setIsDialogOpen(false);
      fetchJobs();
      // Reset form
      setTitle("");
      setDescription("");
      setLocation("");
      setSalaryMin("");
      setSalaryMax("");
      setVisaTypes([]);
      setSkills("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleViewApplications = (job: any) => {
    setSelectedJob(job);
    fetchApplications(job.id);
  };

  if (!profile) return <div className="p-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Employer Dashboard</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Post a New Job</DialogTitle>
            </DialogHeader>
            <form onSubmit={handlePostJob} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobtype">Job Type</Label>
                  <Select value={jobType} onValueChange={setJobType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salarymin">Minimum Salary ($)</Label>
                  <Input
                    id="salarymin"
                    type="number"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salarymax">Maximum Salary ($)</Label>
                  <Input
                    id="salarymax"
                    type="number"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Work Authorization (select multiple)</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['H1B', 'CPT-EAD', 'OPT-EAD', 'GC', 'GC-EAD', 'USC', 'TN'].map((visa) => (
                    <label key={visa} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={visaTypes.includes(visa)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setVisaTypes([...visaTypes, visa]);
                          } else {
                            setVisaTypes(visaTypes.filter(v => v !== visa));
                          }
                        }}
                      />
                      <span className="text-sm">{visa}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Required Skills (comma-separated)</Label>
                <Input
                  id="skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="React, Node.js, Python"
                />
              </div>
              <Button type="submit" className="w-full">Post Job</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Company Info */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Company Profile</h2>
            <div className="space-y-3">
              <div>
                <Label className="text-muted-foreground">Company</Label>
                <p className="font-medium">{profile.company_name}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Location</Label>
                <p className="font-medium">{profile.location}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Posted Jobs</Label>
                <p className="font-medium text-2xl text-primary">{jobs.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Jobs List */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Your Job Postings</h2>
            {jobs.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  You haven't posted any jobs yet
                </p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  Post Your First Job
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <Card key={job.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {job.location} • {job.job_type}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {job.work_authorization?.slice(0, 3).map((visa: string) => (
                            <Badge key={visa} variant="outline" className="text-xs">
                              {visa}
                            </Badge>
                          ))}
                        </div>
                        <Badge variant={job.is_active ? "default" : "secondary"}>
                          {job.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewApplications(job)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Applications
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Applications Modal */}
      {selectedJob && (
        <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Applications for {selectedJob.title}</DialogTitle>
            </DialogHeader>
            {applications.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No applications yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app) => (
                  <Card key={app.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{app.candidate?.profiles?.full_name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {app.candidate?.profiles?.email}
                        </p>
                        <Badge className="mt-2">{app.candidate?.work_authorization}</Badge>
                        <p className="text-sm text-muted-foreground mt-2">
                          Applied: {new Date(app.applied_at).toLocaleDateString()}
                        </p>
                      </div>
                      {app.candidate?.resume_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={app.candidate.resume_url} target="_blank" rel="noopener noreferrer">
                            View Resume
                          </a>
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default EmployerDashboard;
