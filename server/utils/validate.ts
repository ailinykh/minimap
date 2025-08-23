import { createHmac } from 'crypto'

export default function (
  obj: Record<string, string>,
  bot_token: string
): boolean {
  const { hash } = obj

  if (!hash || hash.length < 64) return false

  return calculateHash(obj, bot_token) == hash
}

function calculateHash(obj: Record<string, string>, bot_token: string): string {
  const dataCheckString = Object.keys(obj)
    .sort()
    .filter((key) => key !== 'hash')
    .map((key) => `${key}=${obj[key]}`)
    .join('\n')

  const secretKey = createHmac('sha256', 'WebAppData')
    .update(bot_token)
    .digest()

  const hash = createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex')

  return hash
}
