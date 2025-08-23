// FIXME: vue-router breaks `url.location.hash` which
// leads to incorrect parsing by `telegram-web-app.js`
// and we can't rely on Telegram.WebApp.initData here
// so, we have to deconstruct it manually
export default function (hash: string): string {
  const obj = Object.fromEntries(new URLSearchParams(hash))
  const { user } = Object.fromEntries(new URLSearchParams(obj['#tgWebAppData']))

  if (!user) {
    throw new Error('user not exists!')
  }

  ;[
    // metadata cleanup
    'tgWebAppPlatform',
    'tgWebAppThemeParams',
    'tgWebAppVersion',
    // remove original user
    '#tgWebAppData',
  ].forEach((p) => delete obj[p])

  // remain all other fields as they may change
  return new URLSearchParams({ user, ...obj }).toString()
}
