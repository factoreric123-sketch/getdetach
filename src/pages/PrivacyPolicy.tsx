import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-6">Last updated: March 4, 2026</p>

        <div className="space-y-8 text-secondary-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-bold mb-3">Overview</h2>
            <p className="text-muted-foreground">
              Detach is built to minimize data collection. Most app data stays on your device.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Data We Collect</h2>
            <p className="text-muted-foreground mb-3">
              We do not require account creation, email, or profile information.
            </p>
            <p className="text-muted-foreground mb-2">We process:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
              <li>Basic request metadata needed for service operation and security (for example, request timing and technical logs)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Data Stored On Device</h2>
            <p className="text-muted-foreground mb-2">Detach stores locally on your device:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
              <li>Focus session history</li>
              <li>Blocking preferences</li>
              <li>Activity statistics</li>
              <li>Mode and schedule settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Screen Time / Family Controls</h2>
            <p className="text-muted-foreground">
              Detach uses Apple's Family Controls / Screen Time frameworks to apply blocking rules.
              This data is managed through Apple's system frameworks and your device permissions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Analytics & Tracking</h2>
            <p className="text-muted-foreground">
              Detach does not use advertising SDKs.
              Detach does not use third-party behavioral tracking across apps or websites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Third-Party Services</h2>
            <p className="text-muted-foreground">
              Detach uses a backend service for authorization and verification purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Data Retention</h2>
            <p className="text-muted-foreground mb-2">
              On-device focus/session/settings data remains on your device until you delete it or remove the app.
            </p>
            <p className="text-muted-foreground">
              Server-side authorization records are retained as needed to operate and secure the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Your Choices</h2>
            <p className="text-muted-foreground">
              You can remove the app at any time.
              You may contact us to request deletion of server-side data where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Children</h2>
            <p className="text-muted-foreground">
              This app is intended for a general audience and is not directed to children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this policy from time to time. We will update the "Last updated" date when changes are made.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Contact</h2>
            <p className="text-muted-foreground">
              If you have questions about this Privacy Policy, please{" "}
              <Link to="/contact" className="text-primary hover:underline">contact us</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
