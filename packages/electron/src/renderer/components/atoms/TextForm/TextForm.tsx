import React from 'react'
import { TextField } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment'
import { Icon, Variant as IconVariant } from '../../nano/Icon'

export interface TextFormProps {
  value?: string | number
  name?: string
  required?: boolean
  disabled?: boolean
  error?: boolean
  readOnly?: boolean
  label?: string
  type?: 'password' | 'search' | 'number'
  defaultValue?: string | number
  autoComplete?: string
  helperText?: string
  placeholder?: string
  iconVariant?: IconVariant
  iconCursor?: 'pointer'
  fullWidth?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onClickIcon?: () => void
}

export const TextForm: React.FC<TextFormProps> = ({
  value,
  name,
  required,
  disabled,
  error,
  readOnly,
  label,
  type,
  defaultValue,
  autoComplete,
  helperText,
  iconVariant,
  iconCursor,
  placeholder,
  fullWidth,
  onChange,
  onClickIcon
}) => {
  return (
    <TextField
      value={value}
      name={name}
      required={required}
      disabled={disabled}
      error={error}
      label={label}
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      autoComplete={autoComplete}
      helperText={helperText}
      fullWidth={fullWidth}
      onChange={onChange}
      InputProps={{
        readOnly,
        endAdornment: iconVariant && (
          <InputAdornment position="start" style={{ cursor: iconCursor }} onClick={onClickIcon}>
            <Icon width={24} height={24} variant={iconVariant} />
          </InputAdornment>
        )
      }}
    />
  )
}
