import { Toaster } from "@/components/ui/toaster";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className="
  background-light850_dark100 
  relative"
    >
      {/* CONTENT */}
      <div>
        <section
          className="
            flex min-h-screen flex-1 flex-col"
        >
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </section>
      </div>

      {/* TOAST */}
      <div className="fixed top-10 right-10 z-50">
        <Toaster />
      </div>
    </main>
  );
};

export default Layout;
