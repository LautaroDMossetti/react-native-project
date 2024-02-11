import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { LogInPageContainer } from '../../pages/LogInPage'

describe('LogIn', () => {
  describe('LogInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const error = ''
      const onSubmit = jest.fn()

      const component = render(<LogInPageContainer onSubmit={onSubmit} error={error} />)

      fireEvent.changeText(component.getByPlaceholderText('Username or E-mail'), 'kalle')
      fireEvent.changeText(component.getByPlaceholderText('Password'), 'password')
      fireEvent.press(component.getByText('Log In'))

      await waitFor(() => {
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password'
        })
      })
    })
  })
})
