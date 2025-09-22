'use client'

import { useEffect } from 'react'

export default function GoogleAdSense({ adClient }: { adClient: string }) {
  const My_Pub_ID='ca-pub-1241486495309147'
  useEffect(() => {
    try {
      const script = document.createElement('script')
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`
      script.async = true
      script.crossOrigin = 'anonymous'
      document.head.appendChild(script)
    } catch (err) {
      console.error('Error appending AdSense script:', err)
    }
  }, [adClient])

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('Error pushing AdSense:', err)
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={adClient}
      data-ad-slot="1716775182"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}

