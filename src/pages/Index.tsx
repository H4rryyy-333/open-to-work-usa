import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Briefcase } from "lucide-react";
import { supabase } from "@/lib/supabase";

const Index = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [visaFilter, setVisaFilter] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    let query = supabase
      .from("jobs")
      .select(`
        *,
        employer:employer_profiles(
          company_name,
          location
        )
      `)
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching jobs:", error);
    } else {
      setJobs(data || []);
    }
    setLoading(false);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesVisa = !visaFilter || job.work_authorization?.includes(visaFilter);
    return matchesSearch && matchesLocation && matchesVisa;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-accent to-primary-glow text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Find Your Dream Job in the USA
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
              Connect with top employers. All visa categories welcome.
            </p>
            
            {/* Search Bar */}
            <div className="bg-background/95 backdrop-blur rounded-xl p-6 shadow-2xl">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Job title or keywords"
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Location"
                    className="pl-10"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                </div>
                <Select value={visaFilter} onValueChange={setVisaFilter}>
                  <SelectTrigger>
                    <Briefcase className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Work Authorization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=" ">All Visas</SelectItem>
                    <SelectItem value="H1B">H1B</SelectItem>
                    <SelectItem value="CPT-EAD">CPT-EAD</SelectItem>
                    <SelectItem value="OPT-EAD">OPT-EAD</SelectItem>
                    <SelectItem value="GC">Green Card</SelectItem>
                    <SelectItem value="GC-EAD">GC-EAD</SelectItem>
                    <SelectItem value="USC">US Citizen</SelectItem>
                    <SelectItem value="TN">TN Visa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                className="w-full mt-4 bg-gradient-to-r from-primary to-accent hover:opacity-90" 
                size="lg"
                onClick={fetchJobs}
              >
                Search Jobs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Listing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Available
          </h2>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading jobs...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No jobs found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  company={job.employer?.company_name || "Company"}
                  location={job.location}
                  salaryMin={job.salary_min}
                  salaryMax={job.salary_max}
                  jobType={job.job_type}
                  workAuthorization={job.work_authorization}
                  skills={job.skills_required}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
