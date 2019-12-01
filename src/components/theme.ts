import { createMuiTheme } from '@material-ui/core/styles'

export const primaryColor = '#FF6F61'

// sample theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: `${primaryColor}`,
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#ffffff',
      contrastText: `${primaryColor}`
    },
    background: {
      paper: '#ffffff',
      default: '#ffffff'
    }
  },
  typography: {
    button: {
      textTransform: 'none'
    },
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 12
  },
  overrides: {
    MuiDivider: {
      root: {
        backgroundColor: `${primaryColor}`
      }
    },
    MuiButton: {
      root: {
        padding: '7px 32px',
        minWidth: '124px'
      },
      label: {
        fontWeight: 600
      }
    },
    MuiTextField: {
      root: {}
    },
    MuiInputBase: {
      root: {
        backgroundColor: '#ffffff !important',
        borderRadius: 4,
        boxShadow: `0 0 6px rgba(255, 111, 97, 0.2)`,
        borderBottom: `1px solid #ffffff`,
        '&:hover': {
          backgroundColor: '#ffffff',
          borderBottom: `1px solid rgba(255, 111, 97, 0.4)`,
          transition: 'all .3s',
          webkitTransition: 'all .3s'
        },
        '&$focused': {
          backgroundColor: '#ffffff',
          borderBottom: `1px solid ${primaryColor}`
        }
      },
      focused: {},
      input: {
        width: 'auto',
        /* https://github.com/mui-org/material-ui/issues/14427 */
        '&:-webkit-autofill': {
          transitionDelay: '9999s',
          transitionProperty: 'background-color, color'
        }
      }
    },
    MuiFormControl: {
      root: {
        width: '100%',
        '&$focused': {
          color: '#000'
        }
      }
    },
    MuiInput: {
      root: {
        width: '100%',
        '&$focused': {
          color: '#000'
        }
      },
      input: {
        paddingTop: 0,
        paddingBottom: 0
      },
      formControl: {
        marginTop: '0 !important',
        padding: '27px 12px 10px 12px'
      }
    },
    MuiFormLabel: {
      root: {
        fontWeight: 400,
        '&$focused': {
          color: 'black'
        }
      },
      focused: {}
    },
    MuiInputLabel: {
      shrink: {
        color: 'black'
      }
    },
    MuiList: {
      root: {
        padding: '10px',
        position: 'absolute',
        bottom: 0,
        width: '100%'
      }
    },
    MuiListItem: {
      root: {
        cursor: 'pointer',
        borderBottom: `1px solid ${primaryColor}`
      }
    },
    MuiListItemText: {
      root: {
        padding: '0',
        fontSize: '16px',
        fontWeight: 600
      }
    }
  }
})

export default theme
