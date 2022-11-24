/* eslint-disable no-useless-escape */

export const extensionStructureExample = `(async (sdk) => {
  // Your extension code goes here..
})
`

export const eventListenerBasicExample = `(async (sdk) => {
  sdk.addEventListener('projectinfo', ({ id }) => {
    // Your code goes here..
  })
})
`

export const addExportDataRowExample = `(async (sdk) => {
  sdk.addExportDataRow('As JSON', () => {
    // Your code goes here..
  })
})
`

export const removeExportDataRowExample = `sdk.removeExportDataRow('As JSON')`

export const addPanelTabExample = `sdk.addPanelTab('cc', '<h2>Custom Content</h2>', () => {
  // This part is triggered when the tab is opened
  // Your code goes here..
})`

export const getUMDBuildExample = (pid) => `<!-- Put this at the end of the <body> tag -->
<script src="https://swetrix.org/swetrix.js" defer></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    swetrix.init('${pid}')
    swetrix.trackViews()
  })
</script>
<noscript>
  <img
    src="https://api.swetrix.com/log/noscript?pid=${pid}"
    alt=""
    referrerpolicy="no-referrer-when-downgrade"
  />
</noscript>
`

export const npmInstall = 'npm install swetrix'
export const npmImport = 'import * as Swetrix from \'swetrix\''
export const esExample = `Swetrix.init('YOUR_PROJECT_ID')
Swetrix.trackViews()
`

export const trackPageView = 'swetrix.trackViews()'

export const track = `swetrix.track({
  // The event identifier you want to track.
  // This has to be a string, which:
  // - only contains English letters (a-Z A-Z), numbers (0-9),
  //   underscores (_) and dots (.).
  // - is fewer than 64 characters.
  // - starts with an English letter.
  ev: 'YOUR_EVENT_NAME',

  // If true, only 1 event with the same ID will be saved per user session.
  // The principle of this parameter is similar to page views and unique views.
  unique: false,
})
`

export const trackExample = `swetrix.track({
  ev: 'USER_SIGN_UP',
})
`

export const init = `swetrix.init('YOUR_PROJECT_ID', {
  // When set to true, all tracking logs will be
  // printed to console and localhost events will be sent to server.
  debug: false,

  // When set to true, the tracking library won't send any data to server.
  // Useful for development purposes when this value is set based on '.env' var.
  disabled: false,

  // By setting this flag to true, we will not collect ANY kind of data
  // about the user with the DNT setting.
  // This setting is not true by default because our service
  // anonymises all incoming data and does not pass it on
  // to any third parties under any circumstances
  respectDNT: false,

  // Set a custom URL of the API server (for selfhosted variants of Swetrix)
  apiURL: 'https://api.swetrix.com/log',
})
`

export const trackPVAPI = `swetrix.trackViews({
  // If true, only unique events will be saved.
  // This param is useful when tracking single-page landing websites.
  unique: false,

  // A list of regular expressions or string pathes to ignore.
  // for example: ['/dashboard', /^\/projects/i] setting will force
  // script to ignore all pathes which start with /projects or equal to /dashboard
  // Please pay attention, that the pathes always start with /
  ignore: [],

  // Do not send Heartbeat requests to the server.
  // By setting this to true you will not be able to see the realtime amount of
  // users on your website.
  noHeartbeat: false,

  // Send Heartbeat requests when the website tab is not active in the browser.
  // Setting this to true means that users who opened your website in inactive
  // browser tab or window will not be counted into users realtime statistics.
  // Setting this to true is usually useful for services like Spotify or Youtube
  heartbeatOnBackground: false,
})`

export const trackPVReturnAPI = `{
  // This function stops the tracking of pages.
  stop() {},
}
`
