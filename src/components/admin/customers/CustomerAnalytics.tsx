
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { useAdminStore } from '@/stores/adminStore';

const CustomerAnalytics = () => {
  const { customerSegments } = useAdminStore();

  const customerGrowthData = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2024, i, 1).toLocaleDateString('en-US', { month: 'short' }),
    newCustomers: Math.floor(Math.random() * 200) + 50,
    returningCustomers: Math.floor(Math.random() * 150) + 30,
  }));

  const loyaltyData = [
    { name: 'New (0 orders)', value: 35, color: '#ef4444' },
    { name: 'Regular (1-3 orders)', value: 45, color: '#f59e0b' },
    { name: 'Loyal (4-10 orders)', value: 15, color: '#10b981' },
    { name: 'VIP (10+ orders)', value: 5, color: '#8b5cf6' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Customer Growth</CardTitle>
          <CardDescription>New vs returning customers over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={customerGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="newCustomers" fill="#10b981" name="New Customers" />
              <Bar dataKey="returningCustomers" fill="#3b82f6" name="Returning Customers" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Loyalty Distribution</CardTitle>
          <CardDescription>Customer segments by order frequency</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={loyaltyData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {loyaltyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerAnalytics;
