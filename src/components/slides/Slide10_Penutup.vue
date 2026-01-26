<template>
  <div class="ppt-slide-wrapper">
    <div class="slide-viewport">
      
      <div class="split-layout">
        <!-- SISI KIRI: RINGKASAN & KESIMPULAN (6 POIN UTAMA) -->
        <div class="summary-panel">
          <header class="summary-header">
            <div class="badge">FINAL_SUMMARY // 2026</div>
            <h1 class="main-title">Intisari <span class="accent">Presentasi</span></h1>
          </header>

          <div class="conclusion-list">
            <!-- Poin 1: Definisi & Struktur -->
            <div class="conclusion-item">
              <div class="c-num">01</div>
              <div class="c-text">
                <strong>Arsitektur Cerdas:</strong>
                <p>Neural Network meniru jaringan saraf biologis melalui lapisan Input, Hidden, dan Output.</p>
              </div>
            </div>

            <!-- Poin 2: Cara Kerja -->
            <div class="conclusion-item">
              <div class="c-num">02</div>
              <div class="c-text">
                <strong>Belajar Mandiri:</strong>
                <p>Melalui proses Forward dan Backpropagation, model mampu memperbaiki diri tanpa instruksi kaku.</p>
              </div>
            </div>

            <!-- Poin 3: Fleksibilitas -->
            <div class="conclusion-item">
              <div class="c-num">03</div>
              <div class="c-text">
                <strong>Adaptabilitas Tinggi:</strong>
                <p>Mampu menangani berbagai jenis data mulai dari angka (ANN), gambar (CNN), hingga teks (RNN/Transformer).</p>
              </div>
            </div>

            <!-- Poin 4: Dampak & Etika -->
            <div class="conclusion-item">
              <div class="c-num">04</div>
              <div class="c-text">
                <strong>Inovasi Bertanggung Jawab:</strong>
                <p>Kesadaran akan jejak karbon dan bias data sangat krusial untuk masa depan AI yang berkelanjutan.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- SISI KANAN: PENUTUP & THANK YOU -->
        <div class="finish-panel">
          <div class="thank-you-box">
            <div class="neural-orb">
              <div class="orb-core"></div>
              <div class="orb-ring"></div>
              <div class="orb-ring inner"></div>
            </div>
            <h2 class="thanks-text">Terima Kasih</h2>
            <p class="sub-thanks">Membangun Masa Depan Berbasis Data & Etika.</p>
            
            <div class="contact-grid">
              <div class="contact-item">
                <span class="c-icon">📧</span>
                <span>Kelompok7@PengantarInformatika</span>
              </div>
              <div class="contact-item">
                <span class="c-icon">💻</span>
                <span>Neural Network</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* WRAPPER 16:9 */
.ppt-slide-wrapper {
  width: 100vw; height: 100vh;
  background: #020617;
  display: flex; justify-content: center; align-items: center;
  font-family: 'Inter', sans-serif; color: white;
}

.slide-viewport {
  width: 90vw; aspect-ratio: 16 / 9;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 40px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 40px 100px rgba(0,0,0,0.6);
}

.split-layout {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  height: 100%;
}

/* SISI KIRI: KESIMPULAN */
.summary-panel {
  padding: 4rem 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(90deg, rgba(99, 102, 241, 0.08), transparent);
}

.badge { color: #6366f1; font-weight: 800; letter-spacing: 4px; font-size: 1rem; margin-bottom: 0.5rem; }
.main-title { font-size: 3.5rem; font-weight: 900; line-height: 1.1; margin: 0 0 2.5rem; }
.accent { color: #38bdf8; text-shadow: 0 0 25px rgba(56, 189, 248, 0.3); }

.conclusion-list { display: flex; flex-direction: column; gap: 1.5rem; }
.conclusion-item { display: flex; align-items: flex-start; gap: 20px; }

.c-num { 
  font-size: 1.2rem; font-weight: 900; color: #38bdf8;
  min-width: 45px; height: 45px; border: 2px solid #38bdf8;
  display: flex; align-items: center; justify-content: center; border-radius: 12px;
  background: rgba(56, 189, 248, 0.1);
}

.c-text strong { display: block; font-size: 1.4rem; color: #38bdf8; margin-bottom: 4px; }
.c-text p { font-size: 1.15rem; color: #cbd5e1; line-height: 1.5; margin: 0; }

/* SISI KANAN: PENUTUP */
.finish-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: radial-gradient(circle at center, rgba(99, 102, 241, 0.15), transparent 70%);
}

.thank-you-box { text-align: center; z-index: 2; }
.thanks-text { font-size: 5rem; font-weight: 900; margin: 2rem 0 0.5rem; letter-spacing: -2px; }
.sub-thanks { font-size: 1.4rem; color: #94a3b8; margin-bottom: 2.5rem; font-style: italic; }

/* ORB ANIMATION */
.neural-orb {
  position: relative;
  width: 180px; height: 180px;
  margin: 0 auto;
}
.orb-core {
  position: absolute; inset: 30%;
  background: #6366f1; border-radius: 50%;
  box-shadow: 0 0 60px #6366f1;
  animation: pulse-orb 3s infinite ease-in-out;
}
.orb-ring {
  position: absolute; inset: 0;
  border: 2px dashed #38bdf8; border-radius: 50%;
  animation: rotate-ring 15s linear infinite;
}
.orb-ring.inner {
  inset: 15%;
  border: 1px solid rgba(99, 102, 241, 0.4);
  animation: rotate-ring 10s linear infinite reverse;
}

.contact-grid {
  display: flex; flex-direction: column; gap: 12px; align-items: center;
  opacity: 0.8;
}
.contact-item { display: flex; align-items: center; gap: 12px; font-size: 1.1rem; color: #cbd5e1; }
.c-icon { font-size: 1.3rem; }

@keyframes pulse-orb {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.15); opacity: 1; box-shadow: 0 0 90px #6366f1; }
}
@keyframes rotate-ring {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* RESPONSIVE */
@media (max-height: 800px) {
  .main-title { font-size: 2.8rem; }
  .thanks-text { font-size: 4rem; }
  .c-text strong { font-size: 1.2rem; }
  .c-text p { font-size: 1rem; }
}
</style>
