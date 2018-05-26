import React from 'react'

import { Button } from '../components'

export default (navigation, title = 'Cancel') => {
  return <Button outline onPress={() => navigation.goBack()} text={title} />
}
