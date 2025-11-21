import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Briefcase, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out successfully",
    });
    navigate("/");
  };

  return (
    <nav className="border-b border-border/50 bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
              <Briefcase className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              OPEN TO WORK
            </span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/">
              <Button variant="ghost" className="hover:bg-primary-light/50 text-base">Find Jobs</Button>
            </Link>
            <Link to="/employer/auth">
              <Button variant="ghost" className="hover:bg-primary-light/50 text-base">For Employers</Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" className="hover:bg-primary-light/50 text-base">About</Button>
            </Link>
            
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" className="hover:bg-primary-light/50">Dashboard</Button>
                </Link>
                <Button variant="ghost" className="hover:bg-destructive/10" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/candidate/auth">
                  <Button variant="outline" className="border-primary/50 hover:bg-primary-light/50">
                    Sign In
                  </Button>
                </Link>
                <Link to="/employer/auth">
                  <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-md">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
