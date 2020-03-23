import React, { useCallback } from 'react'
import { Snackbar } from 'src/components/moleclues/Snackbar'
import { ReduxStore } from 'src/modules/reducer'
import { popFeedback } from 'src/modules/feedback'
import { useDispatch, useSelector } from 'react-redux'

interface Props {}

export const GlobalFeedback = (_: Props) => {
  const { feedbackList } = useSelector(({ feedback: { list } }: ReduxStore) => ({
    feedbackList: list,
  }))

  const dispatch = useDispatch()
  const handlePopFeedback = useCallback((id: string) => () => dispatch(popFeedback({ id })), [dispatch])

  return (
    <>
      {feedbackList.map(({ id, variant, message }) => (
        <Snackbar key={id} variant={variant} message={message} onClose={handlePopFeedback(id)} />
      ))}
    </>
  )
}
