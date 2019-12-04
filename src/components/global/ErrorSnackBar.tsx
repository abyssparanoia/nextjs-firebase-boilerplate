import React, { useEffect, useState } from 'react'
import { Snackbar } from 'src/components/moleclues/Snackbar'

interface Props {
  errorList: Error[]
  popError: () => void
}

export const GlobalErrorSnackBar = ({ errorList, popError }: Props) => {
  const [error, setError] = useState<Error | undefined>(undefined)

  const closeHandler = () => {
    popError()
    setError(undefined)
  }

  useEffect(() => {
    if (errorList.length > 0) setError(errorList[0])
  }, [errorList])

  return <>{error && <Snackbar variant="error" message={error.message} onClose={closeHandler} />}</>
}
