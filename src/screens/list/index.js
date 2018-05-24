import React, { Component } from 'react'
import {
  FlatList
} from 'react-native'

import { Container, Item } from './styles'

const data = [{
  name: 'Футбол ТКТЛ',
  categories: ['sport', 'enternainment']
}, {
  name: 'Чемпионат PlayStation',
  categories: ['gaming']
}]

class List extends Component {
  renderItem = ({ item }) => <Item data={item} />

  render () {
    return (
      <Container>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={v => v.name}
        />
      </Container>
    )
  }
}

export default List
