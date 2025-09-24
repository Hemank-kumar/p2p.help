import Footer from "./Footer";
import NavBar from "./NavBar";
import ScrollToTop from "./ui/ScrollToTop";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <NavBar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}