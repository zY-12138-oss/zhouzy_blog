'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import {
  Save, Send, Eye, EyeOff, Settings, X,
  Image as ImageIcon, Tag, Folder, FileText
} from 'lucide-react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { articleService } from '@/services/articleService'
import { uploadService } from '@/services/uploadService'
import { useAuthStore } from '@/store/useAuthStore'
import { setDraft, getDraft, clearDraft } from '@/utils/storage'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Badge from '@/components/common/Badge'
import Modal from '@/components/common/Modal'
import type { CreateArticleDTO, Category, Tag as TagType } from '@/types'
import toast from 'react-hot-toast'
import { clsx } from 'clsx'

const MarkdownEditor = dynamic(() => import('@/components/MarkdownEditor/MarkdownEditor'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-[var(--color-text-muted)]">编辑器加载中...</div>
    </div>
  ),
})

export default function EditorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('id')
  const { isAuthenticated } = useAuthStore()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [summary, setSummary] = useState('')
  const [cover, setCover] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [tagIds, setTagIds] = useState<string[]>([])
  const [allowComment, setAllowComment] = useState(true)
  const [isTop, setIsTop] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const autoSaveRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => articleService.getCategories(),
  })

  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: () => articleService.getTags(),
  })

  // Load existing article for editing
  const { data: existingArticle } = useQuery({
    queryKey: ['article-edit', editId],
    queryFn: () => articleService.getArticleById(editId!),
    enabled: !!editId,
  })

  useEffect(() => {
    if (existingArticle) {
      setTitle(existingArticle.title)
      setContent(existingArticle.contentMd || '')
      setSummary(existingArticle.summary || '')
      setCover(existingArticle.cover || '')
      setCategoryId(existingArticle.categoryId || '')
      setTagIds(existingArticle.tags?.map((t) => t.id) || [])
      setAllowComment(existingArticle.allowComment === 1)
      setIsTop(existingArticle.isTop === 1)
    } else {
      // Load draft
      const draft = getDraft()
      if (draft) {
        try {
          const parsed = JSON.parse(draft)
          setTitle(parsed.title || '')
          setContent(parsed.content || '')
        } catch {
          setContent(draft)
        }
      }
    }
  }, [existingArticle])

  // Auto-save draft every 30s
  useEffect(() => {
    autoSaveRef.current = setInterval(() => {
      if (title || content) {
        setDraft(JSON.stringify({ title, content, savedAt: new Date().toISOString() }))
      }
    }, 30000)
    return () => {
      if (autoSaveRef.current) clearInterval(autoSaveRef.current)
    }
  }, [title, content])

  const saveMutation = useMutation({
    mutationFn: (status: 0 | 1) => {
      const dto: CreateArticleDTO = {
        title: title || '无标题',
        contentMd: content,
        summary,
        cover: cover || undefined,
        categoryId: categoryId || undefined,
        tagIds,
        status,
        allowComment: allowComment ? 1 : 0,
        isTop: isTop ? 1 : 0,
      }
      if (editId) {
        return articleService.updateArticle(editId, { ...dto, id: editId })
      }
      return articleService.createArticle(dto)
    },
    onSuccess: (article, status) => {
      clearDraft()
      if (status === 1) {
        toast.success('文章已发布！')
        router.push(`/articles/${article.id}`)
      } else {
        toast.success('草稿已保存')
        if (!editId) router.replace(`/articles/edit?id=${article.id}`)
      }
    },
  })

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const info = await uploadService.uploadImage(file)
      setCover(info.fileUrl)
      toast.success('封面上传成功')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : '上传失败')
    }
  }

  const toggleTag = (tagId: string) => {
    setTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    )
  }

  if (!isAuthenticated) {
    router.push('/login')
    return null
  }

  return (
    <div className="h-screen flex flex-col bg-[var(--color-bg)]">
      {/* Editor Header */}
      <header className="h-14 border-b border-[var(--color-border)] bg-[var(--color-bg-card)] flex items-center px-4 gap-3 shrink-0">
        <button
          onClick={() => router.back()}
          className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg-subtle)] transition-colors"
        >
          <X size={18} />
        </button>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="输入文章标题..."
          className="flex-1 text-lg font-semibold bg-transparent border-none outline-none text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
        />
        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant="ghost"
            size="sm"
            icon={<Eye size={15} />}
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? '编辑' : '预览'}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={<Settings size={15} />}
            onClick={() => setSettingsOpen(true)}
          >
            设置
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={<Save size={15} />}
            loading={saveMutation.isPending}
            onClick={() => saveMutation.mutate(0)}
          >
            保存草稿
          </Button>
          <Button
            size="sm"
            icon={<Send size={15} />}
            loading={saveMutation.isPending}
            onClick={() => saveMutation.mutate(1)}
          >
            发布
          </Button>
        </div>
      </header>

      {/* Editor Body */}
      <div className="flex-1 overflow-hidden">
        <MarkdownEditor
          value={content}
          onChange={setContent}
          showPreview={showPreview}
        />
      </div>

      {/* Settings Modal */}
      <Modal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        title="文章设置"
        size="lg"
      >
        <div className="space-y-5">
          {/* Summary */}
          <div>
            <label className="text-sm font-medium text-[var(--color-text-secondary)] block mb-1.5">文章摘要</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={3}
              placeholder="简短描述文章内容..."
              className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-transparent p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Cover */}
          <div>
            <label className="text-sm font-medium text-[var(--color-text-secondary)] block mb-1.5">封面图片</label>
            {cover ? (
              <div className="relative">
                <img src={cover} alt="cover" className="w-full h-32 object-cover rounded-lg" />
                <button
                  onClick={() => setCover('')}
                  className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
                ><X size={12} /></button>
              </div>
            ) : (
              <label className="flex items-center justify-center gap-2 w-full h-24 rounded-lg border-2 border-dashed border-[var(--color-border)] hover:border-primary-400 cursor-pointer transition-colors text-[var(--color-text-muted)] text-sm">
                <ImageIcon size={18} /> 点击上传封面
                <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
              </label>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-[var(--color-text-secondary)] block mb-1.5"><Folder size={13} className="inline mr-1" />分类</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">请选择分类</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium text-[var(--color-text-secondary)] block mb-1.5"><Tag size={13} className="inline mr-1" />标签</label>
            <div className="flex flex-wrap gap-2">
              {tags?.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={clsx(
                    'px-2.5 py-1 rounded-lg text-xs font-medium border transition-all',
                    tagIds.includes(tag.id)
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-primary-400'
                  )}
                >
                  #{tag.name}
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={allowComment}
                onChange={(e) => setAllowComment(e.target.checked)}
                className="rounded"
              />
              允许评论
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={isTop}
                onChange={(e) => setIsTop(e.target.checked)}
                className="rounded"
              />
              置顶文章
            </label>
          </div>
        </div>
      </Modal>
    </div>
  )
}
