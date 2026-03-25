'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  showPreview?: boolean
  height?: string
}

export default function MarkdownEditor({
  value,
  onChange,
  showPreview = false,
  height = 'calc(100vh - 56px)',
}: MarkdownEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const vditorRef = useRef<unknown>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    let destroyed = false

    const init = async () => {
      const Vditor = (await import('vditor')).default
      await import('vditor/dist/index.css')

      if (!editorRef.current || destroyed) return

      const vd = new Vditor(editorRef.current, {
        height,
        mode: showPreview ? 'ir' : 'sv',
        theme: resolvedTheme === 'dark' ? 'dark' : 'classic',
        lang: 'zh_CN',
        value,
        cache: { enable: false },
        toolbar: [
          'emoji', 'headings', 'bold', 'italic', 'strike', '|',
          'line', 'quote', 'list', 'ordered-list', 'check', 'outdent', 'indent', '|',
          'code', 'inline-code', 'insert-before', 'insert-after', '|',
          'upload', 'link', 'table', '|',
          'undo', 'redo', '|',
          'fullscreen', 'edit-mode',
          {
            name: 'more',
            toolbar: ['both', 'code-theme', 'content-theme', 'export', 'outline', 'preview'],
          },
        ],
        preview: {
          hljs: { style: 'github', lineNumber: true },
          math: { engine: 'KaTeX', inlineDigit: true },
        },
        upload: {
          url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload`,
          headers: {
            Authorization: typeof window !== 'undefined'
              ? `Bearer ${localStorage.getItem('blog_access_token') || ''}`
              : '',
          },
          fieldName: 'file',
          success: (_editor: unknown, msg: string) => {
            try {
              const res = JSON.parse(msg)
              return res.data?.fileUrl || ''
            } catch {
              return ''
            }
          },
        },
        after: () => {
          vditorRef.current = vd
        },
        input: (v: string) => {
          onChange(v)
        },
      })
    }

    init()

    return () => {
      destroyed = true
      if (vditorRef.current) {
        try {
          ;(vditorRef.current as { destroy: () => void }).destroy()
        } catch {
          // ignore
        }
        vditorRef.current = null
      }
    }
    // Only re-init when theme changes (not on every value/onChange change)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedTheme])

  return <div ref={editorRef} className="w-full" />
}
