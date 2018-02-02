import {
  lightGreen500, lightGreen700,
  lightGreenA400,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack
} from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'
import spacing from 'material-ui/styles/spacing'

export default {
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: lightGreen500,
    primary2Color: lightGreen700,
    primary3Color: grey400,
    accent1Color: lightGreenA400,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    secondaryTextColor: fade(darkBlack, 0.54),
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: lightGreen500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack
  }
}
