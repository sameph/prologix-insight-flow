import React, { useState, useRef } from "react";
import { Scan, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface BarcodeScannerProps {
  onScan: (code: string) => void;
}

const BarcodeScanner = ({ onScan }: BarcodeScannerProps) => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Simulate scanning a barcode for demo purposes
  const simulateScan = () => {
    setIsScanning(true);
    
    toast({
      title: "Scanning barcode...",
      description: "Please hold steady"
    });
    
    // Simulate a scan after 2 seconds
    setTimeout(() => {
      const randomBarcodes = [
        "PRD-78321",
        "PRD-92381",
        "PRD-12465",
        "PRD-45692",
        "PRD-63741"
      ];
      
      const randomBarcode = randomBarcodes[Math.floor(Math.random() * randomBarcodes.length)];
      
      onScan(randomBarcode);
      setIsScanning(false);
      
      toast({
        title: "Barcode scanned",
        description: `Product ID: ${randomBarcode}`
      });
    }, 2000);
  };
  
  // In a real implementation, this would use a barcode scanning library
  const startRealScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsPermissionGranted(true);
        setIsScanning(true);
        
        // In a real app, we would initialize a barcode scanning library here
        // For example: https://github.com/zxing-js/library
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setIsPermissionGranted(false);
      toast({
        variant: "destructive",
        title: "Camera access denied",
        description: "Please grant camera permission to scan barcodes"
      });
    }
  };
  
  const stopScanner = () => {
    setIsScanning(false);
    
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };
  
  return (
    <div className="flex flex-col items-center space-y-4">
      {isScanning ? (
        <div className="w-full aspect-video relative bg-gray-100 rounded-md overflow-hidden">
          <video 
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
          />
          <canvas 
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-0"
          />
          
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-1 bg-blue-500 opacity-70 animate-scan" />
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 bg-white/70 backdrop-blur-sm"
            onClick={() => {
              stopScanner();
              setIsScanning(false);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <style>
            {`
              @keyframes scan {
                0% { transform: translateY(0); }
                50% { transform: translateY(100%); }
                100% { transform: translateY(0); }
              }
              .animate-scan {
                animation: scan 2s linear infinite;
              }
            `}
          </style>
        </div>
      ) : (
        <div className="w-full aspect-video bg-gray-100 rounded-md flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
          <Scan className="h-12 w-12 text-gray-400 mb-2" />
          <p className="text-gray-500 text-sm">Camera preview will appear here</p>
        </div>
      )}
      
      <div className="flex gap-2 w-full">
        <Button 
          onClick={simulateScan}
          className="flex-1"
          variant={isScanning ? "secondary" : "default"}
          disabled={isScanning}
        >
          <Scan className="h-4 w-4 mr-2" />
          {isScanning ? "Scanning..." : "Simulate Scan"}
        </Button>
      </div>
      
      <div className="text-sm text-muted-foreground text-center">
        <p>Scan a product barcode to retrieve detailed information</p>
      </div>
    </div>
  );
};

export default BarcodeScanner;
