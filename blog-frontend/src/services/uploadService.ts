import api from './api'
import type { FileInfo } from '@/types'
import { API_ENDPOINTS } from '@/config/api'
import { MAX_FILE_SIZE, ALLOWED_IMAGE_TYPES } from '@/config/constants'

export const uploadService = {
  async uploadImage(file: File): Promise<FileInfo> {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`文件大小不能超过 ${MAX_FILE_SIZE / 1024 / 1024}MB`)
    }
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      throw new Error('只支持 JPG、PNG、GIF、WebP 格式')
    }
    const formData = new FormData()
    formData.append('file', file)
    const res = await api.post(API_ENDPOINTS.UPLOAD, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data.data
  },
}
