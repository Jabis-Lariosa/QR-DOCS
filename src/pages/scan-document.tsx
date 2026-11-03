
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { ArrowLeft, Camera, CheckCircle2, QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";

export default function ScanDocument() {
  const navigate = useNavigate();
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const [trackingNo, setTrackingNo] = useState("");
  const [scanned, setScanned] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;

    let mounted = true;

    const startScanner = async () => {
      try {
        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          async (decodedText) => {
            if (!mounted) return;

            setTrackingNo(decodedText);
            setScanned(true);
            setError("");

            try {
              await scanner.stop();
            } catch {
              // Scanner may already be stopped.
            }
          },
          () => {
            // Ignore unsuccessful frame scans.
          }
        );
      } catch {
        if (mounted) {
          setError(
            "Unable to access the camera. Allow camera permission or enter the tracking number manually."
          );
        }
      }
    };

    startScanner();

    return () => {
      mounted = false;

      if (scanner.isScanning) {
        scanner.stop().catch(() => {});
      }
    };
  }, []);

  const handleContinue = () => {
    if (!trackingNo.trim()) {
      setError("Please scan a QR code or enter a tracking number.");
      return;
    }

    navigate(
      `/documents/received?trackingNo=${encodeURIComponent(trackingNo.trim())}`
    );
  };

  return (
    <div className="min-h-screen space-y-6 p-4 md:p-8">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/receive-document")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Scan Document QR Code
          </h1>
          <p className="text-sm text-muted-foreground">
            Scan the QR code to retrieve the document submission.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              <CardTitle>QR Code Scanner</CardTitle>
            </div>
            <CardDescription>
              Position the document QR code inside the scanning frame.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div
              id="qr-reader"
              className="min-h-[300px] overflow-hidden rounded-lg border bg-muted"
            />

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            {scanned && (
              <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                QR code detected successfully.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              <CardTitle>Document Tracking</CardTitle>
            </div>
            <CardDescription>
              You can also enter the tracking number manually.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Tracking Number
              </label>
              <Input
                value={trackingNo}
                onChange={(e) => {
                  setTrackingNo(e.target.value);
                  setScanned(false);
                  setError("");
                }}
                placeholder="Enter tracking number"
              />
            </div>

            <Button className="w-full" onClick={handleContinue}>
              Continue
            </Button>

            <p className="text-xs text-muted-foreground">
              Continuing only opens the tracking-number review page. The
              document will not be marked as received until the receiving
              department verifies and confirms it.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
