import React from 'react';

interface EventCardProps {
  name: string;
  startTime?: string | Date;
  endTime?: string | Date;
  onClick?: () => void;
}

export default function EventCard({
  name,
  startTime,
  endTime,
  onClick,
}: EventCardProps) {
  const formatDate = (d?: string | Date) =>
    d
      ? new Date(d).toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      : undefined;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col space-y-1 rounded-lg bg-white p-4 text-left shadow transition hover:shadow-md active:shadow-sm"
    >
      <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
      {startTime && (
        <p className="text-sm text-gray-500">
          Bắt đầu: {formatDate(startTime)}
        </p>
      )}
      {endTime && (
        <p className="text-sm text-gray-500">Kết thúc: {formatDate(endTime)}</p>
      )}
    </button>
  );
}
