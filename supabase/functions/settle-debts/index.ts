import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

interface Settlement {
  from_user_id: string;
  to_user_id: string;
  amount: number;
}

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!
  );

  const { eventId } = await req.json();

  // Lấy giao dịch và phần chia
  const { data: transactions, error: txError } = await supabase
    .from('transactions')
    .select('id, payer_id, amount')
    .eq('event_id', eventId);

  const { data: splits, error: splitError } = await supabase
    .from('transaction_splits')
    .select('transaction_id, user_id, amount')
    .eq('event_id', eventId);

  if (txError || splitError) {
    return new Response(JSON.stringify({ error: 'Không lấy được dữ liệu' }), { status: 500 });
  }

  // Tính số dư ròng
  const balances: { [userId: string]: number } = {};
  transactions.forEach((tx) => {
    balances[tx.payer_id] = (balances[tx.payer_id] || 0) + tx.amount;
  });
  splits.forEach((split) => {
    balances[split.user_id] = (balances[split.user_id] || 0) - split.amount;
  });

  // Tạo danh sách thanh toán nợ
  const settlements: Settlement[] = [];
  const debtors = Object.entries(balances)
    .filter(([_, balance]) => balance < 0) // eslint-disable-line @typescript-eslint/no-unused-vars
    .sort((a, b) => a[1] - b[1]);
  const creditors = Object.entries(balances)
    .filter(([_, balance]) => balance > 0) // eslint-disable-line @typescript-eslint/no-unused-vars
    .sort((a, b) => b[1] - a[1]);

  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const [debtorId, debtorAmount] = debtors[i];
    const [creditorId, creditorAmount] = creditors[j];
    const amount = Math.min(-debtorAmount, creditorAmount);
    settlements.push({
      from_user_id: debtorId,
      to_user_id: creditorId,
      amount,
    });
    debtors[i][1] += amount;
    creditors[j][1] -= amount;
    if (debtors[i][1] === 0) i++;
    if (creditors[j][1] === 0) j++;
  }

  // Lưu kết quả thanh toán
  const { error: settlementError } = await supabase
    .from('settlements')
    .insert(settlements.map(s => ({ ...s, event_id: eventId })));

  if (settlementError) {
    return new Response(JSON.stringify({ error: 'Không lưu được kết quả thanh toán' }), { status: 500 });
  }

  return new Response(JSON.stringify(settlements), { status: 200 });
});
