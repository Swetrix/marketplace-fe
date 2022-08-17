import * as Swetrix from 'swetrix'

const MARKETPLACE_PID = 'GmZuFqybjKuc'

Swetrix.init(MARKETPLACE_PID)

const trackViews = () => {
  Swetrix.trackViews({
    heartbeatOnBackground: true,
  })
}

const trackCustom = (ev, unique = false) => {
  Swetrix.track({
    ev, unique,
  })
}

export {
  trackViews, trackCustom,
}
