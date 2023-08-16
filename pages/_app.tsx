'use client'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Providers } from '@/components/Provider'
import { appWithTranslation } from 'next-i18next'

function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  )
}

export default appWithTranslation(App)
