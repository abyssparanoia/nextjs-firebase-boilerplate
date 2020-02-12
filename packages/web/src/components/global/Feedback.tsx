import React from 'react'
import { Feedback } from 'src/modules/feedback'
import { Snackbar } from 'src/components/moleclues/Snackbar'

interface Props {
  feedbackList: Feedback[]
  popFeedback: (id: string) => void
}

export const GlobalFeedback = ({ feedbackList, popFeedback }: Props) => {
  const closeHandler = (id: string) => () => popFeedback(id)

  return (
    <>
      {feedbackList.map(({ id, variant, message }) => (
        <Snackbar key={id} variant={variant} message={message} onClose={closeHandler(id)} />
      ))}
    </>
  )
}
