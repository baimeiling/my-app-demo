// 基准大小
const baseSize = 16;

// 设置 rem 函数
export const rem = (px: number) => {
  return `${px / baseSize}rem`;
};

// 初始化 rem 配置
export const initRem = () => {
  const docEl = document.documentElement;
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  
  const recalc = () => {
    const clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    
    // 以375px设计稿为基准
    const fontSize = (clientWidth / 375) * baseSize;
    docEl.style.fontSize = `${Math.min(fontSize, 24)}px`; // 最大不超过24px
  };
  
  window.addEventListener(resizeEvt, recalc, false);
  document.addEventListener('DOMContentLoaded', recalc, false);
  recalc();
};