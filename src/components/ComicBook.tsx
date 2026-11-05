import HTMLFlipBook from "react-pageflip";
import cover from "../assets/Comic/COVER.webp";
import page1 from "../assets/Comic/FINAL1.png";
import page2 from "../assets/Comic/FINAL2.png";
import page3 from "../assets/Comic/FINAL3.png";
import page4 from "../assets/Comic/FINAL4.png";
import page5 from "../assets/Comic/FINAL5.png";
import back from "../assets/Comic/FINAL5 - Copy.png";
import back2 from "../assets/Comic/FINAL5 - Copy.png";
import "../styles/Comic.css";
import { useRef } from "react";


function Component({
  onLastPageChange,
}: {
  onLastPageChange: (isLastPage: boolean) => void;
}) {
  const pageAudioRef = useRef<HTMLAudioElement>(null);
  const pageData = [
    { id: 1, image: page1 },
    { id: 2, image: page2 },
    { id: 3, image: page3 },
    { id: 4, image: page4 },
    { id: 5, image: page5 },
    { id: 6, image: back },
    { id: 7, image: back2 },
  ];

  function handleFlip(pageIndex: number) {
    onLastPageChange(pageIndex === pageData.length);

    const pageAudio = pageAudioRef.current;
    if (pageAudio) {
      pageAudio.currentTime = 0;
      pageAudio.play().catch((error: unknown) => {
        console.error("Unable to play page-turn audio:", error);
      });
    }
  }

  return (
    <div className="comic-book-wrapper" style={{ position: "relative", zIndex: 0 }}>
      <audio ref={pageAudioRef} src="/page.wav" preload="auto" />
      <HTMLFlipBook
        width={550}
        height={760}
        maxShadowOpacity={0.5}
        drawShadow={true}
        showCover={true}
        size="fixed"
        onFlip={(event) => handleFlip(event.data)}
      >
        <div className="page" style={{ background: "white" }}>
          <div className="page-content cover">
            <img src={cover} className="comicPage" />
          </div>
        </div>

        {pageData.map((page) => (
          <div className="page" key={page.id}>
            <div className="page-content">
              <div className="container">
                  
                <img src={page.image} className="comicPage"  />
              </div>
            </div>
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
}


export default Component;
