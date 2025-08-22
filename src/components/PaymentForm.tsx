import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, Lock, ShieldCheck } from "lucide-react";

interface PaymentFormProps {
  onSubmit: (paymentData: PaymentData) => void;
  isProcessing: boolean;
}

export interface PaymentData {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  billingAddress?: {
    firstName: string;
    lastName: string;
    addressLine1: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

export const PaymentForm = ({ onSubmit, isProcessing }: PaymentFormProps) => {
  const [showBilling, setShowBilling] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    firstName: "",
    lastName: "",
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const paymentData: PaymentData = {
      cardNumber: formData.cardNumber,
      expirationDate: formData.expirationDate,
      cvv: formData.cvv,
    };

    if (showBilling) {
      paymentData.billingAddress = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        addressLine1: formData.addressLine1,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
      };
    }

    onSubmit(paymentData);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpirationDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-card border-payment-border bg-payment-card">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-primary rounded-full">
              <CreditCard className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-payment-text">
            Secure Payment
          </CardTitle>
          <div className="flex items-center justify-center gap-2 text-sm text-payment-muted">
            <Lock className="h-4 w-4" />
            <span>256-bit SSL encrypted</span>
            <ShieldCheck className="h-4 w-4" />
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber" className="text-payment-text font-medium">
                  Card Number
                </Label>
                <Input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({
                    ...formData,
                    cardNumber: formatCardNumber(e.target.value)
                  })}
                  maxLength={19}
                  className="mt-1 bg-payment-input border-payment-border focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiration" className="text-payment-text font-medium">
                    Expiry Date
                  </Label>
                  <Input
                    id="expiration"
                    type="text"
                    placeholder="MM/YY"
                    value={formData.expirationDate}
                    onChange={(e) => setFormData({
                      ...formData,
                      expirationDate: formatExpirationDate(e.target.value)
                    })}
                    maxLength={5}
                    className="mt-1 bg-payment-input border-payment-border focus:ring-primary focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="cvv" className="text-payment-text font-medium">
                    CVV
                  </Label>
                  <Input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => setFormData({
                      ...formData,
                      cvv: e.target.value.replace(/[^0-9]/g, '')
                    })}
                    maxLength={4}
                    className="mt-1 bg-payment-input border-payment-border focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="billing"
                checked={showBilling}
                onCheckedChange={(checked) => setShowBilling(!!checked)}
              />
              <Label
                htmlFor="billing"
                className="text-sm text-payment-text cursor-pointer"
              >
                Add billing address (optional)
              </Label>
            </div>

            {showBilling && (
              <div className="space-y-4 p-4 bg-muted rounded-lg border border-payment-border">
                <h3 className="font-medium text-payment-text">Billing Address</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-payment-text">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({
                        ...formData,
                        firstName: e.target.value
                      })}
                      className="mt-1 bg-payment-input border-payment-border"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName" className="text-payment-text">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({
                        ...formData,
                        lastName: e.target.value
                      })}
                      className="mt-1 bg-payment-input border-payment-border"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address" className="text-payment-text">
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({
                      ...formData,
                      addressLine1: e.target.value
                    })}
                    className="mt-1 bg-payment-input border-payment-border"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-payment-text">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({
                        ...formData,
                        city: e.target.value
                      })}
                      className="mt-1 bg-payment-input border-payment-border"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="state" className="text-payment-text">
                      State
                    </Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData({
                        ...formData,
                        state: e.target.value
                      })}
                      className="mt-1 bg-payment-input border-payment-border"
                    />
                  </div>

                  <div>
                    <Label htmlFor="postal" className="text-payment-text">
                      ZIP Code
                    </Label>
                    <Input
                      id="postal"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({
                        ...formData,
                        postalCode: e.target.value
                      })}
                      className="mt-1 bg-payment-input border-payment-border"
                    />
                  </div>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-primary text-primary-foreground font-semibold py-3 shadow-payment hover:shadow-lg transition-smooth disabled:opacity-50"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                  Processing Payment...
                </div>
              ) : (
                "Pay $90.00"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};