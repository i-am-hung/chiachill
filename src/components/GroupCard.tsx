import React from 'react';

interface GroupCardProps {
  name: string;
  code: string;
  memberCount?: number;
  onClick?: () => void;
}

export default function GroupCard({
  name,
  code,
  memberCount,
  onClick,
}: GroupCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col space-y-1 rounded-lg bg-white p-4 text-left shadow transition hover:shadow-md active:shadow-sm"
    >
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-500">Mã nhóm: {code}</p>
      {memberCount !== undefined && (
        <p className="text-sm text-gray-500">{memberCount} thành viên</p>
      )}
    </button>
  );
}
