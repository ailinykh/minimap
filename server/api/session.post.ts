import jwt from 'jsonwebtoken'
import validate from '../utils/validate'
const { telegram_bot_token, jwt_secret_token } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const { webAppData } = await readBody(event)

  if (!webAppData) {
    console.warn('no webApp data provided')
    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    })
  }

  const data = Object.fromEntries(
    new URLSearchParams(decodeURIComponent(webAppData))
  )

  if (!validate(data, telegram_bot_token)) {
    console.warn('❌ attempt to verify invalid data!')
    console.info(data)

    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    })
  }

  const user = JSON.parse(data.user)
  const token = jwt.sign(user, jwt_secret_token, { expiresIn: '1d' })
  console.log(`✅ session created ${token}`)
  return { token, user }
})
