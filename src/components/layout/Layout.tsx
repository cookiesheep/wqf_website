import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import dynamic from 'next/dynamic'

// 动态导入SpringMascot组件，不进行SSR，避免服务器端渲染错误
// 添加loading属性为null，确保完全客户端渲染
const SpringMascot = dynamic(
  () => import('@/components/ui/SpringMascot'),
  { 
    ssr: false,
    loading: () => null
  }
)

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full shadow-xl dark:bg-muted" />
        </div>
      </div>
      <div className="relative flex w-full flex-col px-4 sm:px-0">
        <Header />
        <main className="flex-auto">{children}</main>
        <Footer />
      </div>
      
      {/* 添加小熊弹簧挂件 - 使用客户端组件 */}
      <SpringMascot />
    </>
  )
}
