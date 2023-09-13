const canvas = document.getElementById('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')
const A = { x: 0, y: 0 }
const B = { x: 90, y: 120 }
const C = { x: B.x, y: 0 }

const offset = {
  x: canvas.width / 2,
  y: canvas.height / 2,
}

ctx.translate(offset.x, offset.y)

function lerp(a, b, t) {
  return a + (b - a) * t
}

function drawLine(pos1, pos2) {
  ctx.beginPath()
  ctx.lineWidth = 1
  ctx.strokeStyle = 'black'
  ctx.moveTo(pos1.x, pos1.y)
  ctx.lineTo(pos2.x, pos2.y)
  ctx.stroke()
}

function drawCorditateSystem(ctx, offset) {
  ctx.setLineDash([6, 3])
  ctx.strokeStyle = 'gray'
  drawLine({ x: -offset.x, y: 0 }, { x: ctx.canvas.width - offset.x, y: 0 })
  drawLine({ x: 0, y: -offset.y }, { x: 0, y: ctx.canvas.height - offset.y })
  ctx.setLineDash([])
  ctx.strokeStyle = 'black'
}

function midPoint(p1, p2) {
  return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }
}

function distance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y)
}

function distance(p1, p2) {
  return Math.sqrt(p1.x - p2.x)
}

function drawDot(position) {
  ctx.beginPath()
  ctx.fillStyle = 'black'
  ctx.arc(position.x, position.y, 10, 0, Math.PI * 2)
  ctx.fill()
}
function drawText(label, position, config = {}) {
  config.color = config.color || 'black'
  const { color, bgColor } = config
  console.log(color, bgColor)
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle' // line height
  ctx.font = 'bold 14px sans-serif'
  ctx.fillText(label, position.x, position.y)
  if (bgColor) {
    ctx.strokeStyle = bgColor
    ctx.lineWidth = 7
    ctx.strokeText(label, position.x, position.y)
    ctx.fillText(label, position.x, position.y)
  }
}
function updateFrame() {
  ctx.clearRect(-offset.x, -offset.y, canvas.width, canvas.height)
  drawCorditateSystem(ctx, offset)
  drawLine({ x: A.x, y: A.y }, { x: B.x, y: B.y })
  drawLine({ x: A.x, y: A.y }, { x: C.x, y: C.y })
  drawLine({ x: C.x, y: C.y }, { x: B.x, y: B.y })
  drawText('c' + distance(A, B), midPoint(A, B), { bgColor: 'white' })
  drawText('a', midPoint(C, B), { bgColor: 'white' })
  drawText('b', midPoint(C, A), { bgColor: 'white' })
}

updateFrame()
document.onmousemove = (e) => {
  B.x = e.x - offset.x
  B.y = e.y - offset.y
  C.x = B.x
  updateFrame()
}
