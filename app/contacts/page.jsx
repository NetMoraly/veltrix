'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col bg-gradient-to-br from-[#160029] to-[#6e1bb3] text-white justify-center items-center">
        <h1 className="text-4xl font-bold">Контакты</h1>
      </main>
      <Footer />
    </>
  );
}
