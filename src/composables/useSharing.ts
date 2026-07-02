import { ref, type Ref } from 'vue'
import { snapdom } from '@zumer/snapdom';

import { DISCORD_EXPORT_VARIANTS, type TradingMatch, type SpriteFilters } from '@/types/sprite'
import { useSprites } from './useSprites'
// import { useToast } from './useToast'
import { useToast } from 'primevue/usetoast';

import { executeCopy } from '@/utils/clipboard'

const copiedLink = ref(false)
const copiedDiscordMarkdown = ref(false)
const showDiscordModal = ref(false)
const isExporting = ref(false)
const friendLinkInput = ref('')
const tradingMatch = ref<TradingMatch | null>(null)

export function useSharing(activeFilters?: Ref<SpriteFilters>) {
  const { sprites, ownedIds, masteredIds, ownedCount } = useSprites()
  // const { showToast } = useToast()
  const toast = useToast();


  const generateShareUrl = () => {
    const url = new URL(window.location.pathname, window.location.origin)

    if (ownedIds.value.length > 0) {
      url.searchParams.set('owned', ownedIds.value.join('.'))
    }

    if (masteredIds.value.length > 0) {
      url.searchParams.set('mastered', masteredIds.value.join('.'))
    }

    if (activeFilters?.value) {
      const { search, rarity, variant, ownedStatus } = activeFilters.value

      const normalizedSearch = search.trim()
      if (normalizedSearch) {
        url.searchParams.set('search', normalizedSearch)
      }

      if (rarity.length > 0) {
        url.searchParams.set('rarity', rarity.join('.'))
      }

      if (variant.length > 0) {
        url.searchParams.set('variant', variant.join('.'))
      }

      if (ownedStatus !== 'All') {
        url.searchParams.set('ownedStatus', ownedStatus)
      }
    }

    return url.toString()
  }

  const copyShareLink = () => {
    const url = generateShareUrl()
    if (executeCopy(url)) {
      toast.add({ summary: 'Link Copied!', detail: 'Share it on your Discord server.', icon: 'pi pi-link', severity: 'success', life: 3000 });
      // copiedLink.value = true
      // showToast('Link Copied!', 'Share it on your Discord server.', 'pi-link')
      // setTimeout(() => {
      //   copiedLink.value = false
      // }, 2000)
    }
  }

  const toggleDiscordModal = () => {
    showDiscordModal.value = !showDiscordModal.value
  }

  const generateDiscordMarkdown = () => {
    const totalDust = sprites.value
      .filter((s) => ownedIds.value.includes(s.id))
      .reduce((total, s) => total + s.price, 0)

    const ownedNames = sprites.value
      .filter((s) => ownedIds.value.includes(s.id))
      .map((s) => `• ${s.name} (${s.rarity} - ${s.variant})`)

    const masteredNames = sprites.value
      .filter((s) => masteredIds.value.includes(s.id))
      .map((s) => `• ${s.name} (${s.rarity} - ${s.variant})`)

    const ownedSlice =
      ownedNames.length > 0
        ? ownedNames.slice(0, 8).join('\n') +
          (ownedNames.length > 8 ? `\n... y ${ownedNames.length - 8} más` : '')
        : '• Ninguno registrado aún.'

    const masteredSlice =
      masteredNames.length > 0
        ? masteredNames.slice(0, 8).join('\n') +
          (masteredNames.length > 8 ? `\n... y ${masteredNames.length - 8} más` : '')
        : '• ¡Colección completa, no busco ninguno!'

    return `>>> **🎮 FORTNITE RUNNERS - REGISTRO DE ESPÍRITUS 🎮**

👤 *Colección Oficial de ${ownedCount.value}/${sprites.value.length} Espíritus extraídos de la isla.*
⚡ *Nivel de Energía Sprite Dust: ${totalDust.toLocaleString()} pts.*

🟩 **ESPÍRITUS DISPONIBLES PARA TRADEO (TENGO):**
${ownedSlice}

🟦 **ESPÍRITUS EN BUSCA Y CAPTURA (MASTERS):**
${masteredSlice}

🔗 **¡Haz Match de Tradeo interactivo conmigo aquí!**
${generateShareUrl()}`
  }

  const copyDiscordMarkdown = () => {
    const text = generateDiscordMarkdown()
    if (executeCopy(text)) {
      copiedDiscordMarkdown.value = true
      toast.add({ summary: 'Markdown Copied', detail: 'Ready to paste in your Discord chat.', icon: 'pi pi-discord', severity: 'success', life: 3000 });
      setTimeout(() => {
        copiedDiscordMarkdown.value = false
        showDiscordModal.value = false
      }, 1500)
    }
  }

  const generateDiscordCollectionTable = () => {
    const baseTypeSprites = sprites.value.filter((sprite) => sprite.variant === 'Normal')

    const typeWidth = Math.max(12, ...baseTypeSprites.map((sprite) => sprite.type.length))
    const variantWidth = Math.max(7, ...DISCORD_EXPORT_VARIANTS.map((variant) => variant.length))

    const pad = (value: string, width: number) => value.padEnd(width, ' ')

    const header = `| ${pad('TYPE', typeWidth)} | ${DISCORD_EXPORT_VARIANTS.map((variant) => pad(variant.toUpperCase(), variantWidth)).join(' | ')} |`
    const separator = `|-${'-'.repeat(typeWidth)}-|-${DISCORD_EXPORT_VARIANTS.map(() => '-'.repeat(variantWidth)).join('-|-')}-|`

    const rows = baseTypeSprites.map((baseSprite) => {
      const cells = DISCORD_EXPORT_VARIANTS
        .map((variant) => {
          const sprite = sprites.value.find((s) => s.type === baseSprite.type && s.variant === variant)
          if (!sprite) return 'N/A'
          return ownedIds.value.includes(sprite.id) ? '✅' : '❌'
        })
        .map((cell) => pad(cell, variantWidth))

      const paddedLabel = pad(baseSprite.type, typeWidth)
      return `| ${paddedLabel} | ${cells.join(' | ')} |`
    })

    const summary = `${ownedCount.value}/${sprites.value.length} collected · track yours at mac537.github.io`

    return [
      '```txt',
      header,
      separator,
      ...rows,
      '```',
      '✅ = OWNED  |  ❌ = MISSING  |  N/A = NOT AVAILABLE',
      '',
      summary,
    ].join('\n')
  }

  const exportDiscordTable = () => {
    const table = generateDiscordCollectionTable()
    if (executeCopy(table)) {
      toast.add({
        summary: 'Discord Export Copied',
        detail: 'Table format copied and ready to paste in Discord.',
        severity: 'success',
        life: 3000,
      })
    }
  }

  async function waitForCaptureImages(element: HTMLElement, timeoutMs = 2500): Promise<void> {
  const images = Array.from(element.querySelectorAll('img'))
  if (images.length === 0) return

  const waiters = images.map(
    (img) =>
      new Promise<void>((resolve) => {
        if (img.complete && img.naturalWidth > 0) {
          resolve()
          return
        }

        const done = () => {
          img.removeEventListener('load', done)
          img.removeEventListener('error', done)
          resolve()
        }

        img.addEventListener('load', done, { once: true })
        img.addEventListener('error', done, { once: true })
      }),
  )

  await Promise.race([
    Promise.all(waiters).then(() => undefined),
    new Promise<void>((resolve) => setTimeout(resolve, timeoutMs)),
  ])
}

  const exportAsImage = async () => {
    isExporting.value = true
    toast.add({ summary: 'Processing Card', detail: 'Preparing the render of your static album...', icon: 'pi pi-image', severity: 'info', life: 3000 })

    const el = document.querySelector('#capture-area') as HTMLElement | null;

    if (!el) {
      console.error('Elemento #capture-area no encontrado');
      isExporting.value = false;
      return;
    }

    // 🔥 MUY IMPORTANTE: esperar a imágenes
    await waitForCaptureImages(el);

    // 🔥 Asegurar que está visible
    // el.style.display = 'block';

    try {
      const result = await snapdom(el, {
        scale: 1, // mejora calidad
        // backgroundColor: '#0c0d14', // igual que html2canvas
      });

      // const img = await result.toPng();
      // document.body.appendChild(img);

      await result.download({
        format: 'jpg',
        filename: 'sprites.jpg',
      });
      } catch (error) {
      console.error('snapdom error', error);
    } finally {
      isExporting.value = false;
      // el.style.display = 'none';
    }
  }

  const processFriendLink = () => {
    if (!friendLinkInput.value) {
      // showToast('Empty Link', 'Please paste a valid link first.', 'pi-exclamation-triangle')
      return
    }
    try {
      const url = new URL(friendLinkInput.value)
      const params = new URLSearchParams(url.search)
      const friendOwnedStr = params.get('owned') ?? ''
      const friendMasteredStr = params.get('mastered') ?? ''

      const friendOwnedIds = friendOwnedStr
        .split('.')
        .map(Number)
        .filter((n) => !isNaN(n) && n > 0)
      const friendMasteredIds = friendMasteredStr
        .split('.')
        .map(Number)
        .filter((n) => !isNaN(n) && n > 0)

      const youCanGive = sprites.value.filter(
        (s) => ownedIds.value.includes(s.id) && friendMasteredIds.includes(s.id),
      )
      const friendCanGive = sprites.value.filter(
        (s) => friendOwnedIds.includes(s.id) && masteredIds.value.includes(s.id),
      )

      tradingMatch.value = { youCanGive, friendCanGive }
      // showToast('Match Found', 'Collections have been analyzed successfully.', 'pi-sync')
    } catch {
      // showToast(
      //   'Invalid Format',
      //   'Make sure to paste a valid link from this app.',
      //   'pi-exclamation-circle',
      // )
    }
  }

  const loadDemoFriend = () => {
    const origin = window.location.origin + window.location.pathname
    friendLinkInput.value = `${origin}?owned=2.8.14.20&mastered=1.10.16`
    processFriendLink()
  }

  const clearMatch = () => {
    tradingMatch.value = null
    friendLinkInput.value = ''
  }

  const copyDiscordTradeMessage = () => {
    if (!tradingMatch.value) return

    const giveNames = tradingMatch.value.youCanGive.map((s) => s.name).join(', ')
    const receiveNames = tradingMatch.value.friendCanGive.map((s) => s.name).join(', ')

    const message = `>>> **💥 INSTANT TRADE PROPOSAL 💥**
🤝 I have analyzed our Spirit lists in the app:
🎁 **I offer you:** ${giveNames || 'Other spirits from my catalog'}
🔮 **In exchange for:** ${receiveNames || 'Your leftover spirits'}

Let's talk to coordinate the extraction in-game! 🎮`

    if (executeCopy(message)) {
      // showToast('Trade Message Copied', 'Ready to negotiate on Discord.', 'pi-comments')
    }
  }

  return {
    copiedLink,
    copiedDiscordMarkdown,
    showDiscordModal,
    isExporting,
    friendLinkInput,
    tradingMatch,
    generateShareUrl,
    copyShareLink,
    toggleDiscordModal,
    generateDiscordMarkdown,
    copyDiscordMarkdown,
    generateDiscordCollectionTable,
    exportDiscordTable,
    exportAsImage,
    processFriendLink,
    loadDemoFriend,
    clearMatch,
    copyDiscordTradeMessage,
  }
}
