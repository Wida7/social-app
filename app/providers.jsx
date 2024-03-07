'use client'

import {NextUIProvider} from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "../store/store"
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist"


export default function Providers({children}) {

  const persistor = persistStore(store)

  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <NextUIProvider>
          <Toaster toastOptions={{
              style:{
                background: 'rgb(51 65 85)',
                color: '#fff'
              }
            }} />        
            {children}
        </NextUIProvider>
      </Provider>
    </PersistGate>
  )
}