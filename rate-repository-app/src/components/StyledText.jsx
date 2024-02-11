import { Text, StyleSheet } from 'react-native'
import theme from '../utils/theme.js'

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal
  },
  colorPrimary: {
    color: theme.colors.primary
  },
  colorSecondary: {
    color: theme.colors.secondary
  },
  bold: {
    fontWeight: theme.fontWeights.bold
  },
  subHeading: {
    fontSize: theme.fontSizes.subHeading
  },
  textAlignCenter: {
    textAlign: theme.textAligns.center
  }
})

export default function StyledText ({ align, children, color, fontSize, fontWeight, style = {}, ...restOfProps }) {
  const textStyles = [
    styles.text,
    align === 'center' && styles.textAlignCenter,
    color === 'primary' && styles.colorPrimary,
    color === 'secondary' && styles.colorSecondary,
    fontSize === 'subHeading' && styles.subHeading,
    fontWeight === 'bold' && styles.bold,
    style
  ]

  return (
        <Text style={textStyles} {...restOfProps}>
            {children}
        </Text>
  )
}
