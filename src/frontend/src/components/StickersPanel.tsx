import { usePhotoEditorStore } from '../store/photoEditorStore';
import { Button } from '@/components/ui/button';

const STICKERS = ['😀', '😎', '❤️', '🔥', '⭐', '👍', '🎉', '🎨', '🌟', '💯', '✨', '🚀'];

export function StickersPanel() {
  const { addSticker } = usePhotoEditorStore();

  const handleStickerClick = (emoji: string) => {
    addSticker({
      src: emoji,
      x: 400,
      y: 300,
      width: 64,
      height: 64
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 space-y-4">
      <h3 className="text-xl font-bold text-white shadow-lg">Stickers</h3>
      <div className="grid grid-cols-4 gap-2">
        {STICKERS.map((emoji) => (
          <Button
            key={emoji}
            variant="ghost"
            size="lg"
            onClick={() => handleStickerClick(emoji)}
            className="text-3xl hover:bg-white/20 h-16 shadow-lg"
          >
            {emoji}
          </Button>
        ))}
      </div>
    </div>
  );
}
