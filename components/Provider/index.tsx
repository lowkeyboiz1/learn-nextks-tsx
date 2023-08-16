import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { store } from '@/redux/reducers/store'
import { Provider } from 'react-redux'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <Provider store={store}>
        <NextThemesProvider attribute='class'>{children}</NextThemesProvider>
      </Provider>
    </NextUIProvider>
  )
}
