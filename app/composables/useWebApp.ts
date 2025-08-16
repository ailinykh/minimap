export default function (): IWebApp {
  const webApp = window.Telegram.WebApp

  const fakeLocation = localStorage.getItem('fakeLocation') || false

  if (fakeLocation) {
    console.info('using fake LocationManager...')
    return { ...webApp, LocationManager: new LocationManager() }
  }

  return webApp
}

class LocationManager {
  init() {}

  isInited = true
  isLocationAvailable = true
  isAccessRequested = true
  isAccessGranted = true

  getLocation(cb: (location: { latitude: number; longitude: number }) => void) {
    cb({ latitude: 52.996984, longitude: 36.071092 })
  }

  openSettings() {}
}
