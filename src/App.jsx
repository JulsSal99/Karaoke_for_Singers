import Messaggio from "./components/Messaggio";
import Cube3D from "./components/Cube3D";

export default function App() {
  return (
    <div className="container py-4">
      <h3>Test di Animazione</h3>
      <Messaggio testo="Se lo vedi, React sta andato" />
      <Cube3D />
    </div>
  );
}
