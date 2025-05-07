const canvas = document.getElementById('nes-canvas');
const context = canvas.getContext('2d');
const imageData = context.getImageData(0, 0, 256, 240);

const nes = new jsnes.NES({
  onFrame: function(buffer) {
    for (let i = 0; i < buffer.length; i++) {
      imageData.data[i * 4 + 0] = (buffer[i] >> 16) & 0xFF;
      imageData.data[i * 4 + 1] = (buffer[i] >> 8) & 0xFF;
      imageData.data[i * 4 + 2] = buffer[i] & 0xFF;
      imageData.data[i * 4 + 3] = 0xFF;
    }
    context.putImageData(imageData, 0, 0);
  }
});

// Load the ROM file (e.g., "mario.nes")
fetch('mario.nes')
  .then(response => response.arrayBuffer())
  .then(buffer => {
    const binaryString = new Uint8Array(buffer)
      .reduce((data, byte) => data + String.fromCharCode(byte), '');
    nes.loadROM(binaryString);
    nes.start();
  });
