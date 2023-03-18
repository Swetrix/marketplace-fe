export const TITLE_SUFFIX = '| Swetrix Marketplace'
export const LS_THEME_SETTING = 'colour-theme'
export const DONATE_URL = 'https://ko-fi.com/andriir'
export const FIREFOX_ADDON_URL = 'https://addons.mozilla.org/en-US/firefox/addon/swetrix/'
export const CHROME_EXTENSION_URL = 'https://chrome.google.com/webstore/detail/swetrix/glbeclfdldjldjonfnpnembfkhphmeld'
export const HAVE_I_BEEN_PWNED_URL = 'https://haveibeenpwned.com/passwords'
export const LINKEDIN_URL = 'https://www.linkedin.com/company/swetrix/'
export const GITHUB_URL = 'https://github.com/Swetrix'
export const TWITTER_URL = 'https://twitter.com/swetrix'
export const STATUSPAGE_URL = 'https://stats.uptimerobot.com/33rvmiXXEz'
export const ABOUT_PAGE_URL = 'https://swetrix.com/about'
export const PRIVACY_PAGE_URL = 'https://swetrix.com/privacy'
export const CONTACT_PAGE_URL = 'https://swetrix.com/contact'
export const TERMS_PAGE_URL = 'https://swetrix.com/terms'
export const BLOG_URL = 'https://blog.swetrix.com'
export const UTM_GENERATOR_URL = 'https://url.swetrix.com'
export const DOCS_URL = 'https://docs.swetrix.com'
export const SDK_DOCS_URL = DOCS_URL + '/sdk-introduction'

export const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export const SUPPORTED_THEMES = ['light', 'dark']

export const CONTACT_EMAIL = 'contact@swetrix.com'
export const SECURITY_EMAIL = 'security@swetrix.com'

// Cookies
export const TOKEN = 'access_token'
export const REFRESH_TOKEN = 'refresh_token'
export const GDPR_REQUEST = 'gdpr_request'
export const CONFIRMATION_TIMEOUT = 'confirmation_timeout'

// a dedicated variable is needed for paid tier checking
export const GDPR_EXPORT_TIMEFRAME = 14 // days

// List of languages with translations available
export const whitelist = ['en']
export const defaultLanguage = 'en'
export const languages = {
  en: 'English',
}

export const languageFlag = {
  en: 'GB',
}

export const ENTRIES_PER_PAGE_DASHBOARD = 10
export const ENTRIES_PER_PAGE_EXTENSIONS = 30

export const tabForInstallExtension = 'installed'
export const tabForPublishExtensions = 'published'

export const tabsForDashboard = [
  {
    name: tabForInstallExtension,
    label: 'profileSettings.installed',
  },
  {
    name: tabForPublishExtensions,
    label: 'profileSettings.owned',
  },
]

export const sortByConstans = {
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
}

export const THEME_TYPE = {
  classic: 'classic',
  christmas: 'christmas',
}

export const extensionStatuses = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  DELETED: 'DELETED',
  NO_EXTENSION_UPLOADED: 'NO_EXTENSION_UPLOADED',
}
