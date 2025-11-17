import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MapPin, Building2, DollarSign, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  jobType?: string;
  workAuthorization?: string[];
  skills?: string[];
}

const JobCard = ({ 
  id, 
  title, 
  company, 
  location, 
  salaryMin, 
  salaryMax,
  jobType,
  workAuthorization,
  skills 
}: JobCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-card/50">
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              {company}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {location}
            </span>
          </div>
        </div>

        {(salaryMin || salaryMax) && (
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-success" />
            <span className="font-medium">
              ${salaryMin?.toLocaleString()} - ${salaryMax?.toLocaleString()} / year
            </span>
          </div>
        )}

        {jobType && (
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-primary" />
            <Badge variant="secondary">{jobType}</Badge>
          </div>
        )}

        {workAuthorization && workAuthorization.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {workAuthorization.slice(0, 3).map((visa) => (
              <Badge key={visa} variant="outline" className="text-xs">
                {visa}
              </Badge>
            ))}
            {workAuthorization.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{workAuthorization.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 4).map((skill) => (
              <Badge key={skill} className="text-xs bg-primary/10 text-primary hover:bg-primary/20">
                {skill}
              </Badge>
            ))}
          </div>
        )}

        <Link to={`/jobs/${id}`}>
          <Button className="w-full">View Details</Button>
        </Link>
      </div>
    </Card>
  );
};

export default JobCard;
