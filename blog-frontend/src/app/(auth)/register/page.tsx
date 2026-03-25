'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { authService } from '@/services/authService'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import type { RegisterDTO } from '@/types'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterDTO>()
  const password = watch('password')

  const onSubmit = async (data: RegisterDTO) => {
    setLoading(true)
    try {
      await authService.register(data)
      toast.success('注册成功，请登录！')
      router.push('/login')
    } catch {
      // handled
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-black text-lg">Z</span>
            <span className="text-xl font-bold text-gradient">zhouzy博客</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-[var(--color-text-primary)]">创建账号</h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">开始你的创作之旅</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="用户名"
              placeholder="3-20位字母数字"
              leftIcon={<User size={15} />}
              error={errors.username?.message}
              {...register('username', {
                required: '请输入用户名',
                minLength: { value: 3, message: '至少3位' },
                maxLength: { value: 20, message: '最多20位' },
                pattern: { value: /^[a-zA-Z0-9_]+$/, message: '只能包含字母、数字、下划线' },
              })}
            />
            <Input
              label="昵称"
              placeholder="你的显示名称"
              leftIcon={<User size={15} />}
              error={errors.nickname?.message}
              {...register('nickname', { required: '请输入昵称' })}
            />
            <Input
              label="邮箱"
              type="email"
              placeholder="your@email.com"
              leftIcon={<Mail size={15} />}
              error={errors.email?.message}
              {...register('email', {
                required: '请输入邮箱',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '邮箱格式不正确' },
              })}
            />
            <Input
              label="密码"
              type={showPassword ? 'text' : 'password'}
              placeholder="至少6位"
              leftIcon={<Lock size={15} />}
              rightIcon={
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="hover:text-primary-500">
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
              error={errors.password?.message}
              {...register('password', { required: '请输入密码', minLength: { value: 6, message: '至少6位' } })}
            />
            <Input
              label="确认密码"
              type="password"
              placeholder="再次输入密码"
              leftIcon={<Lock size={15} />}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: '请确认密码',
                validate: (v) => v === password || '两次密码不一致',
              })}
            />

            <Button type="submit" fullWidth loading={loading} size="lg" className="mt-2">
              注册
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
            已有账号？<Link href="/login" className="text-primary-500 hover:underline font-medium">立即登录</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
