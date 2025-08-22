import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  CreditCard, 
  DollarSign, 
  RefreshCw, 
  CheckCircle,
  Clock,
  ArrowLeftRight
} from "lucide-react";

interface AdminViewProps {
  onReset: () => void;
}

export const AdminView = ({ onReset }: AdminViewProps) => {
  const [step, setStep] = useState<'capture' | 'captured' | 'refunded'>('capture');
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedAmount, setCapturedAmount] = useState(0);

  const handleCapture = async () => {
    setIsProcessing(true);
    
    // Simulate API call to capture
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const randomAmount = Math.floor(Math.random() * 5000) + 1000; // $10-$60
    setCapturedAmount(randomAmount);
    setStep('captured');
    setIsProcessing(false);

    // Auto proceed to refund after 3 seconds
    setTimeout(handleRefund, 3000);
  };

  const handleRefund = async () => {
    setIsProcessing(true);
    
    // Simulate API call to refund excess amount
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setStep('refunded');
    setIsProcessing(false);
  };

  useEffect(() => {
    // Auto start capture process after 2 seconds
    const timer = setTimeout(handleCapture, 2000);
    return () => clearTimeout(timer);
  }, []);

  const originalAmount = 9000; // $90.00
  const excessAmount = capturedAmount > originalAmount ? capturedAmount - originalAmount : 0;

  return (
    <div className="min-h-screen bg-gradient-bg p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-card border-payment-border bg-payment-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-payment-text">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Settings className="h-5 w-5 text-primary-foreground" />
              </div>
              Talus Payment Admin Dashboard
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Transaction Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-card border-payment-border bg-payment-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-payment-muted">Transaction Status</p>
                  <p className="text-2xl font-bold text-payment-text">Authorized</p>
                </div>
                <div className="p-3 bg-gradient-primary rounded-full">
                  <CreditCard className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-payment-border bg-payment-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-payment-muted">Original Amount</p>
                  <p className="text-2xl font-bold text-payment-text">${(originalAmount / 100).toFixed(2)}</p>
                </div>
                <div className="p-3 bg-accent rounded-full">
                  <DollarSign className="h-6 w-6 text-accent-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-payment-border bg-payment-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-payment-muted">Transaction ID</p>
                  <p className="text-lg font-mono text-payment-text">d2k5ejn0i472qj1ar4fg</p>
                </div>
                <Badge variant="outline" className="border-primary text-primary">
                  Live
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Capture Process */}
        <Card className="shadow-card border-payment-border bg-payment-card">
          <CardHeader>
            <CardTitle className="text-payment-text">Capture & Refund Process</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Capture */}
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted">
              <div className={`p-2 rounded-full ${
                step === 'capture' && isProcessing 
                  ? 'bg-primary animate-pulse' 
                  : step !== 'capture' 
                  ? 'bg-success' 
                  : 'bg-muted-foreground'
              }`}>
                {step === 'capture' && isProcessing ? (
                  <RefreshCw className="h-5 w-5 text-primary-foreground animate-spin" />
                ) : step !== 'capture' ? (
                  <CheckCircle className="h-5 w-5 text-success-foreground" />
                ) : (
                  <Clock className="h-5 w-5 text-muted" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-payment-text">
                  Step 1: Capture Payment
                </h3>
                <p className="text-sm text-payment-muted">
                  {step === 'capture' && isProcessing 
                    ? 'Capturing authorized amount...'
                    : step !== 'capture'
                    ? `Captured: $${(capturedAmount / 100).toFixed(2)}`
                    : 'Waiting to capture payment'
                  }
                </p>
              </div>
              {step !== 'capture' && (
                <Badge className="bg-success text-success-foreground">
                  Completed
                </Badge>
              )}
            </div>

            {/* Step 2: Calculate Excess */}
            {step !== 'capture' && (
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted">
                <div className={`p-2 rounded-full ${
                  step === 'captured' 
                    ? 'bg-primary' 
                    : 'bg-success'
                }`}>
                  <ArrowLeftRight className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-payment-text">
                    Step 2: Calculate Excess Amount
                  </h3>
                  <p className="text-sm text-payment-muted">
                    Captured: ${(capturedAmount / 100).toFixed(2)} | 
                    Original: ${(originalAmount / 100).toFixed(2)} | 
                    Excess: ${(excessAmount / 100).toFixed(2)}
                  </p>
                </div>
                <Badge className="bg-success text-success-foreground">
                  Calculated
                </Badge>
              </div>
            )}

            {/* Step 3: Refund Excess */}
            {step !== 'capture' && (
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted">
                <div className={`p-2 rounded-full ${
                  step === 'captured' && isProcessing
                    ? 'bg-primary animate-pulse'
                    : step === 'refunded'
                    ? 'bg-success'
                    : 'bg-primary'
                }`}>
                  {step === 'captured' && isProcessing ? (
                    <RefreshCw className="h-5 w-5 text-primary-foreground animate-spin" />
                  ) : step === 'refunded' ? (
                    <CheckCircle className="h-5 w-5 text-success-foreground" />
                  ) : (
                    <DollarSign className="h-5 w-5 text-primary-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-payment-text">
                    Step 3: Refund Excess Amount
                  </h3>
                  <p className="text-sm text-payment-muted">
                    {step === 'captured' && isProcessing
                      ? `Refunding excess amount: $${(excessAmount / 100).toFixed(2)}`
                      : step === 'refunded'
                      ? `Refunded: $${(excessAmount / 100).toFixed(2)} back to customer`
                      : `Will refund: $${(excessAmount / 100).toFixed(2)}`
                    }
                  </p>
                </div>
                {step === 'refunded' && (
                  <Badge className="bg-success text-success-foreground">
                    Completed
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Final Summary */}
        {step === 'refunded' && (
          <Card className="shadow-success border-success bg-gradient-to-r from-success/5 to-success/10">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-3 bg-gradient-success rounded-full">
                    <CheckCircle className="h-8 w-8 text-success-foreground" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-payment-text">
                  Transaction Complete!
                </h2>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  <div className="text-center">
                    <p className="text-sm text-payment-muted">Final Charge</p>
                    <p className="text-xl font-bold text-payment-text">
                      ${(originalAmount / 100).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-payment-muted">Refunded</p>
                    <p className="text-xl font-bold text-success">
                      ${(excessAmount / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={onReset}
                  className="bg-gradient-primary text-primary-foreground shadow-payment hover:shadow-lg transition-smooth"
                >
                  Start New Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};