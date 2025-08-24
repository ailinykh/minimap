interface ILocationManager {
  init: (cb: () => void) => void
  isInited: boolean
  isLocationAvailable: boolean
  isAccessRequested: boolean
  isAccessGranted: boolean
  getLocation: (cb: ({ latitude: number, longitude: number }) => void) => void
  openSettings: () => void
}

interface IWebApp {
  LocationManager: ILocationManager
  // fullscreen
  isFullscreen: boolean
  requestFullscreen: () => void
  exitFullscreen: () => void
  // misc
  platform: string
  showAlert: (message: String, cb?: () => void) => void
}

type TelegramWebApp = {
  Telegram: {
    WebApp: IWebApp
  }
}
