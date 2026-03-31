// Mengambil elemen-elemen DOM yang diperlukan
const shapeSelect = document.getElementById('shapeSelect');
const textInput = document.getElementById('textInput');
const textPathElement = document.getElementById('textPathElement');
const downloadBtn = document.getElementById('downloadBtn');
const calligraphySVG = document.getElementById('calligraphySVG');

// Fungsi utama untuk memperbarui kaligrafi
function updateCalligraphy() {
    // 1. Ambil nilai input dari user
    const selectedShape = shapeSelect.value;
    const userText = textInput.value;

    // 2. Ubah atribut 'href' pada <textPath> untuk menunjuk ke jalur hewan yang baru
    // Kita menambahkan prefiks '#path_' agar sesuai dengan ID di SVG
    textPathElement.setAttribute('href', '#path_' + selectedShape);
    
    // 3. Masukkan teks Aksara Jawa ke dalam <textPath>
    textPathElement.textContent = userText;
}

// Menambahkan event listener agar kaligrafi langsung berubah saat user berinteraksi
shapeSelect.addEventListener('change', updateCalligraphy);
textInput.addEventListener('input', updateCalligraphy); // 'input' lebih responsif daripada 'change'

// === Logika untuk Mengunduh Gambar (PNG) ===
// Proses ini mengubah SVG menjadi Canvas, lalu Canvas menjadi gambar PNG.
downloadBtn.addEventListener('click', () => {
    // 1. Serialize (ubah) elemen SVG menjadi string teks XML
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(calligraphySVG);

    // 2. Buat objek Canvas di memori
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Mengambil dimensi asli SVG (viewBox)
    const viewBox = calligraphySVG.viewBox.baseVal;
    canvas.width = viewBox.width;
    canvas.height = viewBox.height;

    // 3. Buat objek Gambar di memori dan muat string SVG ke dalamnya
    const img = new Image();
    const svgBlob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(svgBlob);

    // 4. Setelah gambar SVG dimuat ke objek Gambar
    img.onload = function() {
        // Gambar latar belakang putih penuh pada canvas
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Gambar SVG di atas latar belakang putih
        ctx.drawImage(img, 0, 0);

        // Ubah canvas menjadi data URL PNG
        const pngUrl = canvas.toDataURL('image/png');

        // Buat elemen link unduhan palsu dan 'klik' secara otomatis
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'kaligrafi-aksara-jawa.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        // Bersihkan URL objek untuk menghemat memori
        URL.revokeObjectURL(url);
    };

    // Mulai memuat gambar
    img.src = url;
});

// Jalankan fungsi update sekali saat halaman pertama kali dimuat
updateCalligraphy();
