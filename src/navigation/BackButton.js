import React from 'react'

import { Button } from '../components'

export default (navigation) => {
  return <Button outline onPress={() => navigation.goBack()} text='Cancel' />
}
