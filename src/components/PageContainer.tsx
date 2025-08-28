import Header from "./header/Header";
import Footer from "./Footer";
import { cn } from "@/lib/utils";

export default function PageContainer({
  children,
  className,
  containerClassName
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <div className={cn("flex flex-col min-h-screen bg-(--light-pink) pt-24",className)}>
      <Header />
      <main
        id="these-styles-are-important"
        className={cn("flex-1 flex flex-col gap-12 p-4", containerClassName)}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
