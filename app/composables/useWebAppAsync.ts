declare global {
  interface Window extends TelegramWebApp {}
}

export default function (): Promise<IWebApp> {
  const isLoaded = useState<boolean>('webAppLoaded', () => false)

  return new Promise((res, rej) => {
    if (isLoaded.value) {
      res(withLocation(window.Telegram.WebApp))
      return
    }

    const { onLoaded, onError } = useScript(
      'https://telegram.org/js/telegram-web-app.js?59',
      {
        use() {
          return { Telegram: window.Telegram }
        },
        // bundle: true,
      }
    )

    onLoaded(({ Telegram: { WebApp } }) => {
      isLoaded.value = true
      res(withLocation(WebApp))
    })

    onError(rej)
  })
}

function withLocation(webApp: IWebApp): IWebApp {
  const fakeLocation = localStorage.getItem('fakeLocation') || false

  if (fakeLocation) {
    console.info('using fake LocationManager...')
    return { ...webApp, LocationManager: new LocationManager() }
  }

  return webApp
}

class LocationManager {
  init(callback: Function) {
    callback()
  }

  isInited = true
  isLocationAvailable = true
  isAccessRequested = true
  isAccessGranted = true

  getLocation(cb: (location: { latitude: number; longitude: number }) => void) {
    cb({ latitude: 52.996984, longitude: 36.071092 })
  }

  openSettings() {}
}
