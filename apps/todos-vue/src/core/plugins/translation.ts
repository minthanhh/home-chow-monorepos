import type { LocaleOptions } from 'vuetify'
import { en, vi } from 'vuetify/locale'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { createI18n, useI18n } from 'vue-i18n'
import enJson from './resources/en.json'
import viJson from './resources/vi.json'

interface RtlOptions {
  rtl?: Record<string, boolean>
}

const messages = {
  en: {
    $vuetify: { ...en, ...enJson }
  },
  vi: {
    $vuetify: { ...vi, ...viJson }
  }
}

/**
 * i18n - createI18n
 * @property {locale} locale:
 * - là ngôn ngữ mặc định (mã vùng) mà ứng dụng của bạn sẽ sử dụng khi ứng dụng được tải. Trong trường hợp này, giá trị 'vi' biểu thị tiếng Việt.
 *
 * @property {fallbackLocale} fallbackLocale:
 * - là ngôn ngữ dự phòng (mã vùng dự phòng) được sử dụng khi không tìm thấy bản dịch cho một chuỗi nào đó trong ngôn ngữ hiện tại.
 *
 * @property {legacy} legacy:
 * - Tùy chọn legacy xác định cách thức mà vue-i18n hoạt động, tùy thuộc vào cách tiếp cận mà bạn muốn sử dụng.
 * - Sử dụng chế độ tương thích với phiên bản cũ của vue-i18n, nơi các API dựa trên Option API được sử dụng để quản lý i18n (các phương thức như $t và các cách sử dụng cũ).
 * - Sử dụng Composition API hiện đại của Vue 3 để quản lý i18n. Trong chế độ này, bạn có thể sử dụng các hook như useI18n để quản lý ngôn ngữ, giúp mã gọn gàng và dễ quản lý hơn, đặc biệt là trong các ứng dụng Vue 3.
 */
export const i18n = createI18n({
  legacy: false,
  locale: 'vi',
  fallbackLocale: 'en',
  messages
})

export const locale: (LocaleOptions & RtlOptions) | undefined = {
  adapter: createVueI18nAdapter({ i18n, useI18n })
}
