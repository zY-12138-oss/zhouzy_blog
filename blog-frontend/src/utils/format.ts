import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

export function formatDate(date: string | Date, format = 'YYYY-MM-DD') {
  return dayjs(date).format(format)
}

export function formatDateTime(date: string | Date) {
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}

export function formatRelativeTime(date: string | Date) {
  return dayjs(date).fromNow()
}

export function formatNumber(num: number): string {
  if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return String(num)
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export function calcReadingTime(content: string): number {
  const wordsPerMinute = 300
  const wordCount = content.replace(/[\s\n]+/g, '').length
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

export function calcWordCount(content: string): number {
  return content.replace(/[\s\n]+/g, '').length
}
