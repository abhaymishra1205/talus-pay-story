import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ShoppingBag, Clock } from "lucide-react";

interface SuccessScreenProps {
  onComplete: () => void;
}

export const SuccessScreen = ({ onComplete }: SuccessScreenProps) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-success border-0 bg-payment-card">
        <CardContent className="text-center p-8 space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-success rounded-full animate-pulse shadow-success"></div>
              <div className="relative p-4 bg-gradient-success rounded-full">
                <CheckCircle className="h-12 w-12 text-success-foreground" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-payment-text">
              Payment Successful!
            </h1>
            <p className="text-payment-muted">
              Thank you for your purchase
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 p-4 bg-muted rounded-lg">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <div className="text-left">
                <p className="font-medium text-payment-text">Order #ORD_TEST_POST_1</p>
                <p className="text-sm text-payment-muted">Amount: $90.00</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-payment-muted">
              <Clock className="h-4 w-4" />
              <span className="text-sm">
                Leaving store in {countdown} seconds...
              </span>
            </div>

            <div className="w-full bg-payment-border rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-smooth"
                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="text-xs text-payment-muted space-y-1">
            <p>A receipt has been sent to your email</p>
            <p>Transaction ID: d2k5ejn0i472qj1ar4fg</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};