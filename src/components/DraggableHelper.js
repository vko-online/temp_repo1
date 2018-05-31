import {
  Animated
} from 'react-native'

module.exports = function (screenHeight) {
  var module = {}
  var initialUsedSpace
  var initialPosition

  module.calculateInitialPosition = function (initialUsedSpace) {
    initialUsedSpace = Math.abs(initialUsedSpace)
    initialPosition = (screenHeight * (1 - initialUsedSpace))
    return initialPosition
  }

  module.getInitialUsedSpace = function () {
    return initialUsedSpace
  }

  module.getInitialPosition = function () {
    return initialPosition
  }

  module.setupAnimation = function (higherTension, friction, callbackPositionUpdated) {
    this.tension = higherTension
    this.friction = friction
    this.callbackPositionUpdated = callbackPositionUpdated
  }

  module.isAValidMovement = function (distanceX, distanceY) {
    var moveTravelledFarEnough = Math.abs(distanceY) > Math.abs(distanceX) && Math.abs(distanceY) > 2
    return moveTravelledFarEnough
  }

  module.startAnimation = function (velocityY, positionY, initialPositon) {
    var isGoingToUp = (velocityY < 0)
    var endPosition = isGoingToUp ? 0 : initialPositon

    var position = new Animated.Value(positionY)
    position.removeAllListeners()

    Animated.timing(position, {
      toValue: endPosition,
      tension: 30,
      friction: 1,
      // easing: Easing.elastic,
      velocity: velocityY
    }).start()

    position.addListener(this.callbackPositionUpdated)
  }

  module.startAnimationTop = function (velocityY, initialPositon) {
    var endPosition = 0

    var position = new Animated.Value(initialPositon)
    position.removeAllListeners()

    Animated.timing(position, {
      toValue: endPosition,
      tension: 30,
      friction: 1,
      // easing: Easing.elastic,
      velocity: velocityY
    }).start()

    position.addListener(this.callbackPositionUpdated)
  }

  module.startAnimationBottom = function (velocityY, initialPositon) {
    var position = new Animated.Value(0)
    position.removeAllListeners()

    Animated.timing(position, {
      toValue: initialPositon,
      tension: 30,
      friction: 1,
      // easing: Easing.elastic,
      velocity: velocityY
    }).start()

    position.addListener(this.callbackPositionUpdated)
  }

  return module
}
