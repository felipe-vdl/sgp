import Navbar from "../UI/Navbar";
import Footer from "../UI/Footer";
import Sidebar from "../UI/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <div className="flex-1 flex">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}