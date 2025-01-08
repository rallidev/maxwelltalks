interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
}

export function DashboardCard({ title, children }: DashboardCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4">{title}</h2>
      {children}
    </div>
  );
}