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
    <section className="relative py-32 md:py-40 bg-gradient-to-br from-primary via-accent to-primary-glow text-primary-foreground overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-accent/90 to-primary-glow/90"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-tight">
              Step Into a World of <br />Better Opportunities
            </h1>
            <p className="text-2xl md:text-3xl text-primary-foreground/95 max-w-3xl mx-auto font-light">
              Search. Apply. Grow. Your journey starts now.
            </p>
          </div>
          
          {/* Premium Search Card */}
          <div className="bg-background rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-sm animate-scale-in max-w-4xl mx-auto">
            <div className="grid md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
              <div className="relative">
                <label className="block text-sm font-semibold text-foreground mb-2 text-left">Job Title / Keyword</label>
                <Search className="absolute left-4 bottom-4 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="e.g. Software Engineer"
                  className="pl-12 h-14 border-border/50 focus:border-primary transition-colors text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-foreground mb-2 text-left">Location</label>
                <MapPin className="absolute left-4 bottom-4 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="City or State"
                  className="pl-12 h-14 border-border/50 focus:border-primary transition-colors text-base"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                />
              </div>
              <Button 
                className="h-14 px-10 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg font-semibold shadow-lg rounded-xl" 
                onClick={onSearch}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
