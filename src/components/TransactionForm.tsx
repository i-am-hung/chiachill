import React from 'react';

interface TransactionFormProps {
  onSubmit?: (data: unknown) => void;
}

export default function TransactionForm({ onSubmit }: TransactionFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: collect form data & invoke onSubmit
    if (onSubmit) onSubmit({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Payer */}
      <div>
        <label
          className="mb-1 block text-sm font-medium text-gray-700"
          htmlFor="payer"
        >
          Người trả
        </label>
        <select
          id="payer"
          className="focus:ring-primary w-full rounded-lg border-gray-300 p-3 focus:outline-none focus:ring-2"
          disabled
        >
          <option>Coming soon</option>
        </select>
      </div>

      {/* Amount */}
      <div>
        <label
          className="mb-1 block text-sm font-medium text-gray-700"
          htmlFor="amount"
        >
          Số tiền
        </label>
        <input
          id="amount"
          type="number"
          className="focus:ring-primary w-full rounded-lg border-gray-300 p-3 focus:outline-none focus:ring-2"
          placeholder="0"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label
          className="mb-1 block text-sm font-medium text-gray-700"
          htmlFor="desc"
        >
          Mô tả
        </label>
        <input
          id="desc"
          className="focus:ring-primary w-full rounded-lg border-gray-300 p-3 focus:outline-none focus:ring-2"
          placeholder="Ví dụ: Mua đồ ăn vặt"
        />
      </div>

      {/* Split method placeholder */}
      <div>
        <p className="mb-1 text-sm font-medium text-gray-700">Chia tiền</p>
        <div className="flex gap-4">
          <label className="inline-flex items-center">
            <input type="radio" name="split" value="even" defaultChecked />
            <span className="ml-2">Đều</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" name="split" value="custom" disabled />
            <span className="ml-2">Tùy chỉnh</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="bg-primary text-primary-foreground w-full rounded-lg py-3 font-medium"
      >
        Lưu giao dịch
      </button>
    </form>
  );
}
