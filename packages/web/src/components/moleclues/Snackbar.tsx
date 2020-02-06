import React, { SyntheticEvent, useState } from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import { default as MuiSnackbar, SnackbarProps } from '@material-ui/core/Snackbar'
import WarningIcon from '@material-ui/icons/Warning'
import { SnackbarContent } from 'src/components/atoms/SnackbarContent'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
}

interface IProps extends Omit<SnackbarProps, 'open'> {
  message: string
  variant: keyof typeof variantIcon
  open?: boolean
  onClose?: () => void
}

export const Snackbar = ({ message, variant, onClose, open }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(open || true)

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    if (onClose) onClose()
    setIsOpen(false)
  }

  return (
    <MuiSnackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <SnackbarContent onClose={handleClose} variant={variant} message={message} />
    </MuiSnackbar>
  )
}
