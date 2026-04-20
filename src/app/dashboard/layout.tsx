import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen flex relative"
      style={{
        fontFamily: "var(--font-inter-tight), var(--font-inter), system-ui, sans-serif",
        color: "#0a1628",
      }}
    >
      {/* Ocean gradient background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 70% 20%, #eaf6ff 0%, #fafcff 55%), linear-gradient(180deg, #fafcff 0%, #f0f6fc 100%)",
        }}
        aria-hidden
      />
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(81,216,255,0.05) 0%, transparent 60%)",
        }}
        aria-hidden
      />
      <DashboardSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
