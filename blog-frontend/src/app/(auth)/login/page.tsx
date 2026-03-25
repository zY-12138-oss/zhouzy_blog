'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { authService } from '@/services/authService'
import { userService } from '@/services/userService'
import { useAuthStore } from '@/store/useAuthStore'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import type { LoginDTO } from '@/types'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const { setUser } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginDTO>()

  const onSubmit = async (data: LoginDTO) => {
    setLoading(true)
    try {
      const result = await authService.login(data)
      setUser(result.user)
      toast.success('登录成功，欢迎回来！')
      router.push('/')
      // 异步获取最新用户信息更新 store，不阻塞跳转
      userService.getUserInfo().then(setUser).catch(() => {})
    } catch (error: any) {
      // 如果 axios 拦截器没有处理，这里兜底提示
      if (!error?.response) {
        toast.error('无法连接到服务器，请检查网络')
      } else {
        toast.error(error?.response?.data?.message || `错误 ${error?.response?.status}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-black text-lg">Z</span>
            <span className="text-xl font-bold text-gradient">zhouzy博客</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-[var(--color-text-primary)]">欢迎回来</h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">登录你的账号继续创作</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="用户名 / 邮箱"
              placeholder="请输入用户名或邮箱"
              leftIcon={<User size={15} />}
              error={errors.username?.message}
              {...register('username', { required: '请输入用户名' })}
            />
            <div className="relative">
              <Input
                label="密码"
                type={showPassword ? 'text' : 'password'}
                placeholder="请输入密码"
                leftIcon={<Lock size={15} />}
                rightIcon={
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="hover:text-primary-500 transition-colors">
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                }
                error={errors.password?.message}
                {...register('password', { required: '请输入密码', minLength: { value: 6, message: '密码至少6位' } })}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" {...register('remember')} />
                <span className="text-[var(--color-text-muted)]">记住我</span>
              </label>
              <Link href="/forgot-password" className="text-primary-500 hover:underline">忘记密码？</Link>
            </div>

            <Button type="submit" fullWidth loading={loading} size="lg">
              登录
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
            还没有账号？<Link href="/register" className="text-primary-500 hover:underline font-medium">立即注册</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
