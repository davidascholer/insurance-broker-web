import Header from "./header/Header";
import Footer from "./Footer";
import { cn } from "@/lib/utils";

export default function PageContainer({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col min-h-screen bg-(--light-pink)",className)}>
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
