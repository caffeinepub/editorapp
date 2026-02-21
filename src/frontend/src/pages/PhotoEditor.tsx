import { useMediaQuery } from '../hooks/useMediaQuery';
import { MobilePhotoEditor } from '../components/MobilePhotoEditor';
import { DesktopPhotoEditor } from '../components/DesktopPhotoEditor';
import { ThreeBackground } from '../components/ThreeBackground';
import { NavbarDesktop } from '../components/NavbarDesktop';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { PageTransition } from '../components/PageTransition';

export default function PhotoEditor() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  if (isDesktop) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-black text-white relative">
          <ThreeBackground />
          <NavbarDesktop />

          <div className="md:ml-64 relative z-10">
            <DesktopPhotoEditor />
          </div>

          <MobileBottomNav />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white relative">
        <ThreeBackground />
        
        <div className="relative z-10">
          <MobilePhotoEditor />
        </div>

        <MobileBottomNav />
      </div>
    </PageTransition>
  );
}
