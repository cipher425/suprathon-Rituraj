import { useEffect, useState } from 'react'

type Overlay = { image_id: string; overlay_url: string }

export function RiskMap() {
  const [latest, setLatest] = useState<Overlay | null>(null)
  const api = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

  useEffect(() => {
    fetch(`${api}/risks/summary`)
      .then((r) => r.json())
      .then((data) => {
        const first = (data.summaries || [])[0]
        if (first) {
          fetch(`${api}/risks/images/${first.image_id}`)
            .then((r) => r.json())
            .then((img) => setLatest({ image_id: first.image_id, overlay_url: img.overlay_url }))
        }
      })
  }, [])

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Risk Map</h2>
      {!latest && <div className="text-gray-600">No overlays yet.</div>}
      {latest && (
        <div className="bg-white border rounded p-4">
          <div className="mb-2">Image {latest.image_id.slice(0, 8)}</div>
          <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center text-gray-500">
            Overlay placeholder: {latest.overlay_url}
          </div>
        </div>
      )}
    </div>
  )
}

