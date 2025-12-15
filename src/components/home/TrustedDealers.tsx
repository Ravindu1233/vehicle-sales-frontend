import { CheckCircle } from "lucide-react";

const dealers = [
  { name: "AutoNation", logo: "A" },
  { name: "CarMax", logo: "C" },
  { name: "Penske", logo: "P" },
  { name: "Sonic", logo: "S" },
  { name: "Lithia", logo: "L" },
  { name: "Group 1", logo: "G" },
];

export function TrustedDealers() {
  return (
    <section className="py-20 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-success font-medium text-sm">
            <CheckCircle className="w-4 h-4" />
            Verified Partners
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-foreground">
            Trusted by Leading Dealerships
          </h2>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {dealers.map((dealer) => (
            <div
              key={dealer.name}
              className="group flex flex-col items-center justify-center p-6 rounded-xl bg-muted/50 border border-transparent hover:border-accent/20 hover:bg-accent/5 transition-all cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-accent/10 transition-colors">
                <span className="text-2xl font-bold text-primary group-hover:text-accent transition-colors">
                  {dealer.logo}
                </span>
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {dealer.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
