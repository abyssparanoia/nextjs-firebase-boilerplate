import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { default as OriginalButton, ButtonProps } from '@material-ui/core/Button'
import { Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: theme.spacing(1)
  }
}))

interface Props extends ButtonProps {}

export const Button = (props: Props) => {
  const classes = useStyles({})
  return <OriginalButton {...props} className={classes.button} />
}
