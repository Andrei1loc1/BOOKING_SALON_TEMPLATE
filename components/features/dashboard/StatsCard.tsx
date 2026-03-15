import React from 'react'

const StatsCard = ({ title, count }: { title: string, count: any }) => {
    return (
        <div className='rounded-3xl border-1 p-4 border-gold/25 items-center justify-center flex flex-col gap-2'>
            <div>
                <div><span className='text-xl font-bold text-gold-light'>{count}</span></div>
            </div>
            <div>
                <div>
                    <p className='monospace text-sm text-gray-300 tracking-widest'>{title}</p>
                </div>
            </div>
        </div>
    )
}

export default StatsCard