type RSVPData = {
  name: string;
  guestCount: number;
  status: string;
  submittedAt: string;
};

const STORAGE_KEY = 'wedding_rsvps';

// Simpan ke localStorage
const saveToStorage = (rsvps: RSVPData[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rsvps));
  }
};

// Ambil dari localStorage
const getFromStorage = (): RSVPData[] => {
  if (typeof window === 'undefined') return [];
  
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveRSVP = async (data: Omit<RSVPData, 'submittedAt'>) => {
  try {
    const newRSVP = {
      ...data,
      submittedAt: new Date().toISOString()
    };
    
    // Dapatkan data yang sudah ada
    const existingRSVPs = getFromStorage();
    
    // Tambahkan data baru
    const updatedRSVPs = [...existingRSVPs, newRSVP];
    
    // Simpan kembali ke localStorage
    saveToStorage(updatedRSVPs);
    
    return { success: true, data: newRSVP };
  } catch (error) {
    console.error('Error saving RSVP:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Gagal menyimpan data'
    };
  }
};

export const getRSVPs = (): RSVPData[] => {
  try {
    return getFromStorage();
  } catch (error) {
    console.error('Error getting RSVPs:', error);
    return [];
  }
};
