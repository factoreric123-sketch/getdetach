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
        <p className="text-muted-foreground mb-6">Last updated: February 16, 2026</p>

        <div className="space-y-8 text-secondary-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-bold mb-3">Overview</h2>
            <p className="text-muted-foreground">
              Detach is designed with privacy as a core principle. We do not collect, store, or transmit any personal data.
              All information stays on your device.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Data Collection</h2>
            <p className="text-muted-foreground">
              Detach does not collect any personal information. The app does not require an account, email address,
              or any form of registration. Your focus session data, blocking preferences, and activity statistics are
              stored locally on your device and are never transmitted to any server.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Screen Time API</h2>
            <p className="text-muted-foreground">
              Detach uses Apple's Screen Time API (Family Controls framework) to block apps and websites during focus sessions.
              This data is managed entirely by iOS and is not accessible to us or any third party.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">NFC</h2>
            <p className="text-muted-foreground">
              Detach uses NFC (Near Field Communication) to read tags for starting and ending sessions.
              No data is written to or collected from NFC tags beyond the identifier needed to verify the tag.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Analytics & Tracking</h2>
            <p className="text-muted-foreground">
              Detach does not use any analytics services, crash reporting tools, or advertising SDKs.
              We do not track your usage in any way.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Third-Party Services</h2>
            <p className="text-muted-foreground">
              Detach does not integrate with any third-party services that collect user data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Contact</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at support@detachapp.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
