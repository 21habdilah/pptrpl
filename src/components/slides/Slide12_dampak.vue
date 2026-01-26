<template>
  <div class="ppt-slide-wrapper">
    <div class="slide-viewport">
      
      <header class="slide-header">
        <div class="badge">ETHICS & SUSTAINABILITY // 2026</div>
        <h1 class="title">Dua Sisi <span class="accent">Revolusi AI</span></h1>
        <p class="subtitle">Neural Network membawa lompatan besar, namun dibayar dengan harga yang nyata.</p>
      </header>

      <div class="impact-grid">
        <!-- POSITIF -->
        <div class="impact-card positive">
          <div class="card-head">
            <span class="icon">✨</span>
            <h2>Potensi Manfaat</h2>
          </div>
          <ul class="impact-list">
            <li>
              <strong>Akselerasi Kemanusiaan:</strong> 
              Mampu mendeteksi sel kanker sejak dini dan mempercepat penemuan struktur protein untuk obat-obatan baru yang sebelumnya mustahil dilakukan manusia.
            </li>
            <li>
              <strong>Efisiensi Tanpa Batas:</strong> 
              Mengambil alih tugas repetitif dan berbahaya, memungkinkan manusia fokus pada inovasi kreatif serta penyelesaian masalah tingkat tinggi.
            </li>
            <li>
              <strong>Aksesibilitas Global:</strong> 
              Menghancurkan batasan bahasa melalui terjemahan instan dan membantu penyandang disabilitas berinteraksi dengan dunia secara mandiri.
            </li>
          </ul>
        </div>

        <!-- NEGATIF -->
        <div class="impact-card negative">
          <div class="card-head">
            <span class="icon">⚠️</span>
            <h2>Konsekuensi Nyata</h2>
          </div>
          <ul class="impact-list">
            <li>
              <strong>Beban Lingkungan:</strong> 
              Pelatihan satu model AI skala besar mengonsumsi listrik ribuan megawatt dan jutaan liter air pendingin, meningkatkan jejak karbon global secara drastis.
            </li>
            <li>
              <strong>Ancaman Objektivitas:</strong> 
              AI belajar dari data manusia yang cacat; berisiko memperkuat bias ras, gender, dan sosial yang dapat menghasilkan keputusan yang tidak adil.
            </li>
            <li>
              <strong>Manipulasi & Privasi:</strong> 
              Teknologi Deepfake dan pengolahan data masif mengancam privasi individu serta mengaburkan batasan antara fakta dan kebohongan di ruang digital.
            </li>
          </ul>
        </div>
      </div>

      <footer class="impact-footer">
        <p>"Teknologi tidak memiliki moral; kitalah yang memikul tanggung jawab atas arah perkembangannya."</p>
      </footer>

    </div>
  </div>
</template>

<style scoped>
.ppt-slide-wrapper {
  width: 100vw; height: 100vh; background: #020617;
  display: flex; justify-content: center; align-items: center;
  font-family: 'Inter', sans-serif; color: white;
}

.slide-viewport {
  width: 90vw; aspect-ratio: 16 / 9;
  background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(15px);
  border-radius: 30px; border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem 4rem; display: flex; flex-direction: column;
}

.slide-header { text-align: center; margin-bottom: 2rem; }
.title { font-size: 3.5rem; font-weight: 900; margin-bottom: 0.5rem; }
.accent { color: #38bdf8; }
.subtitle { font-size: 1.4rem; color: #94a3b8; }

.impact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; flex-grow: 1; }

.impact-card {
  padding: 2rem; border-radius: 25px;
  background: rgba(255, 255, 255, 0.02);
  transition: 0.3s; position: relative;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.positive { border-top: 8px solid #22c55e; }
.negative { border-top: 8px solid #ef4444; }

.impact-card:hover { 
  transform: translateY(-8px); 
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}

.card-head { display: flex; align-items: center; gap: 15px; margin-bottom: 1.5rem; }
.card-head .icon { font-size: 2.5rem; }
.card-head h2 { font-size: 2rem; margin: 0; }

.impact-list { list-style: none; padding: 0; }
.impact-list li { 
  font-size: 1.15rem; color: #cbd5e1; margin-bottom: 1.2rem; 
  padding-left: 25px; position: relative;
  line-height: 1.5;
}
.impact-list li::before {
  content: "→"; position: absolute; left: 0; color: #38bdf8; font-weight: bold;
}
.impact-list li strong { color: white; display: block; margin-bottom: 2px; }

.impact-footer { 
  margin-top: 1.5rem; text-align: center; 
  font-style: italic; font-size: 1.2rem; color: #94a3b8;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
}
</style>
