const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const logoAssets = new Map([
  [
    '/images/LOGO-green.png',
    {
      base64:
        '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',
      filename: 'LOGO-green.png',
    },
  ],
  [
    '/images/logo-favicon.png',
    {
      base64:
        'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABG0lEQVR4nO3ZwW0CUQwG4ZAzlJU0A+WkGtpKAcmJCwIBeba/SPtPAevxsFoey25//Ph52zDvWkCTAFpAkwBaQJMAWkCTAFpAwwN8f53pfBrgsryMwAJcL60ikAD3lhURxgM8WnI6wmiAZ5ebjDAW4NWlpiKMBPjrMhMR2gOsLtEdgR+ENK0Bqj69zrugLUC1dFeElgBdsh3XLQ/Q/dCqvn5pgKnv7so5ZQGmj7BV80oCqF9yFXOXA+gXGqvzlwLo5S+seOy6/xytiHQ4fRaY3CZHYS2gSQAtoEkALaBJAC2gSQAtoEkALaBJAC2g2XyA9vcB/53N3wEJoAU0CaAFNAmgBTQJoAU0CaAFNAmgBTQJoAU0CaAFNJsP8AtX91eSNzLGlgAAAABJRU5ErkJggg==',
      filename: 'logo-favicon.png',
    },
  ],
]);

for (const [route, { base64, filename }] of logoAssets.entries()) {
  app.get(route, (req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.type(path.extname(filename).slice(1));
    res.send(Buffer.from(base64, 'base64'));
  });
}

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
