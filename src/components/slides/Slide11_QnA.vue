<template>
  <div class="ppt-slide-wrapper">
    <div class="slide-viewport">
      
      <div class="qa-container">
        <!-- SISI KIRI: VISUAL INTERAKTIF -->
        <div class="visual-brain">
          <div class="brain-container">
            <div class="neural-pulse"></div>
            <div class="brain-icon">💬</div>
            <div class="orbit-1"></div>
            <div class="orbit-2"></div>
          </div>
          <div class="brain-status">
            <span class="status-dot"></span>
            NEURAL_ASSISTANT: WAITING_FOR_INPUT...
          </div>
        </div>

        <!-- SISI KANAN: TEKS UTAMA -->
        <div class="qa-content">
          <h1 class="qa-title">Ada <span class="accent">Pertanyaan</span>?</h1>
          <p class="qa-subtitle">Jangan malu bertanya, Neural Network saja belajar dari kesalahan, apalagi kita!</p>
          
          <div class="suggestion-tags">
            <span class="tag">#BagaimanaCaraKerjanya?</span>
            <span class="tag">#ApakahAI berbahaya?</span>
            <span class="tag">#MasaDepanNN</span>
          </div>

          <div class="fun-fact">
            <span class="light-bulb">💡</span>
            <p><strong>Fun Fact:</strong> Neuron di otak manusia mencapai 86 miliar, sedangkan model AI terbesar saat ini sudah mulai mendekatinya!</p>
          </div>
        </div>
      </div>

      <!-- FOOTER SOSIAL MEDIA -->
      <div class="qa-footer">
        <div class="social-item">📸 @Kelompok7</div>
        <div class="social-item">💻 ://PengantarInformatika</div>
        <div class="social-item">✨ STIMIK DCI</div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.ppt-slide-wrapper {
  width: 100vw; height: 100vh;
  background: #020617;
  display: flex; justify-content: center; align-items: center;
  font-family: 'Plus Jakarta Sans', sans-serif; color: white;
}

.slide-viewport {
  width: 90vw; aspect-ratio: 16 / 9;
  background: radial-gradient(circle at top right, rgba(99, 102, 241, 0.15), transparent),
              radial-gradient(circle at bottom left, rgba(56, 189, 248, 0.1), transparent),
              #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 40px;
  position: relative; overflow: hidden;
  display: flex; flex-direction: column;
}

.qa-container {
  display: grid; grid-template-columns: 1fr 1.2fr;
  height: 85%; align-items: center; padding: 0 5rem;
}

/* VISUAL BRAIN ANIMATION */
.visual-brain { display: flex; flex-direction: column; align-items: center; gap: 2rem; }
.brain-container {
  position: relative; width: 250px; height: 250px;
  display: flex; align-items: center; justify-content: center;
}
.brain-icon { font-size: 6rem; z-index: 10; animation: float 3s infinite ease-in-out; }

.neural-pulse {
  position: absolute; width: 100%; height: 100%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%);
  border-radius: 50%; animation: pulse-glow 2s infinite;
}

.orbit-1, .orbit-2 {
  position: absolute; border: 2px dashed rgba(56, 189, 248, 0.3);
  border-radius: 50%;
}
.orbit-1 { width: 120%; height: 120%; animation: rotate 10s linear infinite; }
.orbit-2 { width: 150%; height: 150%; animation: rotate 15s linear infinite reverse; }

.brain-status {
  font-family: 'JetBrains Mono', monospace; font-size: 1rem;
  background: rgba(0,0,0,0.3); padding: 10px 20px; border-radius: 50px;
  display: flex; align-items: center; gap: 10px; color: #38bdf8;
}
.status-dot { width: 10px; height: 10px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 10px #22c55e; animation: blink 1s infinite; }

/* CONTENT Q&A */
.qa-title { font-size: 5rem; font-weight: 900; margin: 0; line-height: 1; }
.accent { color: #38bdf8; text-shadow: 0 0 30px rgba(56, 189, 248, 0.5); }
.qa-subtitle { font-size: 1.8rem; color: #cbd5e1; margin: 1.5rem 0; line-height: 1.4; }

.suggestion-tags { display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 3rem; }
.tag {
  background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.3);
  padding: 8px 20px; border-radius: 12px; font-size: 1.1rem; color: #a5b4fc;
}

.fun-fact {
  background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 20px;
  display: flex; align-items: flex-start; gap: 15px; border-left: 5px solid #f59e0b;
}
.light-bulb { font-size: 2rem; }
.fun-fact p { margin: 0; font-size: 1.1rem; color: #94a3b8; }

/* FOOTER */
.qa-footer {
  margin-top: auto; padding: 2rem 5rem;
  background: rgba(0,0,0,0.2); display: flex; justify-content: space-between;
  border-top: 1px solid rgba(255,255,255,0.05);
}
.social-item { font-size: 1.2rem; color: #64748b; font-weight: bold; }

/* ANIMATIONS */
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
@keyframes pulse-glow { 0% { transform: scale(0.8); opacity: 0.3; } 50% { transform: scale(1.1); opacity: 0.6; } 100% { transform: scale(0.8); opacity: 0.3; } }
@keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

/* RESPONSIVE */
@media (max-width: 1200px) {
  .qa-title { font-size: 3.5rem; }
  .qa-container { grid-template-columns: 1fr; text-align: center; }
  .visual-brain { display: none; }
  .suggestion-tags { justify-content: center; }
}
</style>
