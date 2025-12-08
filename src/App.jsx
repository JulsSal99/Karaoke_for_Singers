import Messaggio from "./components/Messaggio";
import KaraokeScroller from "./components/KaraokeScroller";

export default function App() {
  return (
    <div className="container py-4">
      <h3>Karaoke per Cantanti</h3>
      <KaraokeScroller />
    </div>
  );
}
