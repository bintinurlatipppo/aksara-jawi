const shapeSelect = document.getElementById('shapeSelect');
const textInput = document.getElementById('textInput');
const fontSizeInput = document.getElementById('fontSize');
const textTarget = document.getElementById('textTarget');
const downloadBtn = document.getElementById('downloadBtn');
const svgElement = document.getElementById('calligraphySVG');

// Fungsi untuk memperbarui tampilan
function updatePreview() {
    const shape = shapeSelect.value;
    const text = textInput.value;
    const fSize = fontSizeInput.value;

    // Ganti Path Hewan
    textTarget.setAttribute('href', '#path_' + shape);
    
    // Ganti Teks (Ulangi teks agar memenuhi jalur jika terlalu pendek)
    // Kita tambahkan spasi di antara pengulangan
    const repeatedText = (text + "   ").repeat(5); 
    textTarget.textContent = repeatedText;

    // Ganti Ukuran Font
    textTarget.parentElement.setAttribute('font-size', fSize);
}

// Event Listeners
shapeSelect.addEventListener('change', updatePreview);
textInput.addEventListener('input', updatePreview);
fontSizeInput.addEventListener('input', updatePreview);

// Fungsi Unduh Gambar sebagai PNG
downloadBtn.addEventListener('click', () => {
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    // Set resolusi tinggi untuk hasil unduhan
    canvas.width = 1200;
    canvas.height = 1200;

    const svgBlob = new Blob([svgData], {type: "image/svg+xml;charset=utf-8"});
    const url = URL.createObjectURL(svgBlob);

    img.onload = function() {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, 1200, 1200);
        
        const pngUrl = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `kaligrafi-${shapeSelect.value}.png`;
        downloadLink.click();
        URL.revokeObjectURL(url);
    };
    img.src = url;
});

// Inisialisasi saat pertama kali buka
window.onload = updatePreview;
