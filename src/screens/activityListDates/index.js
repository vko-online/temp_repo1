import React, { Component } from 'react'
import {
  ImageBackground,
  ScrollView,
  View,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'

import { Row, Column as Col, ScreenInfo, Grid } from 'react-native-responsive-grid'
import { LinearGradient } from 'expo'

import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'

import { ACTIVITY_ALL_QUERY } from '../../graphql/activity.query'

import { Text, DateFormat } from '../../components'

import styles, { Container } from './styles'

// column width (relative to screen size)
const sizes = { sm: 50, md: 50, lg: 25, xl: 20 }

const layout = (state, data, onPress) => {
  const numCols = Math.floor(100 / sizes[ScreenInfo().mediaSize])
  const numRows = Math.ceil(data.length / numCols)
  const colWidth = state.layout.grid ? state.layout.grid.width / numCols : 0

  let layoutMatrix = []
  let layoutCols = []

  for (let col = 0; col < numCols; col++) {
    layoutMatrix.push([])
    for (let row = 0, i = col; row < numRows; row++, i += numCols) {
      if (data[i]) {
        layoutMatrix[col].push(
          <Item
            key={i}
            id={data[i].id}
            url={data[i].image_url}
            height={data[i].image.height}
            width={data[i].image.width}
            margin={5}
            colWidth={colWidth}
            state={state}
            onPress={onPress}
            data={data[i]}
          />
        )
      }
    }
    layoutCols.push(
      <Col
        key={col}
        smSize={state.layout.grid ? sizes.sm : 0}
        mdSize={state.layout.grid ? sizes.md : 0}
        lgSize={state.layout.grid ? sizes.lg : 0}
        xlSize={state.layout.grid ? sizes.xl : 0}
      >
        {layoutMatrix[col]}
      </Col>
    )
  }

  return layoutCols
}

const Item = (props) => {
  if (!props.colWidth) return null

  const width = props.colWidth
  const height = props.height + ((props.colWidth - props.width) * props.height / props.width)

  return (
    <Row
      style={{
        backgroundColor: 'white',
        margin: props.margin,
        borderRadius: 10,
        borderWidth: 0
      }}
    >
      <Col>
        <TouchableOpacity activeOpacity={0.8} onPress={() => props.onPress(props.id)}>
          <ImageBackground
            source={{uri: props.url}}
            style={{
              width: width,
              height: height,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <LinearGradient
              start={{ x: 0, y: 0.6 }}
              end={{ x: 0, y: 1.0 }}
              colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
            >
              <View style={{ height: height, width: width, justifyContent: 'flex-end' }}>
                <Text style={styles.date}>{DateFormat.generalFormat(props.data.start_date)}</Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      </Col>
    </Row>
  )
}

class ActivityListDatesDates extends Component {
  handlePress = (id) => {
    this.props.navigation.navigate('ActivityView', { id })
  }

  render () {
    const { loading, activities } = this.props

    if (loading || !activities.length) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <Container>
        <Grid>
          {({state, setState}) => (
            <Row fullHeight>
              <ScrollView style={{padding: 5}} removeClippedSubviews>
                <Row>
                  {layout(state, activities, this.handlePress)}
                </Row>
              </ScrollView>
            </Row>
          )}
        </Grid>
      </Container>
    )
  }
}

const activityQuery = graphql(ACTIVITY_ALL_QUERY, {
  props: ({ data: { loading, activities } }) => ({
    loading,
    activities
  })
})

const mapStateToProps = ({ auth }) => ({
  auth
})

export default compose(connect(mapStateToProps), activityQuery)(ActivityListDatesDates)
