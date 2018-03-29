import { createMuiTheme } from 'material-ui/styles'
import { red, common } from 'material-ui/colors'


const fontFamily = '"Noto Sans Japanese", sans-serif'
const theme = createMuiTheme()

export default createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    error: red,
  },
  overrides: {
    MuiFormControl: {
      root: {
        marginBottom: '15px',
      },
    },
    MuiAvatar: {
      colorDefault: common.white,
    },
  },
  typography: {
    fontFamily,
    fontSize: 14,
    display3: {
      // color: 'black',
      // fontWeight: 'bold',
    },
    headline: {
      // fontWeight: 600,
    },
    title: {
      // marginBottom: '10px',
      // fontSize: '18px',
      fontWeight: 'bold',
    },
    subheading: {
      // lineHeight: '24px',
      // fontSize: '13px',
      // fontWeight: 200,
      [theme.breakpoints.up('sm')]: {
        // lineHeight: '28px',
        // fontSize: '15px',
      },
    },
    body1: {
      // lineHeight: '28px',
      // fontSize: '16px',
      // fontWeight: 200,
      // marginBottom: '50px',
      [theme.breakpoints.up('sm')]: {
        // lineHeight: '32px',
        // fontSize: '18px',
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 54,
      [theme.breakpoints.up('sm')]: {
        minHeight: 54,
      },
    },
  },
})
