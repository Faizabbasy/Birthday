/**
 * birthdayData.js
 * -------------------------
 * Central data source for the birthday website.
 * Edit this file to personalize the experience.
 * -------------------------
 */

import songAudio from '../assets/Daniel Caesar, Rex Orange County - Rearrange My World (Official Audio) - Daniel Caesar (128k).mp3'

export const birthdayData = {
  /* ── Identities ── */
  recipientName: "Namamu",          // Name of the birthday person
  recipientNickname: "hani bani switi", // Nickname / term of endearment
  senderName: "Seseorang Spesial",  // Your name
  age: 22,                          // Birthday age being celebrated
  date: "26 Oktober 2026",        // Birthday date string

  /* ── Letter Page Photos ── */
  // Replace with your own photos. These appear as polaroid decorations around the letter.
  letterPhotos: [
    { src: "/assets/photo1.png", alt: "Foto spesial",  rotate: -6, label: "\u2665" },
    { src: "/assets/photo2.png", alt: "Momen kita",    rotate: 5,  label: "\u2728" },
  ],

  /* ── Hero Section ── */
  tagline: "Happy Birthday",
  heroTitle: "Selamat Hari Jadi yang Paling Indah",
  heroMessage:
    "Hari ini adalah hari yang paling istimewa — karena kamu ada di dunia ini. Setiap momen bersamamu adalah hadiah yang tak ternilai.",

  /* ── CTA Buttons ── */
  ctaPrimary:   { label: "Baca Suratku", to: "/letter" },
  ctaSecondary: { label: "Lihat Momen", to: "/moments" },

  /* ── Personal Letter ── */
  letter: {
    title: "Untukmu, di Hari Spesial Ini",
    subtitle: "Sebuah surat kecil dari hatiku",
    paragraphs: [
      "Hei, kamu — si orang yang selalu berhasil membuat hariku lebih cerah hanya dengan senyummu. Hari ini adalah harimu, dan aku ingin kamu tahu betapa berharganya kamu.",
      "Ada banyak hal yang ingin aku ucapkan, tapi kata-kata sering kali terasa kurang untuk menggambarkan seberapa spesialnya kamu. Kamu adalah salah satu orang terbaik yang pernah aku kenal — tulus, hangat, dan luar biasa dengan cara yang hanya kamu yang bisa.",
      "Semoga ulang tahunmu tahun ini membawa hal-hal indah yang kamu layak dapatkan. Semoga setiap doamu dikabulkan, setiap impianmu tercapai, dan setiap langkahmu selalu diiringi kebahagiaan.",
      "Terima kasih sudah ada. Terima kasih sudah menjadi dirimu yang apa adanya. Itu saja sudah lebih dari cukup.",
    ],
    closing:    "Dengan sepenuh hati,",
    signature:  "Seseorang yang peduli padamu",
    postscript: "P.S. — Kamu luar biasa, dan jangan pernah lupakan itu. 🌸",
  },

  /* ── Song ── */
  song: {
    title:  "Rearrange My World",
    artist: "Daniel Caesar, Rex Orange County",
    src:    songAudio,
    url:    null,  // optional: YouTube or Spotify URL
  },

  /* ── Moments / Photos ── */
  // Each item: { id, src, alt, caption, date, category, location, story }
  photos: [
    {
      id: 1,
      src: "/assets/moment1.png",
      alt: "Kopi & Bunga Pagi",
      caption: "Secangkir kopi hangat dan obrolan tanpa akhir di sudut kafe favorit kita.",
      date: "14 Jan 2026",
      category: "Kafe",
      location: "Warm Corner Cafe",
      story: "Hari itu hujan deras diluar, tapi obrolan hangat bersamamu membuat waktu seperti berhenti sejenak. Kamu tertawa karena busa lattenya menempel di bibirmu.",
    },
    {
      id: 2,
      src: "/assets/moment2.png",
      alt: "Senja di Pantai",
      caption: "Menikmati matahari terbenam bersama ombak yang menyapu lembut di tepi pantai.",
      date: "28 Mar 2026",
      category: "Petualangan",
      location: "Sunset Beach",
      story: "Langit sore berubah warna menjadi pink dan keemasan. Kita berdiri diam menatap cakrawala, menyadari betapa berharganya setiap detik yang kita lewati bersama.",
    },
    {
      id: 3,
      src: "/assets/moment3.png",
      alt: "Kue Ulang Tahun & Cahaya Lilin",
      caption: "Momen manis saat lilin dinyalakan dan harapan-harapan indah diucapkan.",
      date: "22 Sep 2026",
      category: "Spesial",
      location: "Little Celebration",
      story: "Senyum bahagia di wajahmu saat meniup lilin adalah pemandangan terbaik tahun ini. Semoga seluruh doa baikmu dikabulkan satu per satu.",
    },
    {
      id: 4,
      src: "/assets/moment4.png",
      alt: "Genggaman Tangan di Taman",
      caption: "Langkah kecil di antara bunga-bunga yang bermekaran dan matahari pagi.",
      date: "10 Jun 2026",
      category: "Manis",
      location: "Blossom Garden",
      story: "Berjalan santai tanpa arah, bergandengan tangan menelusuri jalanan taman yang dipenuhi kelopak bunga gugur. Momen sederhana yang membuat hati tenang.",
    },
  ],

  /* ── Decorative Elements ── */
  decorations: {
    flowers: ["🌸", "🌺", "🌼", "🌷"],
    hearts:  ["♡", "❤", "💕", "🤍"],
    stars:   ["✦", "✧", "⭑", "✩"],
  },
};

export default birthdayData;
