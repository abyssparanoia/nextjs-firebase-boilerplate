import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { Link } from 'src/components/atoms'
import { Credential } from 'src/firebase/interface'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

interface Props {
  credential?: Credential
  handleSignOut: () => void
}

export const MenuAppBar = ({ credential, handleSignOut }: Props) => {
  const classes = useStyles({})
  const [anchorEl, setAnchorEl] = React.useState<(EventTarget & HTMLButtonElement) | undefined>(undefined)
  const open = Boolean(anchorEl)

  const handleMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setAnchorEl(e.currentTarget)

  const handleClose = () => setAnchorEl(undefined)

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link href="/">NextJS Firebase Boilerplate</Link>{' '}
          </Typography>
          {credential && (
            <div>
              <IconButton
                aria-label="Account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem>
                  <Link href="/login_required">
                    <a>Login Required</a>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          )}
          {!credential && <Link href="/sign_in">SignIn</Link>}
        </Toolbar>
      </AppBar>
    </div>
  )
}
