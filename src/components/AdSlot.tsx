interface Props {
  position: 'banner' | 'sidebar' | 'in-content';
  className?: string;
}

export default function AdSlot({ position, className = '' }: Props) {
  const heightMap = {
    banner: 'h-[90px]',
    sidebar: 'h-[250px]',
    'in-content': 'h-[250px]',
  };

  return (
    <div
      className={`w-full ${heightMap[position]} bg-card/50 rounded-xl border border-border/50 flex items-center justify-center ${className}`}
      data-ad-slot={position}
      aria-hidden="true"
    >
      <span className="text-xs text-muted/50">Ad Space</span>
    </div>
  );
}
