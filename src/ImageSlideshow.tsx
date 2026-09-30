import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Button, Dialog, DialogSurface } from "@fluentui/react-components";
import {
  ArrowExpand24Regular, ArrowRotateClockwise24Regular, ArrowRotateCounterclockwise24Regular,
  ChevronLeft24Regular, ChevronRight24Regular, Dismiss24Regular, ZoomIn24Regular, ZoomOut24Regular,
} from "@fluentui/react-icons";
import "./ImageSlideshow.css";

type Slide = { id: string; title: string; image: string; alt: string };
type Props = {
  open: boolean;
  startIndex: number;
  items: readonly Slide[];
  locale: "zh-TW" | "zh-CN";
  onClose: () => void;
};
type View = { zoom: number; fit: number; x: number; y: number; rotation: number };
const originalView: View = { zoom: 1, fit: 1, x: 0, y: 0, rotation: 0 };

export const galleryLabels = (locale: "zh-TW" | "zh-CN") => locale === "zh-TW" ? {
  close: "關閉圖片瀏覽", previous: "上一張", next: "下一張", open: "放大瀏覽",
  failed: "圖片載入失敗", retry: "重新載入", zoomIn: "放大", zoomOut: "縮小",
  reset: "適合視窗", left: "向左旋轉", right: "向右旋轉", viewer: "圖片瀏覽",
} : {
  close: "关闭图片浏览", previous: "上一张", next: "下一张", open: "放大浏览",
  failed: "图片加载失败", retry: "重新加载", zoomIn: "放大", zoomOut: "缩小",
  reset: "适合窗口", left: "向左旋转", right: "向右旋转", viewer: "图片浏览",
};

export function ImageSlideshow({ open, startIndex, items, locale, onClose }: Props) {
  return (
    <Dialog open={open} surfaceMotion={{ duration: 0 }} onOpenChange={(_, data) => { if (!data.open) onClose(); }}>
      <DialogSurface className="image-slideshow" aria-label={galleryLabels(locale).viewer}
        aria-labelledby={undefined} aria-describedby={undefined}
        backdrop={{ className: "image-slideshow-mask" }} backdropMotion={{ duration: 0 }}>
        <Slides startIndex={startIndex} items={items} locale={locale} onClose={onClose} />
      </DialogSurface>
    </Dialog>
  );
}

