import { StyleSheet, TextInput } from 'react-native'

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#999',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 5
  },
  error: {
    borderColor: 'red'
  }
})

const StyledTextInput = ({ style, error, ...restOfProps }) => {
  const inputStyle = [
    styles.textInput,
    style,
    error && styles.error
  ]

  return (
    <TextInput style={inputStyle} {...restOfProps} />
  )
}

export default StyledTextInput
