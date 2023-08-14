import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { Provider } from 'react-redux'
import { legacy_createStore as createStore } from 'redux'
import allReducers from '@/redux/reducers/index'

export function Providers({ children }: { children: React.ReactNode }) {
  const store = createStore(allReducers)
  return (
    <NextUIProvider>
      <Provider store={store}>
        <NextThemesProvider attribute='class'>{children}</NextThemesProvider>
      </Provider>
    </NextUIProvider>
  )
}
