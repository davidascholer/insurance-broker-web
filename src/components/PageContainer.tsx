import Header from "./header/Header";
import Footer from "./Footer";

export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-(--light-pink)">
      <Header />
      <main
        id="these-styles-are-important"
        className="flex-1 overflow-scroll pt-24 flex flex-col gap-12 p-4"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
