/* NEXORIA koin 💵 — pasang di game lain (battleshoot.html, transformers.html, dst):
   <script src="nexoria-coin.js"></script>   (taruh sebelum </body>, satu folder dengan index.html)
   +1 💵 tiap 2 detik selama pemain benar-benar aktif (ada sentuhan/klik/tombol dalam 8 detik terakhir, tab terlihat). */
(function(){
  var CFG={apiKey:"AIzaSyBp4P3nv9w1xYEH_9wNPxq2E-no292ugDM",authDomain:"server-taher.firebaseapp.com",databaseURL:"https://server-taher-default-rtdb.firebaseio.com",projectId:"server-taher",storageBucket:"server-taher.firebasestorage.app",messagingSenderId:"79596136495",appId:"1:79596136495:web:93779c3b3983376253beda",measurementId:"G-K1BF1T4PM3"};
  var user='';try{user=(localStorage.getItem('nexoria_user')||'').trim();}catch(e){}
  if(!/^[A-Za-z0-9_]{3,16}$/.test(user)){try{user=(new URLSearchParams(location.search).get('u')||'').trim();}catch(e){}}
  if(!/^[A-Za-z0-9_]{3,16}$/.test(user))return;
  var key=user.toLowerCase(),db=null,pend=0,lastAct=Date.now(),lastFlush=Date.now();
  function load(src,cb){var s=document.createElement('script');s.src=src;s.onload=cb;s.onerror=function(){};document.head.appendChild(s);}
  function ready(){
    try{
      if(typeof firebase==='undefined'||typeof firebase.database!=='function')return false;
      if(!firebase.apps.length)firebase.initializeApp(window.NEXORIA_FB||CFG);
      db=firebase.database();return true;
    }catch(e){return false;}
  }
  if(!ready()){
    load('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js',function(){
      load('https://www.gstatic.com/firebasejs/10.12.2/firebase-database-compat.js',ready);
    });
  }
  function act(){lastAct=Date.now();}
  ['pointerdown','pointermove','touchstart','touchmove','keydown','wheel'].forEach(function(e){addEventListener(e,act,{passive:true});});
  function flush(){
    if(pend<=0||!db)return;
    var n=pend;pend=0;lastFlush=Date.now();
    try{db.ref('nexoria/users/'+key+'/coins').set(firebase.database.ServerValue.increment(n)).catch(function(){pend+=n;});}catch(e){pend+=n;}
  }
  setInterval(function(){
    if(!document.hidden&&Date.now()-lastAct<8000)pend++;
    if(pend>=5||(pend>0&&Date.now()-lastFlush>12000))flush();
  },2000);
  addEventListener('pagehide',flush);
  document.addEventListener('visibilitychange',function(){if(document.hidden)flush();});
})();
