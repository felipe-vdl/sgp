import Navbar from "../UI/Navbar";
import Footer from "../UI/Footer";

export default function RegularLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-mesquita">
      <Navbar />
      <main className="flex-1 flex text-white">
        {children}
      </main>
      <Footer />
    </div>
  )
}