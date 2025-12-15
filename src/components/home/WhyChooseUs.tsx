import { Shield, Layers, BadgeDollarSign, Clock, Headphones, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "AI Fraud Detection",
    description: "Our advanced AI algorithms scan every listing to detect potential fraud, ensuring you only see legitimate offers.",
  },
  {
    icon: Layers,
    title: "Aggregated Listings",
    description: "Search across dealerships, Facebook Marketplace, Craigslist, and private sellers in one unified platform.",
  },
  {
    icon: BadgeDollarSign,
    title: "Best Price Guarantee",
    description: "Compare prices across all sources to ensure you're getting the best deal on your next vehicle.",
  },
  {
    icon: Clock,
    title: "Real-Time Updates",
    description: "Get instant alerts when new listings match your search criteria or prices drop on saved vehicles.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our dedicated support team is available around the clock to help with any questions or concerns.",
  },
  {
    icon: Award,
    title: "Verified Dealers",
    description: "All dealerships are verified and reviewed to ensure quality service and authentic listings.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground">
            The Smarter Way to Find Your Next Vehicle
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We combine cutting-edge technology with comprehensive coverage to make your car-buying experience seamless and secure.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl bg-card border border-border card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
