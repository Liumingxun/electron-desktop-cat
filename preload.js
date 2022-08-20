// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  const catImg = document.getElementById('cat-wrapper')
  const switchCat = number => catImg.src = `./public/cat-${number}.gif`
  ipcRenderer.on('change-cat', (ev, number) => {
    switchCat(number)
  })
})
