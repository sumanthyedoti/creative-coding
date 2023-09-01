const canvas = document.getElementById('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')
const A = { x: 100, y: 300 }
const B = { x: 400, y: 100 }
const orange = { r: 230, g: 150, b: 0 }
const blue = { r: 0, g: 70, b: 160 }
const lowFreq = 200
const heightFreq = 600

function drawDot(position, label) {
  ctx.beginPath()
  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'black'
  ctx.arc(position.x, position.y, 10, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()
  ctx.fillStyle = 'black'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle' // line height
  ctx.font = 'bold 14px sans-serif'
  ctx.fillText(label, position.x, position.y)
}

drawDot(A, 'A')
drawDot(B, 'B')

function lerp(a, b, t) {
  return a + (b - a) * t
}
function lerpV(A, B, t) {
  const res = {}
  for (let a in A) {
    res[a] = lerp(A[a], B[a], t)
  }
  return res
}

let audioCtx = null
let osc = null
function initializeAudioContext() {
  // audio context can not be initiated without user interaction
  if (audioCtx == null) {
    audioCtx = new (AudioContext || webkitAudioContext)()
    osc = audioCtx.createOscillator()
    osc.start()
    const gainNode = audioCtx.createGain()
    gainNode.gain.value = 0.05
    osc.connect(gainNode)
    gainNode.connect(audioCtx.destination)
  }
}
canvas.onclick = function () {
  initializeAudioContext()
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const tsFraction1000 = new Date().getTime() / 1000 // timestamp / 1000
  const t = (Math.sin(tsFraction1000 * Math.PI) + 1) / 2
  drawDot(lerpV(A, B, t), '')
  drawDot(A, 'A')
  drawDot(B, 'B')
  const { r, g, b } = lerpV(orange, blue, t)
  canvas.style.backgroundColor = `rgb(${r},${g},${b})`
  if (osc) {
    osc.frequency.value = lerp(lowFreq, heightFreq, t)
  }
  requestAnimationFrame(animate)
}
animate()
