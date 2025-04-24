
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TierInfo {
  name: string;
  description: string;
  requiredPoints: number;
  benefits: string[];
  color: string;
}

const tiers: TierInfo[] = [
  {
    name: "Bronze",
    description: "Start your journey with basic benefits",
    requiredPoints: 0,
    benefits: ["Basic support", "Standard delivery", "Newsletter access"],
    color: "bg-amber-600"
  },
  {
    name: "Silver",
    description: "Unlock premium features and rewards",
    requiredPoints: 1000,
    benefits: ["Priority support", "Free delivery", "Exclusive deals", "Early access"],
    color: "bg-gray-400"
  },
  {
    name: "Gold",
    description: "Experience VIP treatment and maximum benefits",
    requiredPoints: 5000,
    benefits: ["24/7 VIP support", "Same-day delivery", "Special events", "Custom orders", "Loyalty bonus"],
    color: "bg-yellow-400"
  }
];

interface CustomerTiersProps {
  currentPoints: number;
}

const CustomerTiers = ({ currentPoints }: CustomerTiersProps) => {
  const currentTier = tiers.reduce((prev, curr) => {
    return currentPoints >= curr.requiredPoints ? curr : prev;
  }, tiers[0]);

  const nextTier = tiers[tiers.indexOf(currentTier) + 1];
  const progress = nextTier 
    ? ((currentPoints - currentTier.requiredPoints) / (nextTier.requiredPoints - currentTier.requiredPoints)) * 100
    : 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Star className={`h-6 w-6 ${currentTier.color} text-white rounded-full p-1`} />
        <div>
          <h3 className="font-semibold">{currentTier.name} Member</h3>
          <p className="text-sm text-muted-foreground">
            {nextTier 
              ? `${nextTier.requiredPoints - currentPoints} points until ${nextTier.name}`
              : "Maximum tier achieved!"}
          </p>
        </div>
      </div>

      {nextTier && (
        <Progress value={progress} className="h-2" />
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {tiers.map((tier) => (
          <Card key={tier.name} className={currentTier.name === tier.name ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className={`h-5 w-5 ${tier.color} text-white rounded-full p-1`} />
                {tier.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{tier.description}</p>
              <p className="text-sm font-medium">{tier.requiredPoints} points required</p>
              <ul className="text-sm space-y-1">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2">
                    <Star className="h-3 w-3" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomerTiers;
