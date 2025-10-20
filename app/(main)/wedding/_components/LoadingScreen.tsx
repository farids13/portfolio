'use client';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-red-500 mx-auto"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">Loading Wedding Invitation...</p>
      </div>
    </div>
  );
}
