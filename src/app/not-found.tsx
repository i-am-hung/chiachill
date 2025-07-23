import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-primary text-6xl font-bold">404</h1>
      <p className="mt-4 text-lg text-gray-600">
        Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.
      </p>
      <Link
        href="/"
        className="bg-primary hover:bg-primary/90 mt-8 inline-block rounded-md px-6 py-3 text-white shadow transition-colors"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
}
