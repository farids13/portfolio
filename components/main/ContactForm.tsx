'use client';
import React from 'react';

export default function ContactForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0E21] px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full m-10 ">
        <h2 className="text-3xl md:text-6xl font-bold text-center text-gray-900 my-10">
          LET’S HAVE A CHAT
        </h2>
        <form className="space-y-8 mt-20 mx-10 text-2xl">
          <input
            type="text"
            placeholder="YOUR NAME"
            className="w-full bg-gray-200 placeholder-gray-600 text-gray-900 py-8 px-10 rounded-3xl focus:outline-none"
          />
          <input
            type="email"
            placeholder="EMAIL ADDRESS"
            className="w-full bg-gray-200 placeholder-gray-600 text-gray-900 py-8 px-10 rounded-3xl focus:outline-none"
          />
          <textarea
            placeholder="CHAT HERE"
            rows={4}
            className="w-full bg-gray-200 placeholder-gray-600 text-gray-900 py-8 px-10 rounded-3xl focus:outline-none resize-none"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-[#EFFD60] text-black font-bold py-8 rounded-3xl hover:bg-[#e1ed4f] transition-all"
          >
            SUBMIT HERE
          </button>
        </form>
      </div>
    </div>
  );
}