function Slides({ startIndex, items, locale, onClose }: Omit<Props, "open">) {
  const [selection, setSelection] = useState({ index: startIndex, animate: false });
  const [view, setView] = useState<View>(originalView);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const points = useRef(new Map<number, { x: number; y: number }>());
  const drag = useRef<{ x: number; y: number; view: View; touch: boolean } | null>(null);
  const pinch = useRef<{ distance: number; view: View } | null>(null);
  const labels = galleryLabels(locale);
  const item = items[selection.index];

  const bounded = (next: View): View => {
    const image = imageRef.current;
    const stage = stageRef.current;
    if (!image || !stage || !image.naturalWidth) return next;
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return next;
    const baseFit = Math.min(w / image.naturalWidth, h / image.naturalHeight);
    const rotated = Math.abs(next.rotation % 180) === 90;
    const fit = rotated ? Math.min(w / image.naturalHeight, h / image.naturalWidth) : baseFit;
    const width = fit * (rotated ? image.naturalHeight : image.naturalWidth) * next.zoom;
    const height = fit * (rotated ? image.naturalWidth : image.naturalHeight) * next.zoom;
    const limitX = Math.max(0, (width - w) / 2), limitY = Math.max(0, (height - h) / 2);
    return { ...next, fit: fit / baseFit, x: Math.max(-limitX, Math.min(limitX, next.x)), y: Math.max(-limitY, Math.min(limitY, next.y)) };
  };
  const zoomBy = (factor: number) => setView(current => bounded({
    ...current, zoom: Math.max(1, Math.min(4, current.zoom * factor)),
  }));
  const rotate = (amount: number) => setView(current => bounded({ ...current, rotation: current.rotation + amount }));
  const select = (index: number, animate = true) => {
    setFailed(false);
    setView(originalView);
    setSelection({ index: (index + items.length) % items.length, animate });
  };

  useEffect(() => {
    if (!selection.animate || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animation = imageRef.current?.animate([{ opacity: 0 }, { opacity: 1 }],
      { duration: 150, easing: "ease-out" });
    return () => animation?.cancel();
  }, [selection]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const wheel = (event: WheelEvent) => {
      event.preventDefault();
      zoomBy(Math.exp(-event.deltaY * 0.002));
    };
    const resize = () => setView(current => bounded(current));
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    stage.addEventListener("wheel", wheel, { passive: false });
    return () => { observer.disconnect(); stage.removeEventListener("wheel", wheel); };
  }, []);

  const keyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") select(selection.index - 1, false);
    else if (event.key === "ArrowRight") select(selection.index + 1, false);
    else if (event.key === "+" || event.key === "=") zoomBy(1.25);
    else if (event.key === "-") zoomBy(0.8);
    else if (event.key === "0") setView(originalView);
    else return;
    event.preventDefault();
    event.stopPropagation();
  };
  const pointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || (event.target as Element).closest("button")) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    points.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (points.current.size === 1) {
      drag.current = { x: event.clientX, y: event.clientY, view, touch: event.pointerType === "touch" };
    } else if (points.current.size === 2) {
      const [a, b] = [...points.current.values()];
      pinch.current = { distance: Math.hypot(a.x - b.x, a.y - b.y), view };
      drag.current = null;
    }
  };
  const pointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!points.current.has(event.pointerId)) return;
    points.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pinch.current && points.current.size === 2) {
      const [a, b] = [...points.current.values()];
      const start = pinch.current;
      const zoom = Math.max(1, Math.min(4, start.view.zoom * Math.hypot(a.x - b.x, a.y - b.y) / Math.max(1, start.distance)));
      setView(bounded({ ...start.view, zoom }));
    } else if (drag.current && drag.current.view.zoom > 1) {
      const start = drag.current;
      setView(bounded({ ...start.view, x: start.view.x + event.clientX - start.x, y: start.view.y + event.clientY - start.y }));
    }
  };
  const pointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    points.current.delete(event.pointerId);
    pinch.current = null;
    drag.current = null;
    if (event.type === "pointercancel" || !start?.touch || start.view.zoom !== 1) return;
    const dx = event.clientX - start.x;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(event.clientY - start.y)) {
      select(selection.index + (dx < 0 ? 1 : -1));
    }
  };

  return (
    <div className="image-slideshow-body" onKeyDown={keyboard}>
      <Button className="lightbox-close" appearance="transparent" icon={<Dismiss24Regular />}
        aria-label={labels.close} onClick={onClose} />
      <div className="image-slideshow-stage" ref={stageRef} data-zoomed={view.zoom > 1}
        onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp}
        onPointerCancel={pointerUp} onDoubleClick={() => view.zoom > 1 ? setView(originalView) : zoomBy(2)}>
        {failed ? <div className="lightbox-error" role="alert">{labels.failed}
          <Button onClick={() => { setFailed(false); setAttempt(value => value + 1); }}>{labels.retry}</Button></div>
          : <img key={attempt} ref={imageRef} src={item.image} alt={item.alt} draggable={false}
            onLoad={() => setView(current => bounded(current))} onError={() => setFailed(true)}
            style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.zoom * view.fit}) rotate(${view.rotation}deg)` }} />}
      </div>
      <Button className="lightbox-previous" appearance="transparent" icon={<ChevronLeft24Regular />}
        aria-label={labels.previous} onClick={event => select(selection.index - 1, event.detail !== 0)} />
      <Button className="lightbox-next" appearance="transparent" icon={<ChevronRight24Regular />}
        aria-label={labels.next} onClick={event => select(selection.index + 1, event.detail !== 0)} />
      <div className="lightbox-tools" role="group" aria-label={labels.viewer}>
        <Button appearance="transparent" icon={<ZoomOut24Regular />} aria-label={labels.zoomOut}
          disabled={view.zoom <= 1} onClick={() => zoomBy(0.8)} />
        <Button appearance="transparent" icon={<ZoomIn24Regular />} aria-label={labels.zoomIn}
          disabled={view.zoom >= 4} onClick={() => zoomBy(1.25)} />
        <span className="lightbox-divider" aria-hidden="true" />
        <Button appearance="transparent" icon={<ArrowExpand24Regular />} aria-label={labels.reset} onClick={() => setView(originalView)} />
        <span className="lightbox-divider" aria-hidden="true" />
        <Button appearance="transparent" icon={<ArrowRotateCounterclockwise24Regular />} aria-label={labels.left} onClick={() => rotate(-90)} />
        <Button appearance="transparent" icon={<ArrowRotateClockwise24Regular />} aria-label={labels.right} onClick={() => rotate(90)} />
      </div>
      <span className="lightbox-announcement" role="status" aria-live="polite">{item.alt}</span>
    </div>
  );
}
