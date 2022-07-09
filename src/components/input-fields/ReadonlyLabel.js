import React from 'react'
import {  Typography } from "@material-ui/core";
import {FormattedMessage, injectIntl} from 'react-intl'

 const ReadonlyLabel = ({variant, label}) => {
  return (
    <Typography variant={variant}>
      <FormattedMessage id={label}  />
    </Typography>
  )
}

export default ReadonlyLabel