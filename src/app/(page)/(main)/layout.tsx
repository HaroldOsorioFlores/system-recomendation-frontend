import Providers from "@/app/providers";
import SidebarLayout from "@/components/SidebarLayout";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Providers>
        <SidebarLayout>{children}</SidebarLayout>
      </Providers>
    </section>
  );
}
