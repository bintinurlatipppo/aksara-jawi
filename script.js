const shapeSelect = document.getElementById('shapeSelect');
const textInput = document.getElementById('textInput');
const targetPath = document.getElementById('targetPath');

function update() {
    // Ganti bentuk hewan
    targetPath.setAttribute('href', '#path_' + shapeSelect.value);
    
    // Ganti teks (pastikan teks tidak kosong)
    const text = textInput.value;
    targetPath.textContent = text + " " + text + " " + text; // Kita ulangi agar membentuk garis utuh
}

shapeSelect.addEventListener('change', update);
textInput.addEventListener('input', update);

// Jalankan saat pertama load
window.onload = update;

// Fitur Download
document.getElementById('downloadBtn').addEventListener('click', () => {
    const svg = document.getElementById('svgCanvas');
    const xml = new XMLSerializer().serializeToString(svg);
    const svg64 = btoa(unescape(encodeURIComponent(xml)));
    const b64Start = 'data:image/svg+xml;base64,';
    const image64 = b64Start + svg64;

    const link = document.createElement('a');
    link.download = 'kaligrafi.svg'; // Simpan sebagai SVG agar kualitas tetap tajam
    link.href = image64;
    link.click();
});
