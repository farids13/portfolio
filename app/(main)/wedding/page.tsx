'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Dummy data
const guestName = "Ahmad Jailani Kamu Tau itu sapa tes nama panjang";
const groomName = "Farid Satria";
const brideName = "Asri Dilla Wahyuni";
const weddingDate = "01 Januari 2025";
const weddingVenue = "Gedung Pernikahan, Jl. Contoh No. 123, Kota Bandung";

const QuranVerse = {
  text: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.",
  source: "QS. Ar-Rum: 21"
};

const events = [
  { name: 'Akad Nikah', time: '08.00 - 10.00 WIB', date: '01 Januari 2025' },
  { name: 'Resepsi', time: '11.00 - 14.00 WIB', date: '01 Januari 2025' }
];

const WeddingInvitation = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [activeSection, setActiveSection] = useState('opening');
  const [rsvpList, setRsvpList] = useState([{ name: '' }]);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, name: 'John Doe', comment: 'Selamat atas pernikahannya! Semoga bahagia selalu.' },
    { id: 2, name: 'Jane Smith', comment: 'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fi khair' }
  ]);

  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    couple: useRef<HTMLDivElement>(null),
    quran: useRef<HTMLDivElement>(null),
    date: useRef<HTMLDivElement>(null),
    location: useRef<HTMLDivElement>(null),
    envelope: useRef<HTMLDivElement>(null),
    rsvp: useRef<HTMLDivElement>(null),
    comments: useRef<HTMLDivElement>(null),
    thankyou: useRef<HTMLDivElement>(null)
  };

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + (window.innerHeight / 3);

      // Find which section is currently in view
      const sections = Object.entries(sectionRefs);
      for (const [section, ref] of sections) {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enable smooth scrolling for the whole page
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const scrollToSection = (section: string) => {
    sectionRefs[section as keyof typeof sectionRefs]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleOpenInvitation = () => {
    setIsOpened(true);
    setTimeout(() => {
      scrollToSection('hero');
    }, 100);
  };

  const addRsvpField = () => {
    if (rsvpList.length < 10) {
      setRsvpList([...rsvpList, { name: '' }]);
    }
  };

  const handleRsvpChange = (index: number, value: string) => {
    const newList = [...rsvpList];
    newList[index].name = value;
    setRsvpList(newList);
  };

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, { id: comments.length + 1, name: 'Tamu', comment }]);
      setComment('');
    }
  };

  if (!isOpened) {
    return (
      <div className="h-[100vh] flex bg-wedding-secondary items-end">
        <div className='absolute -top-18 w-full h-[250px] z-0'>
          <Image
            src="/images/wedding/frame/frame-top.png"
            alt="Frame Top"
            fill
            className="object-contain scale-150"
            priority
          />
        </div>
        <div className='absolute top-13 -left-12 w-[150px] h-[150px] flex items-start justify-start z-0'>
          <Image
            src="/images/wedding/frame/top-ornamen.png"
            alt="Frame Top Ornamen"
            fill
            className="object-contain scale-100"
            priority
          />
        </div>
        <div className='absolute top-13 -right-12 w-[150px] h-[150px] flex items-start justify-start z-0'>
          <Image
            src="/images/wedding/frame/top-ornamen.png"
            alt="Frame Top Ornamen"
            fill
            className="object-contain scale-100"
            style={{transform: 'scaleX(-1)'}}
            priority
          />
        </div>
        <div className='absolute -bottom-5 -left-21 w-[300px] h-[300px] flex items-start justify-start z-0'>
          <Image
            src="/images/wedding/frame/bottom-ornamen.png"
            alt="Frame Top Ornamen"
            fill
            className="object-contain scale-100"
            priority
          />
        </div>
        <div className='absolute -bottom-5 -right-21 w-[300px] h-[300px] flex items-start justify-start z-0'>
          <Image
            src="/images/wedding/frame/bottom-ornamen.png"
            alt="Frame Top Ornamen"
            fill
            className="object-contain scale-100"
            style={{transform: 'scaleX(-1)'}}
            priority
          />
        </div>
        <div className="w-full bg-wedding-primary min-h-[85vh] flex flex-col gap-5 justify-end rounded-t-full border border-yellow-500">
          <div className="text-center z-1 flex flex-col gap-5 items-center w-full">
            <h3 className="text-sm">THE WEDDING OF</h3>
            <div className='text-wedding-font'>
              <h1 className="text-6xl font-bold font-allura">Farid</h1>
              <p className="text-6xl font-bold font-allura">&</p>
              <h1 className="text-6xl font-bold font-allura">Dilla</h1>
            </div>
            <h3 className="text-sm">14 Desember 2025</h3>
            <div className=''>
              <p>Kepada Yth.</p>
              <p>Bapak/Ibu/Saudara/i</p>
            </div>
            <div className='w-[300px] min-h-[100px] border border-wedding-secondary rounded-2xl flex items-center justify-center'>
              <p className="text-lg font-bold">{guestName}</p>
            </div>
            <div className="bg-wedding-secondary w-1/2 rounded-full border border-yellow-500 mb-15">
              <button onClick={handleOpenInvitation} className='text-wedding-primary p-2'>
                Buka Undangan
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-hidden">
      {/* Hero Section */}
      <section
        ref={sectionRefs.hero}
        className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-background to-background-light p-4 text-center snap-start min-h-[100vh] relative overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="wedding-title text-4xl md:text-5xl font-bold mb-4 text-foreground">Undangan Pernikahan</h1>
            <div className="w-24 h-1 bg-primary/80 mx-auto mb-6"></div>
          </div>

          <div className="text-2xl md:text-4xl mb-6">
            <p className="wedding-script text-foreground font-medium">{groomName} & {brideName}</p>
          </div>

          <div className="wedding-card inline-block px-6 py-3 rounded-full shadow-lg mb-8 border border-primary/10">
            <p className="text-lg text-foreground">{weddingDate}</p>
          </div>

          <div className="mt-12 animate-bounce">
            <button
              onClick={() => scrollToSection('couple')}
              className="p-3 rounded-full border-2 border-primary/50 text-primary hover:bg-primary hover:text-foreground transition-all duration-300 transform hover:scale-110"
              aria-label="Scroll ke bawah"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Couple Section */}
      <section
        ref={sectionRefs.couple}
        className="h-screen p-8 bg-background-light flex flex-col justify-center snap-start"
      >
        <div className="text-center mb-12">
          <h2 className="wedding-title text-3xl font-bold text-foreground mb-2">Mempelai</h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="w-48 h-48 md:w-56 md:h-56 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full mx-auto mb-6 overflow-hidden shadow-lg">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Foto Mempelai Pria</span>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-1">{groomName}</h3>
            <p className="text-foreground/80">Putra dari Bapak A dan Ibu B</p>
          </div>

          <div className="text-center">
            <div className="w-48 h-48 md:w-56 md:h-56 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full mx-auto mb-6 overflow-hidden shadow-lg">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Foto Mempelai Wanita</span>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-1">{brideName}</h3>
            <p className="text-foreground/80">Putri dari Bapak C dan Ibu D</p>
          </div>
        </div>

      </section>

      {/* Quran Verse Section */}
      <section
        ref={sectionRefs.quran}
        className="h-screen p-8 bg-gradient-to-b from-background-light to-background flex flex-col items-center justify-center text-center snap-start relative overflow-hidden"
      >
        {/* Background pattern dihapus untuk menghindari error 404 */}

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="wedding-title text-3xl font-bold text-primary mb-2">Firman Allah SWT</h2>
            <div className="w-16 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="bg-white/90 p-8 md:p-12 rounded-xl shadow-lg backdrop-blur-sm border border-primary/10">
            <div className="mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>

            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8 font-serif">
              "{QuranVerse.text}"
            </p>

            <div className="flex items-center justify-center space-x-4">
              <div className="h-px bg-primary/20 flex-1"></div>
              <p className="text-primary font-medium">{QuranVerse.source}</p>
              <div className="h-px bg-primary/20 flex-1"></div>
            </div>

            <div className="mt-8 text-muted-foreground text-sm">
              <p>Mari bersama-sama kita panjatkan doa untuk kelancaran dan keberkahan pernikahan mereka</p>
            </div>
          </div>
        </div>
      </section>

      {/* Date Section */}
      <section
        ref={sectionRefs.date}
        className="h-screen p-8 flex flex-col justify-center snap-start bg-gradient-to-b from-background to-background-light"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-2">Save the Date</h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
          <p className="text-foreground/80 mt-4">Kami mengundang Anda untuk hadir di hari istimewa kami</p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 px-4">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white/90 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-primary/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">{event.name}</h3>

                <div className="space-y-2 text-muted-foreground">
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span className='text-foreground'>{event.date}</span>
                  </div>

                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className='text-foreground'>{event.time}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-foreground/80">{weddingVenue}</p>
                </div>

                <button className="mt-4 px-6 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
                  Tambah ke Kalender
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 text-muted-foreground text-sm">
          <p>Diharapkan kehadirannya untuk memberikan doa restu</p>
        </div>
      </section>

      {/* Location Section */}
      {/* Location Section */}
      <section
        ref={sectionRefs.location}
        className="h-screen p-8 bg-background-light flex flex-col justify-center snap-start"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-2">Lokasi Acara</h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </div>
        <div className="max-w-4xl mx-auto w-full">
          <div className="bg-background h-64 md:h-96 rounded-lg mb-6 flex items-center justify-center border border-primary/10 shadow-inner">
            <span className="text-foreground/50">Peta Lokasi Akan Ditampilkan Di Sini</span>
          </div>
          <div className="text-center">
            <p className="text-lg mb-4 font-medium text-foreground">{weddingVenue}</p>
            <a
              href="#"
              className="inline-block px-6 py-2 bg-primary text-foreground rounded-full hover:bg-primary-dark transition-colors font-medium text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buka di Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Envelope Section */}
      <section
        ref={sectionRefs.envelope}
        className="h-screen p-8 bg-background-light flex flex-col justify-center snap-start"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-2">Amplop Digital</h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="max-w-md mx-auto w-full">
          <div className="bg-background p-8 rounded-xl shadow-lg border border-primary/10">
            <p className="text-center mb-6 text-foreground/80">Bagi yang ingin memberikan hadiah, dapat melalui rekening berikut:</p>
            <div className="bg-background-light p-6 rounded-lg border border-primary/20 mb-4 text-center">
              <p className="font-semibold text-foreground">Bank ABC</p>
              <p className="text-2xl my-2 text-primary font-mono tracking-wider">1234 5678 9012</p>
              <p className="text-foreground/80">a.n. {groomName} & {brideName}</p>
            </div>
            <button className="w-full px-6 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
              Salin Nomor Rekening
            </button>
            <p className="text-xs text-center text-foreground/50 mt-6">*Atas perhatian dan doa restunya, kami ucapkan terima kasih.</p>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section
        ref={sectionRefs.rsvp}
        className="h-screen p-8 bg-amber-50 flex flex-col justify-center snap-start"
      >
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-3xl font-bold text-center mb-8">Konfirmasi Kehadiran</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form>
              {rsvpList.map((item, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-gray-700 mb-2">Nama Tamu {index + 1}</label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleRsvpChange(index, e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Nama Lengkap"
                  />
                </div>
              ))}
              {rsvpList.length < 10 && (
                <button
                  type="button"
                  onClick={addRsvpField}
                  className="text-amber-600 hover:text-amber-800 text-sm mb-6 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Tambah Tamu
                </button>
              )}
              <button
                type="button"
                className="w-full bg-primary text-foreground py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors font-medium"
              >
                Konfirmasi Kehadiran
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section
        ref={sectionRefs.comments}
        className="h-screen p-8 bg-white overflow-y-auto snap-start"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Ucapan & Doa</h2>

          <form onSubmit={submitComment} className="mb-12 bg-amber-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4 text-foreground">Tulis Ucapan</h3>
            <div className="mb-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                rows={4}
                placeholder="Tuliskan ucapan dan doa Anda..."
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-foreground rounded-full hover:bg-primary-dark transition-colors"
            >
              Kirim Ucapan
            </button>
          </form>

          <div className="space-y-6">
            {comments.map((item) => (
              <div key={item.id} className="border-b border-gray-100 pb-4">
                <h4 className="font-semibold text-foreground">{item.name}</h4>
                <p className="text-foreground/90 mt-1">{item.comment}</p>
                <p className="text-xs text-foreground/50 mt-2">
                  {new Date().toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section
        ref={sectionRefs.thankyou}
        className="h-screen flex flex-col items-center justify-center bg-background p-8 text-center snap-start"
      >
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-foreground">Terima Kasih</h1>
          <p className="text-xl mb-8 leading-relaxed text-foreground/90">
            Atas kehadiran dan doa restunya,<br />
            kami mengucapkan terima kasih yang sebesar-besarnya.
          </p>
          <p className="text-lg mb-12 text-foreground/80">Wassalamualaikum Warahmatullahi Wabarakatuh</p>

          <div className="mt-12">
            <p className="font-semibold text-xl text-foreground">{groomName} & {brideName}</p>
            <p className="text-foreground/70 mt-2">Beserta Keluarga</p>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-12 px-6 py-2 border border-primary text-primary rounded-full hover:bg-primary/10 transition-colors inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            Kembali ke Atas
          </button>
        </div>
      </section>
    </div>
  );
};

export default WeddingInvitation;