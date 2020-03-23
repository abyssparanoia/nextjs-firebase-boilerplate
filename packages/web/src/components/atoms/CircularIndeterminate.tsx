import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { default as MuiCircularProgress, CircularProgressProps } from '@material-ui/core/CircularProgress'

interface ICircularProgressProps extends CircularProgressProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      margin: theme.spacing(2),
    },
  })
)

export const CircularIndeterminate = (props: ICircularProgressProps): JSX.Element => {
  const classes = useStyles()
  return <MuiCircularProgress className={classes.progress} {...props} />
}
