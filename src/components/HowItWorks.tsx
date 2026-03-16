import type { Step } from '@/types';

export default function HowItWorks({ steps, title = 'How It Works' }: { steps: Step[]; title?: string }) {
  return (
    <section className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">{title}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div key={step.number} className="text-center">
            <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center text-lg font-semibold mx-auto mb-4">
              {step.number}
            </div>
            <h3 className="font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
