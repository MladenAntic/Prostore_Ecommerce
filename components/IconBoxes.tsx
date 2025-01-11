import { DollarSign, Headset, ShoppingBag, WalletCards } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const iconBoxes = [
  {
    Icon: ShoppingBag,
    title: "Free Shipping",
    description: "Free shipping on orders above $100",
  },
  {
    Icon: DollarSign,
    title: "Money Back Guarantee",
    description: "Within 30 days of purchase",
  },
  {
    Icon: WalletCards,
    title: "Flexible Payment",
    description: "Pay with credit card, PayPal or COD",
  },
  {
    Icon: Headset,
    title: "24/7 Support",
    description: "Get support at any time",
  },
];

export const IconBoxes = () => {
  return (
    <div>
      <Card>
        <CardContent className="grid gap-4 p-4 md:grid-cols-4">
          {iconBoxes.map(({ Icon, title, description }) => (
            <div key={title} className="space-y-2">
              <Icon />
              <div className="text-sm font-bold">{title}</div>
              <div className="text-sm text-muted-foreground">{description}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
