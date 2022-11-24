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

export const removePanelTabExample = `sdk.removePanelTab('cc')`

export const extensionTestingExample = `// this useEffect hook is located around line 300 in ViewProject.jsx
useEffect(() => {
  let sdk = null
  if (true) {
    sdk = new SwetrixSDK([{
      id: 'some-test-ext-id',
      cdnURL: 'http://localhost:3000/assets/test_extension.js'
    }], {
      debug: isDevelopment,
    }, {
    // ....leave the following code unmodified`