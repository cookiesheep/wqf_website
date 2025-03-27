"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud";

// 检测是否在Vercel环境
const isVercelProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' 
  || process.env.VERCEL_ENV === 'production'
  || typeof window !== 'undefined' && window.location.hostname.includes('vercel.app');

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
    freezeActive: false,
    shuffleTags: true,
    textColour: "",
    noSelect: true,
    imageMode: "both",
  },
};

export type DynamicCloudProps = {
  iconSlugs: string[];
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

export default function IconCloud({ iconSlugs }: DynamicCloudProps) {
  const [data, setData] = useState<IconData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  // 在客户端获取图标数据
  useEffect(() => {
    if (typeof window === 'undefined') return; // 服务器端不执行
    
    setIsLoading(true);
    setError(null);
    
    fetchSimpleIcons({ slugs: iconSlugs })
      .then((result) => {
        setData(result);
        console.log("Icons loaded successfully:", Object.keys(result.simpleIcons).length);
      })
      .catch((error) => {
        console.error("Error loading icons:", error);
        setError("Failed to load icons");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [iconSlugs]);

  // 直接使用renderSimpleIcon，但强制设置颜色
  const renderedIcons = useMemo(() => {
    if (!data || typeof window === 'undefined') return null;

    // 确保每个图标都有颜色
    return Object.values(data.simpleIcons).map((icon) => {
      // 检查图标颜色并记录
      console.log(`Icon ${icon.title}: hex=${icon.hex}`);
      
      // 在Vercel环境下需要特殊处理
      if (isVercelProduction) {
        // 不设置任何背景色和对比度参数
        return renderSimpleIcon({
          icon,
          size: 42,
          // 通过aProps直接设置图标颜色
          aProps: {
            href: '#',
            onClick: (e) => e.preventDefault(),
            style: {
              color: `#${icon.hex}`,
              fill: `#${icon.hex}`,
            },
          },
        });
      }
      
      // 本地环境，使用正常渲染
      return renderSimpleIcon({
        icon,
        size: 42,
        // 为本地环境设置一个更适合的背景色
        bgHex: theme === 'dark' ? '#1e1e20' : '#ffffff',
        fallbackHex: '#888888',
        aProps: {
          href: '#',
          onClick: (e) => e.preventDefault(),
        },
      });
    });
  }, [data, theme]);

  if (isLoading) {
    return <div className="animate-pulse h-full w-full bg-muted/20 rounded-lg flex items-center justify-center">Loading icons...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!renderedIcons) {
    return <div>No icons available</div>;
  }

  // 在渲染前记录环境信息
  console.log("Environment:", isVercelProduction ? "Vercel Production" : "Local/Development");
  console.log("Theme:", theme);

  return (
    // @ts-ignore - Cloud组件类型可能与React 18不完全兼容
    <Cloud {...cloudProps}>
      <>{renderedIcons}</>
    </Cloud>
  );
}
