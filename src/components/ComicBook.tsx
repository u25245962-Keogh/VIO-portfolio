import HTMLFlipBook from "react-pageflip";
import cover from "../assets/Comic/COVER.png";
import page1 from "../assets/Comic/FINAL1.png";
import page2 from "../assets/Comic/FINAL2.png";
import page3 from "../assets/Comic/FINAL3.png";
import page4 from "../assets/Comic/FINAL4.png";
import page5 from "../assets/Comic/FINAL5.png";
import back from "../assets/Comic/FINAL5 - Copy.png";
import back2 from "../assets/Comic/FINAL5 - Copy.png";
import "../styles/Comic.css";


function Component({
  onLastPageChange,
}: {
  onLastPageChange: (isLastPage: boolean) => void;
}) {
  const pageData = [
    { id: 1, image: page1 },
    { id: 2, image: page2 },
    { id: 3, image: page3 },
    { id: 4, image: page4 },
    { id: 5, image: page5 },
    { id: 6, image: back },
    { id: 7, image: back2 },
  ];

  return (
    <div style={{ position: "relative", zIndex: 0 }}>
      <HTMLFlipBook
        width={650}
        height={900}
        maxShadowOpacity={0.5}
        drawShadow={true}
        showCover={true}
        size="fixed"
        onFlip={(event) => onLastPageChange(event.data === pageData.length)}
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
                <img src={page.image} className="comicPage" />
              </div>
            </div>
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
}


export default Component;
