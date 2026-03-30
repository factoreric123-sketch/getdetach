import { Link } from "react-router-dom";
import { Apple } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-1">Detach</h3>
            <p className="text-sm text-muted-foreground">The app blocker for reducing screen time.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="#privacy" className="hover:text-foreground transition-colors">Privacy</a>
            <Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>

          <a
            href="https://apps.apple.com/us/app/detach-screen-break/id6759267252"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-3 rounded-xl font-semibold text-sm hover:bg-secondary/80 transition-colors"
          >
            <Apple className="w-4 h-4" />
            App Store
          </a>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Detach. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
