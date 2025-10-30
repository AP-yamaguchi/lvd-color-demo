import { useState, useEffect } from 'react'
import './App.css'

interface Color {
  name: string
  hex: string
  rgb: string
}

const colors: Color[] = [
  { name: '赤', hex: '#FF0000', rgb: '255, 0, 0' },
  { name: '橙', hex: '#FF7F00', rgb: '255, 127, 0' },
  { name: '黄', hex: '#FFFF00', rgb: '255, 255, 0' },
  { name: '緑', hex: '#00FF00', rgb: '0, 255, 0' },
  { name: '青', hex: '#0000FF', rgb: '0, 0, 255' },
  { name: '藍', hex: '#4B0082', rgb: '75, 0, 130' },
  { name: '紫', hex: '#9400D3', rgb: '148, 0, 211' },
]

function App() {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null)

  // Wake Lock APIでスリープ防止
  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          const lock = await navigator.wakeLock.request('screen')
          setWakeLock(lock)
          console.log('Wake Lock activated')
        }
      } catch (err) {
        console.error('Wake Lock error:', err)
      }
    }

    requestWakeLock()

    // クリーンアップ
    return () => {
      if (wakeLock) {
        wakeLock.release()
        console.log('Wake Lock released')
      }
    }
  }, [])

  const selectedColor = colors[selectedColorIndex]

  return (
    <div
      className="app-container"
      style={{ backgroundColor: selectedColor.hex }}
    >
      <div className="color-buttons">
        {colors.map((color, index) => (
          <button
            key={color.hex}
            className={`color-button ${index === selectedColorIndex ? 'active' : ''}`}
            style={{ backgroundColor: color.hex }}
            onClick={() => setSelectedColorIndex(index)}
            aria-label={color.name}
          >
            <span className="color-name">{color.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default App
