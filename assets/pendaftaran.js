// ═══════════════════════════════════════════════
//  pendaftaran.js — Form Pendaftaran Anggota
//  Koperasi Charta Cempaka
// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

  // ── RADIO CARD PEKERJAAN ──────────────────────
  const radioCards = document.querySelectorAll('#pekerjaan-grid .radio-card');

  radioCards.forEach(card => {
    card.addEventListener('click', function () {
      radioCards.forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  // ── PROGRESS BAR (opsional: update saat input diisi) ──
  const requiredInputs = document.querySelectorAll('input[type="text"], input[type="tel"], input[type="date"], textarea');
  const progressFill = document.querySelector('.progress-fill');

  function updateProgress() {
    const total = requiredInputs.length;
    let filled = 0;
    requiredInputs.forEach(input => {
      if (input.value.trim() !== '') filled++;
    });
    // Skala progress: 0% → 33% (kosong) sampai 100% (semua terisi + pekerjaan dipilih)
    const selectedJob = document.querySelector('.radio-card.selected');
    const jobBonus = selectedJob ? 1 : 0;
    const percentage = Math.round(((filled + jobBonus) / (total + 1)) * 100);
    if (progressFill) {
      progressFill.style.width = percentage + '%';
      progressFill.style.transition = 'width 0.3s ease';
    }
  }

  requiredInputs.forEach(input => {
    input.addEventListener('input', updateProgress);
  });

  radioCards.forEach(card => {
    card.addEventListener('click', updateProgress);
  });

  // ── VALIDASI & SUBMIT ─────────────────────────
  const submitBtn = document.getElementById('submit-btn');

  if (submitBtn) {
    submitBtn.addEventListener('click', function () {
      handleSubmit();
    });
  }

  function handleSubmit() {
    let allFilled = true;
    let firstEmpty = null;

    requiredInputs.forEach(input => {
      if (!input.value.trim()) {
        allFilled = false;
        input.style.borderColor = '#E24B4A';
        if (!firstEmpty) firstEmpty = input;
      } else {
        input.style.borderColor = '';
      }
    });

    const selectedJob = document.querySelector('.radio-card.selected');

    if (!allFilled || !selectedJob) {
      if (firstEmpty) firstEmpty.focus();
      if (!selectedJob) {
        document.getElementById('pekerjaan-grid').scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      alert('Mohon lengkapi semua kolom yang wajib diisi sebelum mengirim.');
      return;
    }

    // Semua valid
    alert('Pendaftaran berhasil dikirim!\nTim kami akan menghubungi Anda dalam 1×24 jam.');
  }

  // Expose ke global agar bisa dipanggil dari onclick di HTML juga
  window.handleSubmit = handleSubmit;

});
