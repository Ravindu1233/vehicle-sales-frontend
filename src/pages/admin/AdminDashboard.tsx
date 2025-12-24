import { Car, Users, CheckCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "Total Listings", value: "128", icon: Car, color: "text-accent" },
  { label: "Total Users", value: "1,024", icon: Users, color: "text-primary" },
  { label: "Pending Approval", value: "8", icon: Clock, color: "text-warning" },
  { label: "Approved", value: "112", icon: CheckCircle, color: "text-success" },
  { label: "Rejected", value: "8", icon: XCircle, color: "text-destructive" },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of platform statistics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { action: "New listing submitted", user: "John Doe", time: "2 minutes ago" },
              { action: "User registered", user: "Jane Smith", time: "15 minutes ago" },
              { action: "Listing approved", user: "Admin", time: "1 hour ago" },
              { action: "Listing rejected", user: "Admin", time: "2 hours ago" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">by {activity.user}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">
              Use the sidebar to navigate to Listings or Users management.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Car className="w-4 h-4 text-accent" />
                <span>Review pending listings in the Listings section</span>
              </li>
              <li className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>View user details in the Users section</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
