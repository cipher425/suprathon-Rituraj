import { useEffect, useState } from 'react'

type RiskSummary = {
  image_id: string
  timestamp: string
  low_count: number
  medium_count: number
  high_count: number
  max_probability: number
}

export function Overview() {
  const [summaries, setSummaries] = useState<RiskSummary[]>([])
  const api = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

  useEffect(() => {
    fetch(`${api}/risks/summary`)
      .then((r) => r.json())
      .then((data) => setSummaries(data.summaries || []))
      .catch(() => setSummaries([]))
  }, [])

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Recent Risk Summaries</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {summaries.map((s) => (
          <div key={s.image_id} className="bg-white border rounded p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">Image {s.image_id.slice(0, 8)}</div>
              <div className="text-sm text-gray-500">{new Date(s.timestamp).toLocaleString()}</div>
            </div>
            <div className="text-sm text-gray-700">Max Prob: {(s.max_probability * 100).toFixed(1)}%</div>
            <div className="mt-2 text-sm">Low: {s.low_count} • Med: {s.medium_count} • High: {s.high_count}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

