/* ==================================================================
   BASE.JS — Konektor Firebase (terpisah dari index.html, tetap terhubung)
   BATTLE SHOOT
   ------------------------------------------------------------------
   © Hak Cipta — TaherJs Xhrz | H3RX
   Dilarang mengambil, mengklaim ulang, atau mendistribusikan ulang
   kode ini atas nama pihak lain tanpa izin tertulis dari pemilik.
   Kredit wajib dicantumkan jika kode ini digunakan sebagian/seluruhnya.
   ================================================================== */

/* File ini WAJIB dimuat setelah SDK firebase-app / firebase-database,
   dan SEBELUM script utama game (index.html), supaya fbApp/fbDb/fbOK
   sudah tersedia sebagai variabel global saat game mulai jalan. */

var firebaseConfig = {
  apiKey: "AIzaSyBp4P3nv9w1xYEH_9wNPxq2E-no292ugDM",
  authDomain: "server-taher.firebaseapp.com",
  databaseURL: "https://server-taher-default-rtdb.firebaseio.com",
  projectId: "server-taher",
  storageBucket: "server-taher.firebasestorage.app",
  messagingSenderId: "79596136495",
  appId: "1:79596136495:web:93779c3b3983376253beda",
  measurementId: "G-K1BF1T4PM3"
};

var fbApp = null, fbDb = null, fbOK = false;
try{
  fbApp = firebase.initializeApp(firebaseConfig);
  fbDb = firebase.database();
  fbOK = true;
  console.log('%c[base.js] Firebase terhubung ✓', 'color:#3bff8f;font-weight:bold;');
}catch(e){
  fbOK = false;
  console.warn('[base.js] Firebase gagal init, mode online nonaktif', e);
}

// Tandai bahwa base.js sudah selesai dimuat, jaga-jaga kalau index.html
// mau nunggu event ini alih-alih langsung pakai variabel global.
window.dispatchEvent(new Event('base-ready'));
