<template>
  <SpotlightWrapper class="ppt-container">

    <!-- BACKGROUND DEKORATIF -->
    <div class="code-bg-overlay" ref="codeBg">
      <div v-for="n in 15" :key="n" class="floating-code" :style="randomPos()">
        {{ "<div>{ system.init(); }</div>" }}
      </div>
    </div>

    <!-- JUDUL SLIDE -->
    <h2 class="ppt-title">Client Project</h2>

    <!-- GRID DUA KOLOM -->
    <div class="slide-grid">

      <!-- LEFT: STEP CARDS 3 KOLM -->
      <div class="steps-column">
        <div class="steps-grid">
          <div
            v-for="step in projectSteps"
            :key="step.title"
            class="step-card"
            @click="openDetail(step)"
          >
            <div class="step-icon">{{ step.icon }}</div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-desc">{{ step.desc }}</p>
            <div class="tech-tags">
              <span class="tech-pill" v-for="t in step.tech" :key="t">{{ t }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT: DOKUMENTASI 3 KOLM -->
      <div class="docs-column">
        <div class="docs-grid">
          <div
            v-for="doc in docs"
            :key="doc.title"
            class="doc-card"
            @click="openDoc(doc)"
          >
            <img :src="doc.src" :alt="doc.title" />
            <p class="doc-caption">{{ doc.title }}</p>
          </div>
        </div>
      </div>

    </div>

    <!-- MODAL DETAIL STEP -->
    <Transition name="modal-zoom">
      <div v-if="selectedStep" class="full-modal-overlay" @click.self="closeDetail">
        <div class="modal-window">
          <button class="close-ppt-btn" @click="closeDetail">EXIT_MODULE</button>
          <div class="modal-layout">
            <div class="modal-visual">
              <div class="icon-circle">
                <span class="giant-icon">{{ selectedStep.icon }}</span>
              </div>
            </div>
            <div class="modal-info">
              <h2 class="modal-main-title">{{ selectedStep.title }}</h2>
              <div class="modal-divider"></div>
              <ul class="modal-list">
                <li v-for="(d,i) in selectedStep.details" :key="i">
                  <code class="list-bullet">0{{ i+1 }}</code> {{ d }}
                </li>
              </ul>
              <div class="tech-stack-row">
                <span class="tech-pill" v-for="t in selectedStep.tech" :key="t">{{ t }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- MODAL DETAIL DOKUMENTASI -->
    <Transition name="modal-zoom">
      <div v-if="selectedDoc" class="full-modal-overlay" @click.self="closeDoc">
        <div class="modal-window">
          <button class="close-ppt-btn" @click="closeDoc">EXIT_MODULE</button>
          <img :src="selectedDoc.src" :alt="selectedDoc.title" class="modal-img" />
          <p class="modal-caption">{{ selectedDoc.title }}</p>
        </div>
      </div>
    </Transition>

  </SpotlightWrapper>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import SpotlightWrapper from "../SpotlightWrapper.vue";

const projectSteps = [
  { icon: '🔍', title: 'Analisis', desc: 'Kumpulkan kebutuhan & masalah klien', tech: ['Mindmap','Interview'], details: ['Identifikasi masalah klien','Observasi sistem','Pengumpulan requirement'] },
  { icon: '📄', title: 'BRD', desc: 'Buat dokumen kebutuhan bisnis', tech: ['Google Docs','Notion'], details: ['Susun BRD','Spesifikasi kebutuhan bisnis','Approval awal klien'] },
  { icon: '🎨', title: 'Desain / UI-UX', desc: 'Membuat flow & wireframe', tech: ['Figma','Adobe XD'], details: ['Wireframe & mockup','Desain UI/UX','Review desain dengan klien'] },
  { icon: '💻', title: 'Coding / Implementasi', desc: 'Membuat aplikasi sesuai desain', tech: ['Vue.js','Node.js','MySQL'], details: ['Frontend development','Backend integration','Database setup'] },
  { icon: '🧪', title: 'Testing / QA', desc: 'Uji coba sistem sebelum deploy', tech: ['Jest','Manual Testing'], details: ['Unit testing','Integration testing','UAT dengan klien'] },
  { icon: '✏️', title: 'Revisi / Perbaikan', desc: 'Perbaikan bug & feedback klien', tech: ['GitHub','Figma'], details: ['Perbaikan bug','Update fitur','Sync perubahan dengan tim'] },
  { icon: '🚀', title: 'Deploy / Go Live', desc: 'Mengirim aplikasi ke server', tech: ['Vercel','Cloud Hosting'], details: ['Deploy ke hosting','Konfigurasi server','Monitoring performa'] },
  { icon: '🖥️', title: 'Presentasi / Review', desc: 'Memaparkan hasil akhir ke klien', tech: ['PowerPoint','Miro'], details: ['Demo aplikasi','Dapatkan feedback','Approval final klien'] },
];

const docs = [
  { src: '/placeholder1.png', title: 'Analisis Sistem' },
  { src: '/placeholder2.png', title: 'Mockup UI' },
  { src: '/placeholder3.png', title: 'Coding & Database' },
  { src: '/placeholder4.png', title: 'Testing / QA' },
  { src: '/placeholder5.png', title: 'Deploy / Review' },
  { src: '/placeholder6.png', title: 'Final Presentation' },
];

const selectedStep = ref(null);
const selectedDoc = ref(null);

const openDetail = (step) => selectedStep.value = step;
const closeDetail = () => selectedStep.value = null;

const openDoc = (doc) => selectedDoc.value = doc;
const closeDoc = () => selectedDoc.value = null;

const randomPos = () => ({
  top: Math.random() * 100 + "%",
  left: Math.random() * 100 + "%",
  opacity: Math.random() * 0.3
});

onMounted(() => {
  gsap.to(".floating-code", {
    y: "random(-100,100)",
    x: "random(-50,50)",
    duration: "random(10,20)",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: 0.5
  });
});
</script>

<style scoped>
.ppt-container { width:100%; height:100vh; background:#020617; color:#f8fafc; font-family:'JetBrains Mono', monospace; padding:5rem; overflow:hidden; position:relative; }
.code-bg-overlay { position:absolute; width:100%; height:100%; pointer-events:none; }
.floating-code { position:absolute; color:#38bdf8; font-size:0.7rem; font-family:monospace; white-space:nowrap; }
.ppt-title { text-align:center; font-size:2.5rem; color:#38bdf8; text-shadow:0 0 15px rgba(56,189,248,0.4); margin-bottom:2rem; }

/* Grid dua kolom utama */
.slide-grid { display:grid; grid-template-columns:1fr 1fr;  height:70vh; }

/* Step cards kiri 3 kolom */
.steps-column { overflow-y:auto; max-height:100%; border-right:1px solid #38bdf8; padding-right:1rem; }
.steps-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; }
.step-card { background: rgba(15,23,42,0.7); border-radius:12px; padding:0.5rem; cursor:pointer; transition:0.3s; }
.step-card:hover { transform:scale(1.05); box-shadow:0 6px 20px rgba(0,0,0,0.5); border:1px solid #38bdf8; }
.step-icon { font-size:2.5rem; margin-bottom:0.5rem; color:#38bdf8; }
.step-title { font-size:1.2rem; font-weight:700; color:#38bdf8; margin-bottom:0.5rem; }
.step-desc { font-size:0.85rem; color:#cbd5e1; margin-bottom:0.5rem; }
.tech-tags { display:flex; flex-wrap:wrap; gap:0.5rem; }
.tech-pill { background:rgba(56,189,248,0.2); color:#38bdf8; padding:2px 6px; border-radius:6px; font-size:0.7rem; }

/* Dokumentasi kanan 3 kolom */
.docs-column { overflow-y:auto; max-height:100%; border-left:1px solid #38bdf8; padding-left:1rem; }
.docs-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; }
.doc-card { background:rgba(15,23,42,0.7); border-radius:12px; padding:0.5rem; cursor:pointer; transition:0.3s; }
.doc-card img { width:100%; height:100px; object-fit:cover; border-radius:6px; }
.doc-card:hover { transform:scale(1.05); box-shadow:0 6px 20px rgba(0,0,0,0.5); border:1px solid #38bdf8; }
.doc-caption { font-size:0.75rem; color:#38bdf8; text-align:center; margin-top:0.25rem; }

/* Modal */
.full-modal-overlay { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(2,6,23,0.95); display:flex; justify-content:center; align-items:center; z-index:1000; }
.modal-window { background:#0f172a; border-radius:20px; padding:2rem; position:relative; border:1px solid #38bdf8; max-width:80%; max-height:80%; overflow:auto; }
.modal-img { width:100%; border-radius:12px; }
.modal-caption { text-align:center; color:#38bdf8; margin-top:0.5rem; font-size:1rem; }
.close-ppt-btn { position:absolute; top:10px; right:10px; background:#38bdf8; color:#020617; border:none; border-radius:8px; padding:0.5rem 1rem; cursor:pointer; }

/* Modal layout step detail */
.modal-layout { display:grid; grid-template-columns:1fr 1.5fr; gap:2rem; align-items:center; }
.icon-circle { width:200px; height:200px; border:2px dashed rgba(56,189,248,0.3); border-radius:50%; display:flex; justify-content:center; align-items:center; color:#38bdf8; }
.giant-icon { font-size:6rem; }
.modal-main-title { font-size:1.8rem; color:#38bdf8; margin-bottom:1rem; }
.modal-list li { font-size:1rem; margin-bottom:1rem; color:#e2e8f0; list-style:none; }
.list-bullet { color:#38bdf8; background: rgba(56,189,248,0.1); padding:2px 8px; border-radius:4px; margin-right:10px; font-size:0.9rem; }
.tech-stack-row { display:flex; flex-wrap:wrap; gap:0.5rem; margin-top:1rem; }

/* Modal animation */
.modal-zoom-enter-active, .modal-zoom-leave-active { transition: all 0.4s ease; }
.modal-zoom-enter-from { opacity:0; transform:scale(0.95); }
</style>
