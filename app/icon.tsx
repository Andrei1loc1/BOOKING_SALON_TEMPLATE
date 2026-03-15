import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: 'linear-gradient(135deg, #8B6914, #D4A017, #C8960C)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Scissors SVG path from Lucide */}
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0e0e0e"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="6" cy="6" r="3" />
                    <circle cx="6" cy="18" r="3" />
                    <line x1="20" y1="4" x2="8.12" y2="15.88" />
                    <line x1="14.47" y1="14.48" x2="20" y2="20" />
                    <line x1="8.12" y1="8.12" x2="12" y2="12" />
                </svg>
            </div>
        ),
        { ...size },
    )
}
