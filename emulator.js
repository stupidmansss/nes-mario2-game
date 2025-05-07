const canvas = document.getElementById('nes-canvas');
const ctx = canvas.getContext('2d');
const imageData = ctx.getImageData(0, 0, 256, 240);

const nes = new jsnes.NES({
  onFrame: function(frameBuffer) {
    for (let i = 0; i < frameBuffer.length; i++) {
      imageData.data[i * 4 + 0] = (frameBuffer[i] >> 16) & 0xFF; // Red
      imageData.data[i * 4 + 1] = (frameBuffer[i] >> 8) & 0xFF;  // Green
      imageData.data[i * 4 + 2] = frameBuffer[i] & 0xFF;         // Blue
      imageData.data[i * 4 + 3] = 0xFF;                          // Alpha
    }
    ctx.putImageData(imageData, 0, 0);
  },
  onStatusUpdate: function() {},
  onAudioSample: function() {}
});

fetch('mario.nes')
  .then(response => response.arrayBuffer())
  .then(buffer => {
    const romData = new Uint8Array(buffer);
    nes.loadROM(romData);
    nes.start();
  })
  .catch(err => {
    console.error("Failed to load ROM:", err);
  });
