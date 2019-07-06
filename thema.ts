import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// sample theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#c9c9c9'
    }
  }
})

export default theme
