import { useState } from "react";
import { PaymentForm, type PaymentData } from "@/components/PaymentForm";
import { SuccessScreen } from "@/components/SuccessScreen";
import { AdminView } from "@/components/AdminView";
import { useToast } from "@/hooks/use-toast";

type DemoStep = 'payment' | 'processing' | 'success' | 'admin';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<DemoStep>('payment');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePaymentSubmit = async (paymentData: PaymentData) => {
    setIsProcessing(true);
    
    try {
      // Simulate API call to backend
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock successful response
      toast({
        title: "Payment Authorized",
        description: "Transaction has been authorized successfully",
        variant: "default",
      });
      
      setCurrentStep('success');
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSuccessComplete = () => {
    setCurrentStep('admin');
  };

  const handleReset = () => {
    setCurrentStep('payment');
    setIsProcessing(false);
  };

  return (
    <>
      {currentStep === 'payment' && (
        <PaymentForm 
          onSubmit={handlePaymentSubmit} 
          isProcessing={isProcessing}
        />
      )}
      
      {currentStep === 'success' && (
        <SuccessScreen onComplete={handleSuccessComplete} />
      )}
      
      {currentStep === 'admin' && (
        <AdminView onReset={handleReset} />
      )}
    </>
  );
};

export default Index;