'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Input, Button, Card } from '@heroui/react';
import { FiMail, FiLock } from 'react-icons/fi';
import { addToast } from '@heroui/react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    setLoading(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (signInError) {
      setError(signInError.message);
      addToast({ title: signInError.message, color: 'danger' });
    } else {
      addToast({ title: 'Đăng nhập thành công', color: 'success' });
      router.push('/');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/20 to-white p-4"
    >
      <Card className="w-full max-w-md space-y-6 p-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Đăng nhập</h1>
          <p className="text-sm text-gray-500">
            Theo dõi chi tiêu cùng bạn bè!
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <FiMail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full pl-10"
            />
          </div>
          {/* Password */}
          <div className="relative">
            <FiLock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
            <Input
              name="password"
              type="password"
              placeholder="Mật khẩu"
              required
              className="w-full pl-10"
            />
          </div>
          {error && (
            <p className="text-center text-sm text-rose-500">{error}</p>
          )}
          <Button
            type="submit"
            className="w-full rounded-xl bg-primary py-3 text-lg text-white transition-colors hover:bg-primary/90 focus:ring-4 focus:ring-primary/30"
            disabled={loading}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Chưa có tài khoản?{' '}
          <a
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Đăng ký
          </a>
        </p>
      </Card>
    </motion.div>
  );
}
