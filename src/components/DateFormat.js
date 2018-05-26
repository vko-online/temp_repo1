import moment from 'moment'

const generalFormat = createdAt =>
  moment(createdAt).calendar(null, {
    sameDay: 'hh:mm [Today]',
    nextDay: 'hh:mm [Tomorrow]',
    nextWeek: 'hh:mm dddd',
    lastDay: 'hh:mm [Yesterday]',
    lastWeek: 'hh:mm dddd',
    sameElse: 'hh:mm ddd DD MMM'
  })

export default {
  generalFormat
}
