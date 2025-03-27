"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform, animate } from "framer-motion";
import Image from "next/image";

// 随机消息数组
const messages = [
  "你好啊！",
  "欢迎来到我的网站！",
  "今天过得怎么样？",
  "有什么我能帮你的吗？",
  "记得看看我的项目哦！",
  "谢谢你的访问！",
  "希望你喜欢我的作品！",
  "有任何问题可以联系我！"
];

export default function SpringMascot() {
  // 用于跟踪弹簧位置的动作值
  const y = useMotionValue(0); 
  const x = useMotionValue(0);
  
  // 组件加载状态
  const [isLoaded, setIsLoaded] = useState(false);
  
  // 弹簧物理参数 - 极低阻尼，快速响应
  const springConfig = { 
    stiffness: 150,     // 增加弹性系数
    damping: 4,         // 极低阻尼
    mass: 0.5,          // 降低质量使反应更灵敏
    restDelta: 0.001    // 精确的静止检测
  };
  
  // 弹簧高度映射 - 调整高度变化范围，确保底部不会超出底座
  const springHeightPx = useTransform(y, [-50, 0, 50], [65, 90, 120]);
  
  // 使用弹簧动画使动作平滑
  const springY = useSpring(y, springConfig);
  const springX = useSpring(x, springConfig);
  
  // 根据横向位移添加旋转效果
  const rotateEffect = useTransform(
    springX, 
    [-60, 0, 60], 
    [-12, 0, 12]
  );
  
  // 小熊眨眼效果
  const blinkTimer = useRef<NodeJS.Timeout | null>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  
  // 消息气泡状态
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const messageTimer = useRef<NodeJS.Timeout | null>(null);
  
  // DOM引用
  const containerRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  
  // 检测组件加载
  useEffect(() => {
    // 确保在客户端
    if (typeof window !== 'undefined') {
      setIsLoaded(true);
      console.log('SpringMascot组件已加载到客户端');
      
      // 模拟一次初始交互以确保组件正常工作
      setTimeout(() => {
        // 在中心位置轻微偏移以验证弹簧功能
        if (mascotRef.current) {
          const rect = mascotRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          // 模拟鼠标在近距离
          updateSpringPosition(centerX + 50, centerY + 30);
          
          // 然后回到原位
          setTimeout(() => {
            x.set(0);
            y.set(0);
          }, 1000);
        }
      }, 500);
    }
  }, []);
  
  // 鼠标位置跟踪
  const updateSpringPosition = (clientX: number, clientY: number) => {
    if (!mascotRef.current || !isLoaded) return;
    
    const rect = mascotRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // 计算鼠标与小熊的相对位置
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // 鼠标影响范围 - 增大范围
    const radius = 250;
    
    if (distance < radius) {
      // 计算力度 - 越近影响越大，乘方增强近距离效果
      const force = Math.min(1, Math.pow((radius - distance) / radius, 1.5));
      
      // 应用反向力 - 鼠标推动效果，增强系数
      const offsetX = -deltaX * force * 0.25;
      // 限制垂直方向的移动范围，避免弹簧底部超出底座
      const offsetY = Math.max(-25, Math.min(40, -deltaY * force * 0.15));
      
      // 设置弹簧位置
      x.set(offsetX);
      y.set(offsetY);
      
      // 添加调试信息 - 仅开发环境
      if (process.env.NODE_ENV === 'development') {
        console.log('弹簧交互:', { distance, force, offsetX, offsetY });
      }
    } else {
      // 回到原始位置
      x.set(0);
      y.set(0);
    }
  };
  
  // 设置眨眼和鼠标监听
  useEffect(() => {
    // 确保在浏览器环境中运行
    if (typeof window === 'undefined' || !isLoaded) return;
    
    // 随机眨眼
    const startBlinkInterval = () => {
      const randomInterval = () => Math.random() * 4000 + 2000;
      
      const blink = () => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          blinkTimer.current = setTimeout(blink, randomInterval());
        }, 200);
      };
      
      blinkTimer.current = setTimeout(blink, randomInterval());
    };
    
    startBlinkInterval();
    
    // 全局鼠标移动监听
    const handleMouseMove = (e: MouseEvent) => {
      // 立即更新弹簧位置，不等待状态更新
      updateSpringPosition(e.clientX, e.clientY);
    };
    
    // 添加鼠标监听
    window.addEventListener("mousemove", handleMouseMove);
    
    // 初始化时尝试一次
    if (mascotRef.current) {
      console.log("弹簧组件已加载，监听鼠标移动");
    }
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (blinkTimer.current) clearTimeout(blinkTimer.current);
      if (messageTimer.current) clearTimeout(messageTimer.current);
    };
  }, [isLoaded]);
  
  // 处理点击显示消息
  const handleMascotClick = (e: React.MouseEvent) => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMessage);
    setShowMessage(true);
    
    if (messageTimer.current) {
      clearTimeout(messageTimer.current);
    }
    
    messageTimer.current = setTimeout(() => {
      setShowMessage(false);
    }, 5000);
    
    e.stopPropagation();
  };

  return (
    <div
      ref={containerRef}
      className="fixed right-8 bottom-8 flex flex-col items-center justify-end h-[180px] w-[140px] z-50 select-none"
    >
      {/* 组件加载指示 - 仅开发环境 */}
      {process.env.NODE_ENV === 'development' && !isLoaded && (
        <div className="absolute right-0 bottom-20 text-xs text-red-500">
          加载中...
        </div>
      )}
      
      {/* 消息气泡 */}
      {showMessage && (
        <motion.div 
          className="absolute right-20 bottom-40 bg-white dark:bg-zinc-800 p-3 rounded-lg shadow-lg z-50"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative flex items-center">
            <span className="text-sm whitespace-normal inline-block min-w-[120px] max-w-[180px]">
              {message}
            </span>
            <div className="absolute -bottom-7 right-0 h-0 w-0 border-t-8 border-r-8 border-l-8 border-solid border-t-white dark:border-t-zinc-800 border-r-transparent border-l-transparent" />
          </div>
        </motion.div>
      )}
      
      {/* 整个弹簧单元 */}
      <motion.div
        ref={mascotRef}
        className="relative flex flex-col items-center"
        style={{
          y: springY,
          x: springX,
          rotate: rotateEffect,
        }}
      >
        {/* 小熊立牌 */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={handleMascotClick} 
        >
          <div 
            className="bg-white p-2 rounded-lg shadow-md relative"
          >
            <Image
              src="/apple-touch-icon.png"
              alt="Mascot"
              width={60}
              height={60}
              className="rounded-md relative z-10 pointer-events-none"
            />
            
            {/* 眨眼效果覆盖层 */}
            {isBlinking && (
              <div className="absolute inset-0 z-20 bg-white rounded-md flex items-center justify-center pointer-events-none">
                <Image
                  src="/apple-touch-icon.png"
                  alt="Mascot Blinking"
                  width={60}
                  height={60}
                  className="rounded-md opacity-90 pointer-events-none"
                  style={{ 
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 40%, 0% 40%, 0% 80%, 100% 80%, 100% 100%, 0% 100%)"
                  }}
                />
              </div>
            )}
          </div>
          
          {/* 底座，连接立牌和弹簧 */}
          <div className="w-10 h-3 bg-red-400 rounded-md mt-1" />
        </div>

        {/* 弹簧 */}
        <motion.div
          className="w-4 overflow-visible relative flex items-center justify-center"
          style={{
            height: springHeightPx,
            minHeight: "50px"
          }}
        >
          <svg
            width="20"
            height="100%"
            viewBox="0 0 20 140"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M10,0 C15,10 5,20 10,30 C15,40 5,50 10,60 C15,70 5,80 10,90 C15,100 5,110 10,120 C15,130 5,140 10,140"
              fill="none"
              stroke="#888"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
        
        {/* 弹簧底部连接件 */}
        <div className="w-4 h-2 bg-gray-500 rounded-b-md -mt-1 z-10" />
      </motion.div>
      
      {/* 底部固定台 - 增加高度，改善视觉效果，向下移动 */}
      <div 
        className="w-16 h-8 bg-gray-400 rounded-t-md absolute -bottom-3 flex flex-col items-center" 
      >
        <div className="w-8 h-1 bg-gray-500 rounded-sm mt-1" />
      </div>
      
      {/* 确保底座和弹簧始终连接的隐形元素 - 调整高度和位置 */}
      <div className="w-4 h-20 absolute -bottom-3 bg-transparent pointer-events-none" />
    </div>
  );
} 