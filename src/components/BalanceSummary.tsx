import React from 'react';

interface DebtItem {
  from: string;
  to: string;
  amount: number;
}

interface BalanceSummaryProps {
  debts: DebtItem[];
}

export default function BalanceSummary({ debts }: BalanceSummaryProps) {
  if (!debts.length) {
    return <p className="text-center text-gray-500">Chưa có dữ liệu nợ.</p>;
  }

  return (
    <div className="space-y-2 rounded-lg bg-white p-4 shadow">
      <h4 className="mb-2 text-lg font-semibold text-gray-800">Kết quả nợ</h4>
      {debts.map((d, idx) => (
        <div key={idx} className="flex justify-between text-gray-700">
          <span>
            {d.from} nợ {d.to}
          </span>
          <span className="text-secondary font-medium">
            {d.amount.toLocaleString('vi-VN')} VND
          </span>
        </div>
      ))}
    </div>
  );
}
