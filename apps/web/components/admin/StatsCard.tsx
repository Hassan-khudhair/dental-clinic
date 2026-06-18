interface StatsCardProps {
  label: string;
  value: number;
  icon: string;
  color: 'teal' | 'gold' | 'blue' | 'green' | 'gray';
}

const COLOR_MAP = {
  teal: 'bg-teal/10 text-teal',
  gold: 'bg-gold/10 text-gold',
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  gray: 'bg-gray-100 text-gray-600',
};

export default function StatsCard({ label, value, icon, color }: StatsCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${COLOR_MAP[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-black text-clinic-dark">{value.toLocaleString('ar-IQ')}</p>
        <p className="text-sm text-clinic-muted">{label}</p>
      </div>
    </div>
  );
}
