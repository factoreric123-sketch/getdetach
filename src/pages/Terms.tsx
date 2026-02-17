import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
        <p className="text-muted-foreground mb-6">Last updated: February 16, 2026</p>

        <div className="space-y-8 text-secondary-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-bold mb-3">Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By downloading and using Detach, you agree to be bound by these Terms and Conditions.
              If you do not agree to these terms, please do not use the app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Use of the App</h2>
            <p className="text-muted-foreground">
              Detach is a digital wellness tool that helps you manage screen time by blocking apps and websites
              during focus sessions. The app uses Apple's Screen Time API and NFC technology to provide its functionality.
              You are responsible for your own use of the app and any consequences thereof.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Strict Mode</h2>
            <p className="text-muted-foreground">
              When Strict Mode is enabled, you cannot end a focus session by deleting the app.
              By enabling Strict Mode, you acknowledge that you are voluntarily restricting your ability to
              end sessions early. Detach is not responsible for any inconvenience caused by Strict Mode.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Emergency Overrides</h2>
            <p className="text-muted-foreground">
              Emergency overrides allow you to end a session without tapping your NFC tag.
              These are limited in number and intended only for genuine emergencies.
              Misuse of emergency overrides is at your own discretion and responsibility.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Disclaimer</h2>
            <p className="text-muted-foreground">
              Detach is provided "as is" without warranty of any kind. We do not guarantee that the app will
              be error-free or uninterrupted. We are not responsible for any damages arising from the use of
              the app, including but not limited to missed communications during focus sessions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Changes will be reflected in the app
              and on our website. Continued use of the app after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Contact</h2>
            <p className="text-muted-foreground">
              For questions about these Terms & Conditions,{" "}
              <Link to="/contact" className="text-primary hover:underline">contact us</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
