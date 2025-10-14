'use client'

import { useState } from 'react'
import { ApiTimePeriod } from '@/lib/api'

interface TimeWheelProps {
  timePeriods: ApiTimePeriod[]
  currentTimePeriod: ApiTimePeriod
  onTimePeriodChange: (period: ApiTimePeriod) => void
}

export default function TimeWheel({
  timePeriods,
  currentTimePeriod,
  onTimePeriodChange,
}: TimeWheelProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="fixed bottom-8 right-8 z-40">
      {/* Compact view */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all flex items-center gap-2"
        >
          <span className="text-2xl">🕐</span>
          <div className="text-left">
            <p className="text-xs opacity-80">Time Period</p>
            <p className="font-bold text-sm">{currentTimePeriod.name}</p>
          </div>
        </button>
      )}

      {/* Expanded view */}
      {isExpanded && (
        <div className="bg-white rounded-lg shadow-2xl p-4 w-80 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Select Time Period</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2">
            {timePeriods.map((period) => (
              <button
                key={period.id}
                onClick={() => {
                  onTimePeriodChange(period)
                  setIsExpanded(false)
                }}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  currentTimePeriod.id === period.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                <p className="font-bold">{period.name}</p>
                <p className="text-sm opacity-80">
                  {period.yearStart < 0 ? `${Math.abs(period.yearStart)} BCE` : period.yearStart} -{' '}
                  {period.yearEnd < 0 ? `${Math.abs(period.yearEnd)} BCE` : period.yearEnd}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}
