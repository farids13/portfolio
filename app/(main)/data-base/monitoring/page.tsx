"use client";

import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { FaDownload, FaSpinner } from 'react-icons/fa';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
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

interface RSVP {
  id: string;
  name: string;
  guestCount: number;
  status: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submittedAt: any;
  ipAddress?: string;
  userAgent?: string;
}

interface TrackingEvent {
  id: string;
  eventType: string;
  guestName: string;
  valueView: number;
  sessionId: string;
  pageUrl: string;
  userAgent: string;
  screenWidth: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  timestamp: any;
  entryTime: string;
}

// Mapping label ke status ID
const labelToStatusId: Record<string, string> = {
  'Hadir': 'hadir',
  'Tidak Hadir': 'tidak-hadir',
  'Belum Tahu': 'belum-tau'
};

export default function DatabaseMonitor() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [trackingEvents, setTrackingEvents] = useState<TrackingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [activeTab, setActiveTab] = useState<'comments' | 'rsvp' | 'tracking'>('comments');

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchComments(),
          fetchRsvps(),
          fetchTrackingEvents()
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const fetchComments = async () => {
    try {
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
    }
  };

  const fetchRsvps = async () => {
    try {
      const rsvpsRef = collection(db, 'wedding_rsvps');
      const q = query(rsvpsRef, orderBy('submittedAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const rsvpsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as RSVP[];

      setRsvps(rsvpsData);
    } catch (error) {
      console.error('Error fetching RSVPs:', error);
    }
  };

  const fetchTrackingEvents = async () => {
    try {
      const trackingRef = collection(db, 'tracking');
      const q = query(trackingRef, orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);

      const trackingData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as TrackingEvent[];

      setTrackingEvents(trackingData);
    } catch (error) {
      console.error('Error fetching tracking events:', error);
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
      if (activeTab === 'tracking') {
        // Format data tracking untuk Excel
        const formattedData = trackingEvents.map((event, index) => {
          let formattedDate = '-';
          if (event.timestamp) {
            try {
              if (typeof event.timestamp === 'object' && 'seconds' in event.timestamp) {
                formattedDate = new Date(event.timestamp.seconds * 1000).toLocaleString('id-ID');
              } else if (typeof event.timestamp === 'string') {
                formattedDate = new Date(event.timestamp).toLocaleString('id-ID');
              }
            } catch (e) {
              console.warn('Error formatting date:', e);
            }
          }

          return {
            'No': index + 1,
            'ID': event.id || '-',
            'Nama Tamu': event.guestName || '-',
            'Event Type': event.eventType || '-',
            'Value/View': event.valueView || 0,
            'Session ID': event.sessionId || '-',
            'Tanggal': formattedDate,
            'Screen Width': event.screenWidth || '-'
          };
        });

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Tracking');
        XLSX.writeFile(workbook, `tracking-${new Date().toISOString().split('T')[0]}.xlsx`);
      } else if (activeTab === 'comments') {
        // Format data komentar untuk Excel
        const formattedData = comments.map((comment, index) => {
          let formattedDate = '-';
          if (comment.createdAt) {
            try {
              if (typeof comment.createdAt === 'object' && 'seconds' in comment.createdAt) {
                formattedDate = new Date(comment.createdAt.seconds * 1000).toLocaleString('id-ID');
              } else if (typeof comment.createdAt === 'string') {
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
            'Likes': comment.likes ?? 0,
            'Status': comment.isApproved ? 'Disetujui' : 'Menunggu'
          };
        });

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Komentar');
        XLSX.writeFile(workbook, `komentar-${new Date().toISOString().split('T')[0]}.xlsx`);
      } else {
        // Format data RSVP untuk Excel
        const formattedData = rsvps.map((rsvp, index) => {
          let formattedDate = '-';
          if (rsvp.submittedAt) {
            try {
              if (typeof rsvp.submittedAt === 'object' && 'seconds' in rsvp.submittedAt) {
                formattedDate = new Date(rsvp.submittedAt.seconds * 1000).toLocaleString('id-ID');
              } else if (typeof rsvp.submittedAt === 'string') {
                formattedDate = new Date(rsvp.submittedAt).toLocaleString('id-ID');
              }
            } catch (e) {
              console.warn('Error formatting date:', e);
            }
          }

          return {
            'No': index + 1,
            'ID': rsvp.id || '-',
            'Nama': rsvp.name?.trim() || '-',
            'Jumlah Tamu': rsvp.guestCount || 0,
            'Status': rsvp.status || '-',
            'Tanggal': formattedDate,
            'IP Address': rsvp.ipAddress || '-'
          };
        });

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'RSVP');
        XLSX.writeFile(workbook, `rsvp-${new Date().toISOString().split('T')[0]}.xlsx`);
      }
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

  // Generate chart data untuk scroll distribution (unique by session ID)
  const getScrollDistributionData = () => {
    const ranges = [
      { range: '0-25%', min: 0, max: 25, count: 0 },
      { range: '25-50%', min: 25, max: 50, count: 0 },
      { range: '50-75%', min: 50, max: 75, count: 0 },
      { range: '75-100%', min: 75, max: 100, count: 0 }
    ];

    // Get unique sessions with their max scroll value
    const uniqueSessions: Record<string, number> = {};
    trackingEvents.forEach(event => {
      if (!uniqueSessions[event.sessionId] || event.valueView > uniqueSessions[event.sessionId]) {
        uniqueSessions[event.sessionId] = event.valueView;
      }
    });

    Object.values(uniqueSessions).forEach(scrollValue => {
      ranges.forEach(range => {
        if (scrollValue >= range.min && scrollValue < range.max) {
          range.count++;
        } else if (scrollValue === 100 && range.max === 100) {
          range.count++;
        }
      });
    });

    return ranges;
  };

  // Generate chart data untuk event type distribution (unique by session ID)
  const getEventTypeData = () => {
    // Get unique sessions first
    const uniqueSessions: Record<string, string> = {};
    trackingEvents.forEach(event => {
      if (!uniqueSessions[event.sessionId]) {
        uniqueSessions[event.sessionId] = event.eventType;
      }
    });

    // Count event types from unique sessions
    const eventCounts: Record<string, number> = {};
    Object.values(uniqueSessions).forEach(eventType => {
      eventCounts[eventType] = (eventCounts[eventType] || 0) + 1;
    });

    return Object.entries(eventCounts).map(([eventType, count]) => ({
      eventType,
      count
    }));
  };

  // Generate chart data untuk top guests
  const getTopGuestsData = () => {
    const guestCounts: Record<string, number> = {};
    
    trackingEvents.forEach(event => {
      guestCounts[event.guestName] = (guestCounts[event.guestName] || 0) + 1;
    });

    return Object.entries(guestCounts)
      .map(([guestName, count]) => ({
        guestName: guestName.length > 15 ? guestName.substring(0, 15) + '...' : guestName,
        count
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  };

  // Get unique guests by max scroll depth
  const getGuestsByScrollThreshold = () => {
    const guestMaxScroll: Record<string, number> = {};
    
    trackingEvents.forEach(event => {
      if (!guestMaxScroll[event.guestName] || event.valueView > guestMaxScroll[event.guestName]) {
        guestMaxScroll[event.guestName] = event.valueView;
      }
    });

    const above50 = Object.entries(guestMaxScroll)
      .filter(([, scroll]) => scroll >= 50)
      .map(([name, scroll]) => ({ name, scroll }))
      .sort((a, b) => b.scroll - a.scroll);

    const below50 = Object.entries(guestMaxScroll)
      .filter(([, scroll]) => scroll < 50)
      .map(([name, scroll]) => ({ name, scroll }))
      .sort((a, b) => b.scroll - a.scroll);

    return { above50, below50 };
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Database Monitoring</h1>
              <p className="text-sm text-gray-500 mt-1">
                Kelola dan ekspor data dari Firestore
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportToJson}
                disabled={loading || (activeTab === 'comments' ? comments.length === 0 : activeTab === 'rsvp' ? rsvps.length === 0 : trackingEvents.length === 0)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaDownload className="mr-2" />
                Export JSON
              </button>
              <button
                onClick={exportToExcel}
                disabled={loading || (activeTab === 'comments' ? comments.length === 0 : activeTab === 'rsvp' ? rsvps.length === 0 : trackingEvents.length === 0) || exporting}
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

          {/* Tab Navigation */}
          <div className="flex gap-4 border-t pt-4">
            <button
              onClick={() => setActiveTab('comments')}
              className={`px-4 py-2 font-medium text-sm rounded-md transition-colors ${
                activeTab === 'comments'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Komentar ({comments.length})
            </button>
            <button
              onClick={() => setActiveTab('rsvp')}
              className={`px-4 py-2 font-medium text-sm rounded-md transition-colors ${
                activeTab === 'rsvp'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              RSVP ({rsvps.length})
            </button>
            <button
              onClick={() => setActiveTab('tracking')}
              className={`px-4 py-2 font-medium text-sm rounded-md transition-colors ${
                activeTab === 'tracking'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Tracking ({trackingEvents.length})
            </button>
          </div>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <FaSpinner className="h-8 w-8 animate-spin text-indigo-600" />
              <span className="ml-2">Memuat data...</span>
            </div>
          ) : activeTab === 'tracking' ? (
            trackingEvents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Tidak ada data tracking yang ditemukan.
              </div>
            ) : (
              <div className="space-y-8">
                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Scroll Distribution Chart */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribusi Scroll Undangan</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={getScrollDistributionData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#4f46e5" name="Jumlah User" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Event Type Chart */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Jenis Event Tracking</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={getEventTypeData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="eventType" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#10b981" name="Jumlah Event" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Top Guests Chart */}
                  <div className="bg-gray-50 p-6 rounded-lg lg:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Top 10 Pengunjung Paling Aktif</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={getTopGuestsData()} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="guestName" type="category" width={150} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#f59e0b" name="Jumlah Interaksi" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Statistics Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-600">Total Event</p>
                    <p className="text-2xl font-bold text-blue-600">{trackingEvents.length}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-gray-600">Pengunjung Unik</p>
                    <p className="text-2xl font-bold text-green-600">{new Set(trackingEvents.map(e => e.guestName)).size}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="text-sm text-gray-600">Rata-rata Scroll</p>
                    <p className="text-2xl font-bold text-purple-600">{trackingEvents.length > 0 ? Math.round(trackingEvents.reduce((sum, e) => sum + e.valueView, 0) / trackingEvents.length) : 0}%</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <p className="text-sm text-gray-600">Selesai (100%)</p>
                    <p className="text-2xl font-bold text-amber-600">{trackingEvents.filter(e => e.valueView === 100).length}</p>
                  </div>
                </div>

                {/* Unique Visitors List */}
                <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-indigo-800">Daftar Pengunjung Unik</h3>
                    <span className="bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {new Set(trackingEvents.map(e => e.guestName)).size} Orang
                    </span>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {Array.from(new Set(trackingEvents.map(e => e.guestName)))
                      .sort()
                      .map((guestName, index) => {
                        const guestEvents = trackingEvents.filter(e => e.guestName === guestName);
                        const maxScroll = Math.max(...guestEvents.map(e => e.valueView));
                        const screenWidth = guestEvents[0]?.screenWidth || 0;
                        let deviceType = 'Ponsel';
                        if (screenWidth >= 1024) {deviceType = 'Desktop';}
                        else if (screenWidth >= 640) {deviceType = 'Tablet';}
                        
                        return (
                          <div key={index} className="p-4 bg-white rounded-lg border border-indigo-100">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-bold">
                                  {index + 1}
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-gray-800">{guestName}</p>
                                  <p className="text-xs text-gray-500">{deviceType} ({screenWidth}px)</p>
                                </div>
                              </div>
                              <span className="text-sm font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded">
                                {maxScroll}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-indigo-500 h-2 rounded-full" 
                                style={{ width: `${maxScroll}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Device & Browser Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Screen Width Distribution */}
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-800 mb-4">Distribusi Ukuran Layar</h3>
                    <div className="space-y-3">
                      {(() => {
                        const screenWidths: Record<string, number> = {};
                        trackingEvents.forEach(event => {
                          const width = event.screenWidth;
                          let category = '';
                          if (width < 640) {category = 'Ponsel (< 640px)';}
                          else if (width < 1024) {category = 'Tablet (640-1024px)';}
                          else {category = 'Desktop (≥ 1024px)';}
                          
                          screenWidths[category] = (screenWidths[category] || 0) + 1;
                        });
                        
                        return Object.entries(screenWidths).map(([category, count]) => (
                          <div key={category} className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-100">
                            <span className="text-sm font-medium text-gray-800">{category}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full" 
                                  style={{ width: `${(count / trackingEvents.length) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-bold text-blue-600 w-16 text-right">{count} ({Math.round((count / trackingEvents.length) * 100)}%)</span>
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>

                  {/* Browser/User Agent Summary */}
                  <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                    <h3 className="text-lg font-semibold text-purple-800 mb-4">Browser Teratas</h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {(() => {
                        const userAgents: Record<string, number> = {};
                        trackingEvents.forEach(event => {
                          const ua = event.userAgent;
                          let browser = 'Unknown';
                          
                          if (ua.includes('Chrome')) {browser = 'Chrome';}
                          else if (ua.includes('Safari')) {browser = 'Safari';}
                          else if (ua.includes('Firefox')) {browser = 'Firefox';}
                          else if (ua.includes('Edge')) {browser = 'Edge';}
                          else if (ua.includes('Opera')) {browser = 'Opera';}
                          
                          userAgents[browser] = (userAgents[browser] || 0) + 1;
                        });
                        
                        return Object.entries(userAgents)
                          .sort((a, b) => b[1] - a[1])
                          .map(([browser, count]) => (
                            <div key={browser} className="flex items-center justify-between p-3 bg-white rounded-lg border border-purple-100">
                              <span className="text-sm font-medium text-gray-800">{browser}</span>
                              <div className="flex items-center gap-2">
                                <div className="w-32 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-purple-500 h-2 rounded-full" 
                                    style={{ width: `${(count / trackingEvents.length) * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-bold text-purple-600 w-16 text-right">{count} ({Math.round((count / trackingEvents.length) * 100)}%)</span>
                              </div>
                            </div>
                          ));
                      })()}
                    </div>
                  </div>
                </div>

                {/* Guest Threshold Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Above 50% */}
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-green-800">Sangat Tertarik (≥ 50%)</h3>
                      <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {getGuestsByScrollThreshold().above50.length} Orang
                      </span>
                    </div>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {getGuestsByScrollThreshold().above50.length === 0 ? (
                        <p className="text-gray-600 text-sm">Tidak ada pengunjung</p>
                      ) : (
                        getGuestsByScrollThreshold().above50.map((guest, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
                            <span className="text-sm font-medium text-gray-800">{guest.name}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full" 
                                  style={{ width: `${guest.scroll}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-bold text-green-600 w-12 text-right">{guest.scroll}%</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Below 50% */}
                  <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-red-800">Kurang Tertarik ({'<'} 50%)</h3>
                      <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {getGuestsByScrollThreshold().below50.length} Orang
                      </span>
                    </div>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {getGuestsByScrollThreshold().below50.length === 0 ? (
                        <p className="text-gray-600 text-sm">Tidak ada pengunjung</p>
                      ) : (
                        getGuestsByScrollThreshold().below50.map((guest, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-100">
                            <span className="text-sm font-medium text-gray-800">{guest.name}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-red-500 h-2 rounded-full" 
                                  style={{ width: `${guest.scroll}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-bold text-red-600 w-12 text-right">{guest.scroll}%</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Data Table */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Detail Event Tracking</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pengunjung</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Event</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nilai/View</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Sesi</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ukuran Layar</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {trackingEvents.map((event, index) => (
                          <tr key={event.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {index + 1}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {event.id || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {event.guestName || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {event.eventType || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {event.valueView || 0}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                              {event.sessionId || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(event.timestamp)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {event.screenWidth || '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )
          ) : activeTab === 'comments' ? (
            comments.length === 0 ? (
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
            )
          ) : (
            rsvps.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Tidak ada data RSVP yang ditemukan.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah Tamu</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rsvps.map((rsvp, index) => {
                      const statusId = labelToStatusId[rsvp.status] || rsvp.status;
                      const statusColor = statusId === 'hadir' ? 'text-green-600' : statusId === 'tidak-hadir' ? 'text-red-600' : 'text-amber-600';
                      
                      return (
                        <tr key={rsvp.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {index + 1}
                          </td>
                          <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {rsvp.id || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {rsvp.name || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {rsvp.guestCount || 0}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${statusColor}`}>
                            {rsvp.status || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(rsvp.submittedAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {rsvp.ipAddress || '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
