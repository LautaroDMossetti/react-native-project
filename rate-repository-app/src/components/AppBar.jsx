import { ScrollView, StyleSheet, View, Text, Pressable, Platform } from 'react-native'
import { Link, useLocation } from 'react-router-native'
import { useMe } from '../hooks/useMe.js'
import { useSignOut } from '../hooks/useSignOut.js'
import StyledText from './StyledText.jsx'
import Constants from 'expo-constants'
import theme from '../utils/theme.js'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.appBar.primary,
    paddingTop: Constants.statusBarHeight + 10
  },
  text: {
    color: theme.appBar.textSecondary,
    paddingLeft: 10
  },
  scroll: {
    paddingBottom: 15
  },
  active: {
    color: theme.appBar.textPrimary
  }
})

const AppBarTab = ({ children, to }) => {
  const { pathname } = useLocation()
  const active = pathname === to

  const textStyles = [
    styles.text,
    active && styles.active
  ]

  return (
    <Link to={to}>
      <StyledText fontWeight='bold' style={textStyles} >
        {children}
      </StyledText>
    </Link>
  )
}

const AppBar = () => {
  const auth = useMe()
  const signOut = useSignOut()

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scroll}>
        <AppBarTab to='/'>Repositories</AppBarTab>
        {auth
          ? <>
              <AppBarTab to='/reviewForm'>Write a review</AppBarTab>
              <AppBarTab to='/me'>My reviews</AppBarTab>
              <Pressable onPress={() => signOut()}><StyledText fontWeight='bold' style={styles.text}>Sing out</StyledText></Pressable>
            </>
          : <>
              <AppBarTab to='/signIn'>Sing in</AppBarTab>
              <AppBarTab to='/signUp'>Sign up</AppBarTab>
            </>
        }
        <Text style={styles.text} >AppBar version {Platform.OS}</Text>
      </ScrollView>
    </View>
  )
}

export default AppBar
