import { createMuiTheme } from 'material-ui/styles'
import { green, red } from 'material-ui/colors'

export default createMuiTheme({
  palette: {
    primary: { main: green[900] },
    secondary: { main: green[600] },
    error: { main: red[700] },
    contrastThreshold: 3,
    tonalOffset: 0.2
  }
})
