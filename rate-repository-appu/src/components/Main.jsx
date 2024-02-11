import { View } from 'react-native'
import RepositoryList from './RepositoryList'
import { Route, Routes, Navigate } from 'react-router-native'
import AppBar from './AppBar' // React Native detecta autmaticamente el SO y asigna el archivo correspondiente
import LogInPage from '../pages/LogInPage.jsx'
import RepositoryView from './RepositoryView'
import ReviewForm from './ReviewForm'
import SignUpform from './SignUpForm'
import UserReviewsView from './UserReviewsView'

// Para cuando las librearias no las creamos nosotros >>>
// import { Platform } from 'react-native'
// const AppBar = Platform.select({
//   android: () => require('./AppBar.android.jsx').default,
//   default: () => require('./AppBar.jsx').default
// })()

const Main = () => {
  return (
    <View style={{ flex: 1 }}>
        <AppBar />
        <Routes>
          <Route path='/' element={<RepositoryList />} exact />
          <Route path='/me' element={<UserReviewsView />} exact />
          <Route path='/:repoId' element={<RepositoryView />} exact />
          <Route path='/signIn' element={<LogInPage />} exact />
          <Route path='/signUp' element={<SignUpform />} exact />
          <Route path='/reviewForm' element={<ReviewForm />} exact />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    </View>
  )
}

export default Main
