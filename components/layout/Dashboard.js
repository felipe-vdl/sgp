import Navbar from "../UI/Navbar";
import Footer from "../UI/Footer";
import Sidebar from "../UI/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar bgColor="bg-dourado-500" />
      <div className="flex-1 flex">
        <Sidebar />
        <div className="flex-1 flex">
          {children}
        </div>
      </div>
      <Footer bgColor="bg-mesquita" />
    </div>
  );
}