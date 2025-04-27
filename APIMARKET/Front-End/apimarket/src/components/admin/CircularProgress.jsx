"use client"

function CircularProgress({ value, color, trackColor, size = 120, strokeWidth = 8 }) {
  const radius = size / 2 - strokeWidth * 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="transition-all duration-300"
          strokeWidth={strokeWidth}
          stroke={trackColor || "#f1f5f9"} 
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="transition-all duration-500"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke={color}  
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transition: "stroke-dashoffset 1s ease 0s, stroke 0.5s ease",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
      </svg>
      <span className="absolute text-2xl font-bold" style={{ color }}>
        {value}
      </span>
    </div>
  )
}

export default CircularProgress;