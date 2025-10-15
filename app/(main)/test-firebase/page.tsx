'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, serverTimestamp, DocumentData } from 'firebase/firestore';

interface TestResult {
  id: string;
  message: string;
}

export default function TestFirebase() {
  const [status, setStatus] = useState('Menguji koneksi...');
  const [testData, setTestData] = useState('');
  const [testResults, setTestResults] = useState<TestResult[]>([]);

  const handleError = (error: unknown, defaultMessage: string): string => {
    if (error instanceof Error) {
      return error.message;
    }
    return typeof error === 'string' ? error : defaultMessage;
  };

  const testRead = async (): Promise<DocumentData[]> => {
    try {
      setTestResults(prev => [...prev, {
        id: Date.now().toString(),
        message: '🔍 Membaca data dari Firestore...'
      }]);
      
      const querySnapshot = await getDocs(collection(db, 'test'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setTestResults(prev => [...prev, {
        id: Date.now().toString(),
        message: `📖 Data yang dibaca: ${JSON.stringify(data, null, 2)}`
      }]);
      
      return data;
    } catch (error: unknown) {
      const errorMessage = handleError(error, 'Gagal membaca data');
      const newError = error instanceof Error ? error : new Error(errorMessage);
      setTestResults(prev => [...prev, {
        id: Date.now().toString(),
        message: `❌ ${errorMessage}`
      }]);
      throw newError;
    }
  };

  const testWrite = async (): Promise<string> => {
    try {
      const testMessage = testData || `Test data dari Next.js ${new Date().toISOString()}`;
      
      setTestResults(prev => [...prev, {
        id: Date.now().toString(),
        message: '✍️ Menulis data ke Firestore...'
      }]);
      
      const docRef = await addDoc(collection(db, 'test'), {
        message: testMessage,
        timestamp: serverTimestamp()
      });
      
      setTestResults(prev => [...prev, {
        id: Date.now().toString(),
        message: `✅ Data berhasil disimpan dengan ID: ${docRef.id}`
      }]);
      
      return docRef.id;
    } catch (error: unknown) {
      const errorMessage = handleError(error, 'Gagal menulis data');
      const newError = error instanceof Error ? error : new Error(errorMessage);
      setTestResults(prev => [...prev, {
        id: Date.now().toString(),
        message: `❌ ${errorMessage}`
      }]);
      throw newError;
    }
  };

  useEffect(() => {
    const testConnection = async () => {
      try {
        setStatus('🔄 Menghubungkan ke Firebase...');
        await testRead();
        await testWrite();
        await testRead();
        setStatus('✅ Koneksi berhasil!');
      } catch (error: unknown) {
        const errorMessage = handleError(error, 'Terjadi kesalahan saat menguji koneksi');
        console.error('Error:', error);
        setStatus(`❌ ${errorMessage}`);
      }
    };

    testConnection();
  }, []);

  const handleTestWrite = async () => {
    try {
      await testWrite();
      await testRead();
    } catch (error) {
      console.error('Test error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">🔥 Firebase Connection Tester</h1>
        
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="font-semibold mb-2">Status Koneksi:</h2>
          <div className="p-3 bg-white rounded border border-gray-200">
            {status || 'Memeriksa...'}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold mb-2">Test Data (opsional):</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={testData}
              onChange={(e) => setTestData(e.target.value)}
              placeholder="Ketik pesan test..."
              className="flex-1 p-2 border rounded"
              onKeyDown={(e) => e.key === 'Enter' && handleTestWrite()}
            />
            <button
              onClick={handleTestWrite}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Test Tulis Data
            </button>
          </div>
        </div>

        <div className="border-t pt-4">
          <h2 className="font-semibold mb-2">Hasil Test:</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto p-2 bg-gray-50 rounded">
            {testResults.length === 0 ? (
              <p className="text-gray-500">Menjalankan test...</p>
            ) : (
              testResults.map((result) => (
                <div 
                  key={result.id} 
                  className={`p-2 rounded border text-sm font-mono ${
                    result.message.startsWith('❌') 
                      ? 'bg-red-50 border-red-200 text-red-700' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  {result.message}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
