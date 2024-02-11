import { Platform } from 'react-native'

const theme = {
  appBar: {
    primary: '#24292e',
    textPrimary: Platform.select({
      android: 'green',
      default: 'purple'
    }),
    textSecondary: '#999'
  },
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    secondary: '#666',
    white: '#fefefe'
  },
  fontSizes: {
    body: 14,
    subHeading: 16,
    small: 12
  },
  fonts: {
    main: 'System'
  },
  fontWeights: {
    normal: '400',
    bold: '700'
  },
  textAligns: {
    center: 'center'
  }
}

export default theme
