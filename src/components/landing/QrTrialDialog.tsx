import { useState } from "react";
import { Download } from "lucide-react";
import trialQr from "@/assets/detach-trial-qr.png.asset.json";
import StoreBadges from "@/components/StoreBadges";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const QrTrialDialog = () => {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");

  const downloadQr = async () => {
    setDownloading(true);
    setError("");
    try {
      const response = await fetch(trialQr.url);
      if (!response.ok) throw new Error("Download failed");
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = url;
      link.download = "detach-free-trial-qr.png";
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setError("Couldn't download the image. Try again or open the QR image to save it.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="h-auto max-w-xs whitespace-normal p-0 text-sm leading-relaxed underline sm:max-w-none">
          Try it free for 14 days with a printed QR code.
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-lg p-5 sm:p-6">
        <DialogHeader>
          <DialogTitle>Try Detach free for 14 days</DialogTitle>
          <DialogDescription>Download the app, turn on your free trial, and print your QR code.</DialogDescription>
        </DialogHeader>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-foreground">
          <li>Download Detach from the App Store or Play Store.</li>
          <li>Open the app and go to <strong>Settings</strong>.</li>
          <li>Turn on <strong>Use a QR Code</strong>, then start your <strong>free trial</strong>.</li>
          <li>Download and print the QR code below. Tape it onto an old card or a small piece of cardboard.</li>
          <li>Start a blocking session in Detach. To unlock, scan your printed QR code using the app.</li>
        </ol>
        <StoreBadges compact className="justify-center" />
        <a href={trialQr.url} target="_blank" rel="noopener noreferrer" aria-label="Open printable Detach trial QR code" className="mx-auto block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <img src={trialQr.url} alt="Printable Detach free-trial QR code" width={740} height={740} className="h-40 w-40 sm:h-48 sm:w-48" />
        </a>
        <Button variant="outline" onClick={downloadQr} disabled={downloading}>
          <Download aria-hidden="true" />{downloading ? "Downloading..." : "Download QR Code"}
        </Button>
        {error && <p role="alert" className="text-sm text-muted-foreground">{error}</p>}
      </DialogContent>
    </Dialog>
  );
};

export default QrTrialDialog;