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
  senderName: "fafaiiii",  // Your name
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
      "haiiiii sayaanggg, selamatt ulangg tahunn sayaangggkuuuu cintaakuuuuu duniaakuuuu bayiii kicikkuuuhh princessskuuhh. wishhh u all the bestt sayaanggg, semogaaa citaa citaaa yangg kamuuu inginkann bisaa terwujuddd dan tercapaaii yaaaa bebebbbb, panjanggg umurrr sehattt selaluuu and berbaktii kepadaa orangg tuaaa dann baikk hatii selaluuu sayaangg di rendahkann hatinyaa dan semogaaa rezekii selaluuu datanggg, aamiiiinnnnnn.",
      "semangattt teruss yaaa sayaangg, jangann pernaaa putuss asaaa untuk mengejar impiann kamuuu, semogaaa di umurr iniii kamuu di berii keberkahann penuhh buatt kamuu bebbb, jangann lupaa bersyukurr apaa yang udaa didapatt dan jangann besarr hatiii yaaa.",
      "terimakasiiii udaaa mauu sabarr samaa akuu, makasii jugaa udaa sayaangg kee akuuu whehehehh, semogaaa kamuu sekarangg bisaa lebiii baikk darii taunn kemarinn dan diberii kelancarannn, semogaa kamuu jadii orangg suksess, solehahh, berbaktii pada orang tuaa, dann rendahh hatii kayaa akuu rendah hatii azzekk, prengg....",
      "pokonyaa akuu selaluu doainn kamuu yang terbaikkk buatt kamuuhh. happyy birthdayyy yaaa sayaanggg, im so proudddd of uuuuu beibehhhh🤍🤍🤍.",
      "hadiahnyaa nantiinyakk nyusulll wheheheheh, semangatt teruss bebebb ngejalaninn hari harinyaaa akuu selaluu mensuprottt kamuu dan dukungg kamuu dan selaluu adaa buat kamuu kalo kamuu adaaa sesuatuu bilangg samaa akuu nyakkk.",
      "lovee uu moreeee sayaangggkuuu cintaakuuu cantikkuuu gemoyyyy 😘😘😍😍😍🥰🥰🥰🤍🤍🤍.",
    ],
    closing:    "Dengan sepenuh hati,",
    signature:  "fafaiiii",
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
