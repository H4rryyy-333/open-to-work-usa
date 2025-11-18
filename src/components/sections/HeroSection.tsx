import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Briefcase } from "lucide-react";

interface HeroSectionProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  locationFilter: string;
  setLocationFilter: (value: string) => void;
  visaFilter: string;
  setVisaFilter: (value: string) => void;
  onSearch: () => void;
}

const HeroSection = ({
  searchTerm,
  setSearchTerm,
  locationFilter,
  setLocationFilter,
  visaFilter,
  setVisaFilter,
  onSearch
}: HeroSectionProps) => {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary via-accent to-primary-glow text-primary-foreground overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Find Your Dream Job in the USA
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
              Connect with top employers. All visa categories welcome. Start your career journey today.
            </p>
          </div>
          
          {/* Premium Search Card */}
          <div className="bg-background rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-sm animate-scale-in">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Job title or keywords"
                  className="pl-12 h-12 border-border/50 focus:border-primary transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Location"
                  className="pl-12 h-12 border-border/50 focus:border-primary transition-colors"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                />
              </div>
              <Select value={visaFilter} onValueChange={setVisaFilter}>
                <SelectTrigger className="h-12 border-border/50">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <SelectValue placeholder="Work Authorization" />
                  </div>
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
              className="w-full mt-6 h-12 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg font-semibold shadow-lg" 
              onClick={onSearch}
            >
              Search Jobs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
