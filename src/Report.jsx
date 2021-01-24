import React, { Fragment } from 'react'

export default function Report({ reports }) {
  return (
    <Fragment>
      {
        reports
          .map(({ id, name, numElements }) => <p key={id}><span>{name}: {numElements}</span></p>)
      }
    </Fragment>
  )
}
