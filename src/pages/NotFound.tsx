import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { setCanonical, resetCanonical, setSocialMeta, resetSocialMeta } from "@/lib/canonical";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);

    setCanonical(location.pathname || "/404");
    setSocialMeta({
      title: "Page Not Found (404) | Detach",
      description:
        "The page you're looking for doesn't exist. Head back to the Detach homepage to learn about the app blocker that helps you reduce screen time.",
      path: location.pathname || "/404",
      type: "website",
    });

    let robots = document.head.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    const prev = robots.getAttribute("content");
    robots.setAttribute("content", "noindex, follow");

    return () => {
      resetCanonical();
      resetSocialMeta();
      if (prev) robots!.setAttribute("content", prev);
      else robots!.remove();
    };
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
