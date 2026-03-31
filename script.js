// Data Path (Koordinat) untuk setiap hewan (Contoh Sederhana)
// Untuk hasil maksimal, koordinat ini diambil dari file SVG asli yang kamu buat di Corel/Illustrator
const animalPaths = {
    ayam: "M150,300 C150,150 350,150 350,300 S150,450 150,300 Q100,250 150,100", 
    bangau: "M250,450 L250,250 Q250,100 400,150 T250,50",
    gajah: "M100,250 Q100,100 250,100 T400,250 T250,400 T100,250 M150,250 Q150,350 50,350"
};

const shapeSelect = document.getElementById('shapeSelect');
const textInput = document.getElementById('textInput');
const animalPath = document.getElementById('animalPath');
const kaligrafiTextPath = document.getElementById('kaligrafiTextPath');
const downloadBtn = document.getElementById('downloadBtn');

// Fungsi untuk memperbarui kaligrafi
function updateCalligraphy() {
    const selectedShape = shapeSelect.value;
    const userText = textInput.value;

    // Ubah jalur bentuk
    animalPath.setAttribute('d', animalPaths[selectedShape]);
    
    // Ubah isi teks
    kaligrafiTextPath.textContent = userText;
}

// Event Listeners
shapeSelect.addEventListener('change', updateCalligraphy);
textInput.addEventListener('input', updateCalligraphy);

// Fungsi Download sebagai PNG
downloadBtn.addEventListener('click', () => {
    const svg = document.getElementById('kaligrafiSVG');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    canvas.width = 500;
    canvas.height = 500;
    
    const svgBlob = new Blob([svgData], {type: "image/svg+xml;charset=utf-8"});
    const url = URL.createObjectURL(svgBlob);

    img.onload = function() {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const pngUrl = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "kaligrafi-jawa.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
    img.src = url;
});

// Jalankan saat pertama kali dimuat
updateCalligraphy();
