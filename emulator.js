const base64ROM = `
TkVTGggQQAAAAAAAAAAAAK0CBdBYqQEgoP+tMwXQBKkJ0AM46QEJwIXPOOlAhc6tMwUYaQHJCtACqQAJEIXQrTMFoAAg7oapIIXTqWCF1O4CBangheKpAYXkjToFSoXSrDMFIK+VhcuEyiBtlKkAhQap/40FBamgjQcFID2CrToF0A/mE6noheGpyIXiqQCNAgVgpdgpBNAUpdgpB9ADTJyBpdgJBIXYqRKNBAWl2Eql/JBf0AulzykPyQnQA0ycgakBIF2Jpfw46QSF/KXLOOkEhcuwAsbKpfzJ/NANqeyF
`.replace(/\s+/g, '');

const romData = Uint8Array.from(atob(base64ROM), c => c.charCodeAt(0));

const canvas = document.getElementById("nes-canvas");
const context = canvas.getContext("2d");
const imageData = context.getImageData(0, 0, 256, 240);

const nes = new jsnes.NES({
  onFrame: function(buffer) {
    for (let i = 0; i < buffer.length; i++) {
      imageData.data[i * 4 + 0] = buffer[i * 4 + 0]; // R
      imageData.data[i * 4 + 1] = buffer[i * 4 + 1]; // G
      imageData.data[i * 4 + 2] = buffer[i * 4 + 2]; // B
      imageData.data[i * 4 + 3] = 255;               // A
    }
    context.putImageData(imageData, 0, 0);
  }
});

nes.loadROM(romData);
nes.start();
