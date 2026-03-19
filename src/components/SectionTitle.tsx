interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionTitle({ title, subtitle, centered = false, light = false }: SectionTitleProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2
        className="font-heading text-3xl sm:text-4xl md:text-5xl font-medium mb-4"
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-text-muted' : 'text-text-muted'}`}>
          {subtitle}
        </p>
      )}
      <div
        className={`h-0.5 bg-accent mt-6 ${centered ? 'mx-auto w-20' : 'w-12'}`}
      />
    </div>
  );
}
