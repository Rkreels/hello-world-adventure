
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import StatsCard from '@/components/admin/transactions/StatsCard';
import PaymentMethodCard from '@/components/admin/transactions/PaymentMethodCard';
import TransactionTable from '@/components/admin/transactions/TransactionTable';

const Transactions = () => {
  // Data for statistics cards
  const statsCards = [
    {
      title: 'Total Revenue',
      value: '$15,045',
      percentage: '+14.4%',
      period: 'Last 7 days'
    },
    {
      title: 'Completed Transactions',
      value: '3,150',
      percentage: '+20%',
      period: 'Last 7 days'
    },
    {
      title: 'Pending Transactions',
      value: '150',
      percentage: '85%',
      period: 'Last 7 days'
    },
    {
      title: 'Failed Transactions',
      value: '75',
      percentage: '15%',
      period: 'Last 7 days',
      percentageDown: true
    }
  ];

  // Payment method data
  const paymentMethod = {
    type: 'Finocut',
    number: '2345',
    status: 'Active',
    transactions: '1,250',
    revenue: '$50,000'
  };

  // Transaction data
  const transactions = [
    { id: '#CUST001', name: 'John Doe', date: '01-01-2025', total: '$2,904', method: 'CC', status: 'Complete' },
    { id: '#CUST001', name: 'John Doe', date: '01-01-2025', total: '$2,904', method: 'PayPal', status: 'Complete' },
    { id: '#CUST001', name: 'John Doe', date: '01-01-2025', total: '$2,904', method: 'CC', status: 'Complete' },
    { id: '#CUST001', name: 'John Doe', date: '01-01-2025', total: '$2,904', method: 'Bank', status: 'Complete' },
    { id: '#CUST001', name: 'Jane Smith', date: '01-01-2025', total: '$2,904', method: 'CC', status: 'Canceled' },
    { id: '#CUST001', name: 'Emily Davis', date: '01-01-2025', total: '$2,904', method: 'PayPal', status: 'Pending' },
    { id: '#CUST001', name: 'Jane Smith', date: '01-01-2025', total: '$2,904', method: 'Bank', status: 'Canceled' },
    { id: '#CUST001', name: 'John Doe', date: '01-01-2025', total: '$2,904', method: 'CC', status: 'Complete' },
    { id: '#CUST001', name: 'Emily Davis', date: '01-01-2025', total: '$2,904', method: 'PayPal', status: 'Pending' },
    { id: '#CUST001', name: 'Jane Smith', date: '01-01-2025', total: '$2,904', method: 'Bank', status: 'Canceled' }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Transaction</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statsCards.map((card, index) => (
          <StatsCard key={index} {...card} />
        ))}
      </div>
      
      {/* Payment Method Card */}
      <PaymentMethodCard {...paymentMethod} />
      
      {/* Transactions Table */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <TransactionTable transactions={transactions} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
