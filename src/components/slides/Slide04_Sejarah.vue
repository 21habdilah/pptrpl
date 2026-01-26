<template>
  <div class="ppt-slide">
    <header class="slide-header">
      <div class="slide-badge">CHAPTER_03 // MODERN_REVOLUTION</div>
      <h1 class="slide-title">Kebangkitan & <span class="accent">Masa Depan</span></h1>
    </header>

    <div class="content-grid">
      <!-- INFO KIRI -->
      <div class="info-list">
       <div class="info-item">
          <div class="info-icon">⚡</div>
          <div class="info-text">
            <h3>Sinergi Big Data & GPU</h3>
            <!-- Kalimat Anda yang diperbaiki -->
            <p>Neural Network berevolusi sangat jauh berkat kemampuan komputasi paralel GPU dalam mengolah Big Data berskala triliunan parameter.</p>
          </div>
        </div>

        <div class="info-item">
          <div class="info-icon">🤖</div>
          <div class="info-text">
            <h3>Standar Inteligensia Baru</h3>
            <p>Transformasi algoritma menjadi 'otak digital' di balik LLM (seperti ChatGPT), visi komputer pada mobil otonom, dan presisi diagnosa medis.</p>
          </div>
        </div>

        <div class="info-item highlight">
          <div class="info-icon">🚀</div>
          <div class="info-text">
            <h3>Evolusi Berkelanjutan</h3>
            <p>Masa depan berfokus pada Green AI (efisiensi karbon) dan Explainable AI untuk menciptakan teknologi yang transparan serta bertanggung jawab.</p>
          </div>
        </div>
      </div>

      <!-- VISUAL KANAN -->
      <div class="visual-panel">
        <div class="glow-card">
          <img src="https://placehold.co" />
          <div class="caption">"Neural Network adalah fondasi revolusi industri 4.0"</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ppt-slide { padding: 4rem; color: white; height: 100%; display: flex; flex-direction: column; }
.slide-title { font-size: 3.5rem; font-weight: 900; margin-bottom: 3rem; }
.accent { color: #6366f1; }

.content-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 4rem; flex-grow: 1; align-items: center; }

.info-list { display: flex; flex-direction: column; gap: 2rem; }
.info-item { display: flex; align-items: center; gap: 25px; background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); }
.info-item.highlight { border-color: #6366f1; background: rgba(99, 102, 241, 0.1); }

.info-icon { font-size: 3.5rem; }
.info-text h3 { font-size: 1.8rem; color: #38bdf8; margin-bottom: 5px; }
.info-text p { font-size: 1.2rem; color: #94a3b8; line-height: 1.4; }

.visual-panel .glow-card { background: #0f172a; padding: 15px; border-radius: 25px; border: 2px solid #6366f1; box-shadow: 0 0 40px rgba(99, 102, 241, 0.3); }
.visual-panel img { width: 100%; border-radius: 15px; }
.caption { margin-top: 1.5rem; text-align: center; font-style: italic; color: #cbd5e1; font-size: 1.2rem; }
</style>
