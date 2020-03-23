import React, { useCallback } from 'react'
import { ExNextPageContext } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { signInWithGoogle } from 'src/modules/auth'
import { ReduxStore } from 'src/modules/reducer'
import { redirect } from 'src/modules/services'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import LockIcon from '@material-ui/icons/LockOutlined'
import { Progress } from 'src/components/moleclues/Progress'
import GoogleButton from 'react-google-button'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      [theme.breakpoints.up(400 + theme.spacing(6))]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(16),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing(5)}px ${theme.spacing(3)}px ${theme.spacing(5)}px`,
    },
    space: {
      height: 50,
    },
    avatar: {
      margin: theme.spacing(2),
      backgroundColor: theme.palette.secondary.main,
    },
  })
)

type Props = {}

const SignIn = (_: Props) => {
  const { isLoading } = useSelector(({ auth }: ReduxStore) => ({
    isLoading: auth.isLoading,
  }))

  const dispatch = useDispatch()

  const handleSignInWithGoogle = useCallback(() => dispatch(signInWithGoogle()), [dispatch])

  const classes = useStyles()

  return (
    <main className={classes.main}>
      {isLoading && <Progress />}
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className={classes.space} />
        <GoogleButton onClick={handleSignInWithGoogle} />
      </Paper>
    </main>
  )
}

SignIn.getInitialProps = async (ctx: ExNextPageContext): Promise<void> => {
  const { store } = ctx
  // redirect when already authenticated
  if (store.getState().auth.credential) {
    redirect(ctx, '/')
  }
}

export default SignIn
