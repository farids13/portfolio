'use client';

import { logEvent } from 'firebase/analytics';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import type { Analytics} from 'firebase/analytics';
import type { DocumentData } from 'firebase/firestore';

import { trackError, trackEvent } from '@/lib/errorTracking';
import { db } from '@/lib/firebase';



interface TestResult {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'error' | 'warning';
}

export default function TestFirebase() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [analytics, setAnalytics] = useState<unknown>(null);

  // Initialize analytics
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('firebase/analytics').then(({ getAnalytics }) => {
        const analytics = getAnalytics();
        setAnalytics(analytics);
        logEvent(analytics, 'page_view', { page_title: 'Test Firebase' });
      }).catch(console.error);
    }
  }, []);

  const addTestResult = (message: string, type: TestResult['type'] = 'info') => {
    const result = {
      id: Date.now().toString(),
      message,
      type
    };
    setTestResults(prev => [...prev, result]);
    return result;
  };

  const handleError = (error: unknown, defaultMessage: string): string => {
    const errorMessage = error instanceof Error ? error.message : 
                        typeof error === 'string' ? error : defaultMessage;
    
    addTestResult(`❌ ${errorMessage}`, 'error');
    trackError(error instanceof Error ? error : new Error(errorMessage), {
      location: 'test-firebase',
      action: 'handleError'
    });
    
    return errorMessage;
  };

  // Test Firestore Read
  const testRead = async (): Promise<DocumentData[]> => {
    try {
      addTestResult('🔍 Membaca data dari Firestore...');
      trackEvent('button_click', { action: 'test_read_start' });
      
      const startTime = Date.now();
      const querySnapshot = await getDocs(collection(db, 'test'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      const duration = Date.now() - startTime;
      addTestResult(`📖 Berhasil membaca ${data.length} dokumen (${duration}ms)`, 'success');
      
      trackEvent('button_click', {
        action: 'test_read_success',
        count: data.length,
        duration
      });
      
      return data;
    } catch (error: unknown) {
      const errorMessage = handleError(error, 'Gagal membaca data');
      trackEvent('error_occurred', { 
        action: 'test_read_error',
        error: errorMessage 
      });
      throw new Error(errorMessage);
    }
  };

  // Test Firestore Write
  const testWrite = async () => {
    try {
      addTestResult('✍️ Menulis data ke Firestore...');
      trackEvent('button_click', { action: 'test_write_start' });
      
      const docRef = await addDoc(collection(db, 'test'), {
        message: 'Test data ' + new Date().toISOString(),
        timestamp: serverTimestamp()
      });
      
      addTestResult(`✅ Data berhasil ditulis dengan ID: ${docRef.id}`, 'success');
      trackEvent('button_click', { 
        action: 'test_write_success',
        docId: docRef.id 
      });
      
      return docRef;
    } catch (error: unknown) {
      const errorMessage = handleError(error, 'Gagal menulis data');
      trackEvent('error_occurred', { 
        action: 'test_write_error',
        error: errorMessage 
      });
      throw new Error(errorMessage);
    }
  };

  // Simulate a crash
  const simulateCrash = () => {
    addTestResult('💥 Simulasi crash dimulai...', 'warning');
    trackEvent('button_click', { action: 'simulate_crash_clicked' });
    
    // This will cause an unhandled exception
    // @ts-ignore - Intentionally causing an error
    const willCrash = null.someMethod();
    console.error(willCrash); // This line will never be reached
  };

  // Test Analytics
  const testAnalytics = () => {
    if (!analytics) {
      addTestResult('Analytics belum diinisialisasi', 'warning');
      return;
    }
    
    try {
      const eventName = 'test_event_' + Math.floor(Math.random() * 1000);
      logEvent(analytics as unknown as Analytics, eventName, {
        test_param: 'test_value',
        timestamp: new Date().toISOString()
      });
      
      addTestResult(`📊 Event analytics terkirim: ${eventName}`, 'success');
      trackEvent('button_click', { 
        action: 'test_analytics_event',
        eventName 
      });
    } catch (error) {
      handleError(error, 'Gagal mengirim event analytics');
    }
  };

  // Run all tests
  const runAllTests = async () => {
    setTestResults([]);
    try {
      await testWrite();
      await testRead();
      testAnalytics();
    } catch (error) {
      console.error('Test failed:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🔥 Firebase Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={runAllTests}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          🚀 Jalankan Semua Test
        </button>
        
        <button
          onClick={testRead}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          📖 Test Baca Data
        </button>
        
        <button
          onClick={testWrite}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          ✍️ Test Tulis Data
        </button>
        
        <button
          onClick={testAnalytics}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
        >
          📊 Test Analytics
        </button>
        
        <button
          onClick={simulateCrash}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded col-span-full"
        >
          💥 Simulasikan Crash
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Hasil Test:</h2>
        <div className="bg-gray-100 p-4 rounded-md max-h-96 overflow-y-auto">
          {testResults.length === 0 ? (
            <p className="text-gray-500">Belum ada hasil test. Klik tombol di atas untuk memulai.</p>
          ) : (
            <ul className="space-y-2">
              {testResults.map((result) => (
                <li 
                  key={result.id} 
                  className={`p-2 rounded ${
                    result.type === 'error' ? 'bg-red-100 text-red-800' :
                    result.type === 'success' ? 'bg-green-100 text-green-800' :
                    result.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-white'
                  }`}
                >
                  {result.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}