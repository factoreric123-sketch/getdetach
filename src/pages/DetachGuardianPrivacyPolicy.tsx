import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { setCanonical, resetCanonical, setSocialMeta, resetSocialMeta } from "@/lib/canonical";

const sections = [
  {
    title: "1. Who This Policy Is For",
    paragraphs: ["Detach Guardian is set up by a parent, guardian or school to manage screen time on a student’s device. This policy explains what the app collects, why, and what stays on the device."],
  },
  {
    title: "2. What We Don’t Collect",
    paragraphs: ["Detach Guardian has no accounts. We don’t collect names, email addresses, phone numbers, contacts, location, photos or messages. There is no advertising and no third-party tracking. We never see which apps or websites are used or blocked."],
  },
  {
    title: "3. What Stays on the Device",
    paragraphs: [
      "Blocking rules, modes, schedules, quotes, block history and the linked card are stored only on the device. App and category choices are handled by Apple’s Screen Time (FamilyControls), which gives the app anonymous tokens instead of app names. Those choices never leave the device.",
      "Camera: the QR scanner uses the camera only to read the Detach QR code while you are scanning. Nothing it sees is saved or sent anywhere.",
    ],
  },
  {
    title: "4. What Is Sent to Our Server",
    paragraphs: [
      "Card checks: when a Detach card is scanned or linked, its chip serial number is checked against our list of genuine Detach cards.",
      "Admin and support codes: when one is entered, it is sent to our server to be checked.",
      "QR activation: when a QR activation code is redeemed, the code and a random device identifier created by the app are sent, so the code is tied to one device.",
      "Daily usage count: once a day, the app sends the date and a random identifier created by the app, so we can count how many devices use Detach Guardian. None of these identifiers is linked to a person.",
    ],
  },
  {
    title: "5. Children",
    paragraphs: ["Detach Guardian is used on children’s devices, but it is set up and controlled by an adult. We don’t ask children for personal information, and the identifiers above are random values created by the app, not linked to a name or account. Parents, guardians and schools can contact us at any time to ask about or delete this data."],
  },
  {
    title: "6. Service Providers",
    paragraphs: ["Server checks run on Lovable Cloud, which stores the data described above on our behalf. Screen Time features are provided by Apple on the device."],
  },
  {
    title: "7. Retention & Deletion",
    paragraphs: ["Deleting the app removes everything stored on the device. Data on our server is kept only as long as needed to run card, code and activation checks and to count daily usage. To ask for deletion, email getdetach@gmail.com."],
  },
  {
    title: "8. Changes to This Policy",
    paragraphs: ["We may update this policy from time to time. We will post the new version in the app and update the “Last Updated” date."],
  },
  {
    title: "9. Contact Us",
    paragraphs: ["Questions about this policy? Email getdetach@gmail.com."],
  },
];

const DetachGuardianPrivacyPolicy = () => {
  useEffect(() => {
    setCanonical("/detach-guardian-privacy-policy");
    setSocialMeta({
      title: "Detach Guardian Privacy Policy | Detach",
      description: "How Detach Guardian handles data on students’ devices, including on-device storage, card checks, QR activation, and deletion requests.",
      path: "/detach-guardian-privacy-policy",
    });
    return () => {
      resetCanonical();
      resetSocialMeta();
    };
  }, []);

  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
        <h1 className="text-4xl font-bold mb-6">Detach Guardian Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: October 25, 2026</p>
        <div className="space-y-8 leading-relaxed">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-bold mb-3">{section.title}</h2>
              <div className="space-y-3 text-muted-foreground">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>
                    {paragraph.split("getdetach@gmail.com").map((part, index) => (
                      <span key={index}>
                        {index > 0 && <a href="mailto:getdetach@gmail.com" className="text-foreground underline hover:text-foreground/80">getdetach@gmail.com</a>}
                        {part}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
};

export default DetachGuardianPrivacyPolicy;