export const TITLE_SUFFIX = '| Swetrix Marketplace'
export const LS_THEME_SETTING = 'colour-theme'
export const DONATE_URL = 'https://ko-fi.com/andriir'
export const FIREFOX_ADDON_URL = 'https://addons.mozilla.org/en-US/firefox/addon/swetrix/'
export const CHROME_EXTENSION_URL = 'https://chrome.google.com/webstore/detail/swetrix/glbeclfdldjldjonfnpnembfkhphmeld'
export const HAVE_I_BEEN_PWNED_URL = 'https://haveibeenpwned.com/passwords'
export const LINKEDIN_URL = 'https://www.linkedin.com/company/swetrix/'
export const GITHUB_URL = 'https://github.com/Swetrix'
export const TWITTER_URL = 'https://twitter.com/swetrix'
export const DISCORD_URL = 'https://discord.gg/ZVK8Tw2E8j'
export const STATUSPAGE_URL = 'https://stats.uptimerobot.com/33rvmiXXEz'
export const ABOUT_PAGE_URL = 'https://swetrix.com/about'
export const PRIVACY_PAGE_URL = 'https://swetrix.com/privacy'
export const CONTACT_PAGE_URL = 'https://swetrix.com/contact'
export const COOKIE_POLICY_URL = 'https://swetrix.com/cookie-policy'
export const TERMS_PAGE_URL = 'https://swetrix.com/terms'
export const OPEN_STARTUP_URL = 'https://swetrix.com/open'
export const PRESS_PAGE_URL = 'https://swetrix.com/press'
export const BLOG_URL = 'https://swetrix.com/blog'
export const UTM_GENERATOR_URL = 'https://url.swetrix.com'
export const DOCS_URL = 'https://docs.swetrix.com'
export const SDK_DOCS_URL = DOCS_URL + '/sdk-introduction'

export const CAPTCHA_URL = 'https://captcha.swetrix.com'

// Swetrix vs ...
export const SWETRIX_VS_GOOGLE = 'https://swetrix.com/blog/vs-google-analytics/'
export const SWETRIX_VS_CLOUDFLARE = 'https://swetrix.com/blog/vs-cloudflare-analytics/'
export const SWETRIX_VS_SIMPLE_ANALYTICS = 'https://swetrix.com/blog/vs-simple-analytics/'

export const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export const SUPPORTED_THEMES = ['light', 'dark']

export const CONTACT_EMAIL = 'contact@swetrix.com'
export const SECURITY_EMAIL = 'security@swetrix.com'

export const LS_VIEW_PREFS_SETTING = 'proj-view-preferences'
export const LS_CAPTCHA_VIEW_PREFS_SETTING = 'captcha-view-preferences'

// Environment variables
export const isSelfhosted = Boolean(process.env.SELFHOSTED)

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
export const ENTRIES_PER_PAGE_COMMENTS = 10

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

export const TRIAL_DAYS = 14
