import React, {
  Component
} from 'react'

import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Animated,
  PanResponder,
  Dimensions
} from 'react-native'

const TENSION = 800
const FRICTION = 90

const SCREEN_HEIGHT = Dimensions.get('window').height
const DraggableDrawerHelper = require('./DraggableHelper')(SCREEN_HEIGHT)

export default class Draggable extends Component {
  constructor (props) {
    super(props)
    const initialDrawerSize = DraggableDrawerHelper.calculateInitialPosition(this.props.initialDrawerSize)
    this.state = {
      touched: 'FALSE',
      position: new Animated.Value(initialDrawerSize),
      initialPositon: initialDrawerSize,
      isOnTop: false
    }
  }

  onUpdatePosition = (position) => {
    this.state.position.setValue(position)
    this._previousTop = position
    const initialPosition = DraggableDrawerHelper.getInitialPosition()

    if (initialPosition === position) {
      this.props.onInitialPositionReached && this.props.onInitialPositionReached()
    }
  }

  componentWillMount () {
    DraggableDrawerHelper.setupAnimation(TENSION, FRICTION,
      (position) => {
        if (!this.center) return
        this.onUpdatePosition(position.value)
      }
    )

    this._panGesture = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return DraggableDrawerHelper.isAValidMovement(gestureState.dx, gestureState.dy) && this.state.touched === 'TRUE'
      },
      onPanResponderMove: (evt, gestureState) => {
        this.moveDrawerView(gestureState)
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.moveFinished(gestureState)
      }
    })
  }

  moveDrawerView = (gestureState) => {
    if (!this.center) return
    const position = gestureState.moveY - SCREEN_HEIGHT * 0.05
    this.onUpdatePosition(position)
  }

  moveFinished = (gestureState) => {
    const isGoingToUp = (gestureState.vy < 0)
    if (!this.center) return
    DraggableDrawerHelper.startAnimation(gestureState.vy, gestureState.moveY, this.state.initialPositon, gestureState.stateId)
    this.props.onRelease && this.props.onRelease(isGoingToUp)
    this.setState({
      isOnTop: isGoingToUp
    })
  }

  handlePress = () => {
    this.setState({
      isOnTop: !this.state.isOnTop
    }, () => {
      if (!this.state.isOnTop) {
        DraggableDrawerHelper.startAnimationBottom(-0.01, this.state.initialPositon)
      } else {
        DraggableDrawerHelper.startAnimationTop(-0.01, this.state.initialPositon)
      }
    })
  }

  render () {
    const containerView = this.props.renderContainerView ? this.props.renderContainerView() : null
    const drawerView = this.props.renderDrawerView ? this.props.renderDrawerView() : null
    const initDrawerView = this.props.renderInitDrawerView ? this.props.renderInitDrawerView(this.state.isOnTop) : null
    const drawerPosition = {
      top: this.state.position
    }

    return (
      <View style={styles.viewport}>
        <View style={styles.container}>
          {containerView}
        </View>
        <Animated.View
          style={[drawerPosition, styles.drawer]}
          ref={(center) => (this.center = center)}
          {...this._panGesture.panHandlers}>
          <TouchableWithoutFeedback
            onPress={this.handlePress}
            onPressIn={() => { this.setState({ touched: 'TRUE' }) }}
            onPressOut={() => { this.setState({ touched: 'FALSE' }) }}>
            {initDrawerView}
          </TouchableWithoutFeedback>
          {drawerView}
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewport: {
    flex: 1
  },
  drawer: {
    flex: 1
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})
