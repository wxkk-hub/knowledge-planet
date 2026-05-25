import { useState, useEffect, useRef } from 'react'

const bannerImages = [
  {
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=768&h=320&fit=crop',
    title: '精品课程限时特惠',
    subtitle: '全场 7 折，开启你的学习之旅'
  },
  {
    url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=768&h=320&fit=crop',
    title: 'AI 时代必备技能',
    subtitle: 'ChatGPT 提示词工程限时免费'
  },
  {
    url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=768&h=320&fit=crop',
    title: '高效学习方法论',
    subtitle: '10 年学霸的经验之谈'
  }
]

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % bannerImages.length)
    }, 4000)
    return () => clearInterval(timerRef.current)
  }, [])

  return (
    <div className="px-4 pt-4 pb-2">
      <div className="relative rounded-xl overflow-hidden shadow-sm">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
          {bannerImages.map((banner, i) => (
            <div key={i} className="min-w-full relative">
              <img src={banner.url} alt={banner.title} className="w-full h-40 object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex flex-col justify-center px-6">
                <h2 className="text-white text-lg font-bold">{banner.title}</h2>
                <p className="text-white/80 text-sm mt-1">{banner.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {bannerImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? 'bg-white w-4' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
