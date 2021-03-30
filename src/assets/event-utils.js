

// import { addDays } from 'date-fns'

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
// let todayStr2 = new Date('03/13/2021')


export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'Event 1',
    backgroundColor: '#ff3e30',
    textColor: '#fff',
    start: new Date('2021-03-21').toISOString().replace(/T.*$/, '') + 'T12:00'
  },
  {
    id: createEventId(),
    title: 'Event 2',
    backgroundColor: '#176bef',
    textColor: '#fff',
    start: new Date('2021-03-22').toISOString().replace(/T.*$/, '') + 'T12:30'
  },
  {
    id: createEventId(),
    title: 'Event 3',
    backgroundColor: '#f7b529',
    textColor: '#fff',
    start: new Date('2021-03-23').toISOString().replace(/T.*$/, '') + 'T12:00'
  },
  {
    id: createEventId(),
    title: 'Event 4',
    backgroundColor: '#179b52',
    textColor: '#fff',
    start: new Date('2021-03-23').toISOString().replace(/T.*$/, '') + 'T12:00'
  },
  {
    id: createEventId(),
    title: 'hahaha',
    start: todayStr + 'T13:00',
  },
  // { id: 10, title: 'All day event', date: new Date(), allDay: true },
  // { id: 20, title: 'Timed event', start: addDays(new Date(), 1) },
  // { id: 30, title: 'Timed event', start: addDays(new Date(), 2) }
]

export function createEventId() {
  return String(eventGuid++)
}
