"use client";

import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { FaDownload, FaSpinner } from 'react-icons/fa';
import * as XLSX from 'xlsx';

import { db } from '@/lib/firebase';

interface Comment {
  id: string;
  name: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdAt: any;
  isApproved: boolean;
  likes: number;
}

export default function DatabaseMonitor() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const commentsRef = collection(db, 'comments');
      const q = query(commentsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const commentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[];

      setComments(commentsData);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToJson = () => {
    const dataStr = JSON.stringify(comments, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `comments-${new Date().toISOString()}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const exportToExcel = () => {
    setExporting(true);
    try {
      // Format data untuk Excel
      const formattedData = comments.map((comment, index) => {
        let formattedDate = '-';
        if (comment.createdAt) {
          try {
            // Jika createdAt adalah object dengan seconds (Firestore Timestamp)
            if (typeof comment.createdAt === 'object' && 'seconds' in comment.createdAt) {
              formattedDate = new Date(comment.createdAt.seconds * 1000).toLocaleString('id-ID');
            } 
            // Jika createdAt adalah string tanggal
            else if (typeof comment.createdAt === 'string') {
              formattedDate = new Date(comment.createdAt).toLocaleString('id-ID');
            }
          } catch (e) {
            console.warn('Error formatting date:', e);
          }
        }

        return {
          'No': index + 1,
          'ID': comment.id || '-',
          'Nama': comment.name?.trim() || '-',
          'Pesan': comment.message?.trim() || '-',
          'Tanggal': formattedDate,
          'Likes': comment.likes ?? 0, // Default ke 0 jika undefined/null
          'Status': comment.isApproved ? 'Disetujui' : 'Menunggu'
        };
      });

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Komentar');

      // Generate Excel file
      XLSX.writeFile(workbook, `komentar-${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
    } finally {
      setExporting(false);
    }
  };

  const formatDate = (timestamp: { seconds: number; nanoseconds: number } | undefined) => {
    if (!timestamp) { return '-'; }
    return new Date(timestamp.seconds * 1000).toLocaleString();
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Monitoring Komentar</h1>
              <p className="text-sm text-gray-500 mt-1">
                Kelola dan ekspor data komentar dari Firestore
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportToJson}
                disabled={loading || comments.length === 0}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaDownload className="mr-2" />
                Export JSON
              </button>
              <button
                onClick={exportToExcel}
                disabled={loading || comments.length === 0 || exporting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {exporting ? (
                  <>
                    <FaSpinner className="mr-2 animate-spin" />
                    Mengekspor...
                  </>
                ) : (
                  <>
                    <FaDownload className="mr-2" />
                    Export Excel
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <FaSpinner className="h-8 w-8 animate-spin text-indigo-600" />
              <span className="ml-2">Memuat data...</span>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Tidak ada data komentar yang ditemukan.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Lengkap</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Komentar</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Likes</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {comments.map((comment, index) => (
                    <tr key={comment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1 || '-'}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {comment.id || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {comment.name || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                        {comment.message || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(comment.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {comment.likes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
