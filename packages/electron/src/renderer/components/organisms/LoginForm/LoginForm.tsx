import React from 'react'
import { useFormik } from 'formik'
import { Box } from '@material-ui/core'
import { TextForm } from '../../atoms'
import { useDispatch } from 'react-redux'
import { routerOperations } from '@renderer/states/modules/router'

export const LoginForm = () => {
  const dispatch = useDispatch()
  const { values, handleChange, errors } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: values => {
      const errors = { email: '', password: '' }
      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      if (!values.password) {
        errors.password = 'Required'
      }
      return errors
    },
    onSubmit: values => {
      alert(`${values}, submit`)
    }
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // connect auth operation
    alert(`${values.email}, ${values.password}, submit`)
  }

  const error = !!errors.email || !!errors.password

  return (
    <form onSubmit={onSubmit}>
      <Box width={266} height={232}>
        <Box pb={4}>Login</Box>
        <Box pb={4}>
          <TextForm
            name="email"
            value={values.email}
            error={error}
            placeholder="E-mail"
            fullWidth
            onChange={handleChange}
          />
        </Box>
        <Box pb={1}>
          <TextForm
            value={values.password}
            name="password"
            error={error}
            placeholder="Password"
            iconCursor="pointer"
            fullWidth
            onChange={handleChange}
          />
        </Box>
        <Box display="flex" justifyContent="center">
          <button disabled={error} type="submit">
            LOGIN
          </button>
        </Box>
        <Box pb={4} onClick={() => dispatch(routerOperations.pushSample())}>
          Link To Sample
        </Box>
      </Box>
    </form>
  )
}
