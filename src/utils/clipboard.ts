export function executeCopy(text: string): boolean {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text))
    return true
  }
  return fallbackCopy(text)
}

function fallbackCopy(text: string): boolean {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.top = '-9999px'
  textArea.style.left = '-9999px'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  let success = false
  try {
    success = document.execCommand('copy')
  } catch {
    success = false
  }
  document.body.removeChild(textArea)
  return success
}
