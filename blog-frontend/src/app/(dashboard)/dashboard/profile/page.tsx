'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/services/userService'
import { useAuthStore } from '@/store/useAuthStore'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import { Camera } from 'lucide-react'
import { uploadService } from '@/services/uploadService'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { user, setUser } = useAuthStore()
  const queryClient = useQueryClient()
  const [nickname, setNickname] = useState(user?.nickname || '')
  const [signature, setSignature] = useState(user?.signature || '')
  const [location, setLocation] = useState(user?.location || '')
  const [github, setGithub] = useState(user?.github || '')
  const [website, setWebsite] = useState(user?.website || '')
  const [avatarLoading, setAvatarLoading] = useState(false)

  const updateMutation = useMutation({
    mutationFn: () => userService.updateProfile({ nickname, signature, location, github, website }),
    onSuccess: (updated) => {
      setUser({ ...user!, ...updated })
      toast.success('资料已更新')
    },
  })

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarLoading(true)
    try {
      const url = await userService.uploadAvatar(file)
      setUser({ ...user!, avatar: url })
      toast.success('头像已更新')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : '上传失败')
    } finally {
      setAvatarLoading(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-xl font-bold text-[var(--color-text-primary)]">个人资料</h1>

      <div className="card p-6">
        {/* Avatar */}
        <div className="flex items-center gap-5 pb-6 mb-6 border-b border-[var(--color-border)]">
          <div className="relative">
            <img
              src={user?.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${user?.username}`}
              alt={user?.nickname}
              className="w-20 h-20 rounded-2xl object-cover"
            />
            <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl opacity-0 hover:opacity-100 cursor-pointer transition-opacity">
              {avatarLoading
                ? <span className="text-white text-xs">上传中...</span>
                : <Camera size={20} className="text-white" />}
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} disabled={avatarLoading} />
            </label>
          </div>
          <div>
            <p className="font-semibold text-[var(--color-text-primary)]">{user?.nickname}</p>
            <p className="text-sm text-[var(--color-text-muted)]">@{user?.username}</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">点击头像可更换</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <Input label="昵称" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="你的显示名称" />
          <div>
            <label className="text-sm font-medium text-[var(--color-text-secondary)] block mb-1.5">个人签名</label>
            <textarea
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              rows={2}
              placeholder="一句话介绍自己"
              className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-transparent p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <Input label="所在地" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="城市或地区" />
          <Input label="GitHub" value={github} onChange={(e) => setGithub(e.target.value)} placeholder="https://github.com/username" />
          <Input label="个人网站" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://example.com" />

          <div className="flex justify-end pt-2">
            <Button onClick={() => updateMutation.mutate()} loading={updateMutation.isPending}>保存修改</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
