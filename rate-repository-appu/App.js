import React from 'react'
import { StatusBar } from 'expo-status-bar'
import Main from './src/components/Main.jsx'
import { NativeRouter } from 'react-router-native'
import { createApolloClient } from './src/utils/apolloClient'
import { ApolloProvider } from '@apollo/client'
import AuthStorage from './src/utils/authStorage.js'
import AuthStorageContext from './src/contexts/AuthStorageContext.js'

const authStorage = new AuthStorage()
const apolloClient = createApolloClient(authStorage)

export default function App () {
  return <>
    <StatusBar style='light' />
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  </>
}
