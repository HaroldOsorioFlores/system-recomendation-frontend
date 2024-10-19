import SidebarLayout from "@/components/SidebarLayout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <SidebarLayout>{children}</SidebarLayout>
    </section>
  );
}
