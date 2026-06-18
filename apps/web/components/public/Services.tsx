const SERVICES = [
  {
    icon: '🔬',
    title: 'علاج جذور الأسنان',
    desc: 'علاج متخصص لقنوات الجذر بأحدث التقنيات وأقل الإيلام',
    price: 'ابتداءً من ٥٠,٠٠٠ د.ع',
  },
  {
    icon: '⚡',
    title: 'استخراج ملف مكسور',
    desc: 'إزالة الملفات المكسورة داخل القناة بدقة عالية وخبرة متخصصة',
    price: 'حسب الحالة',
  },
  {
    icon: '✨',
    title: 'تبييض الأسنان',
    desc: 'جلسات تبييض احترافية تمنحك ابتسامة مشرقة وناصعة',
    price: 'ابتداءً من ٨٠,٠٠٠ د.ع',
  },
  {
    icon: '🛡️',
    title: 'تيجان وتركيبات',
    desc: 'تيجان خزفية وتركيبات ثابتة تحاكي شكل ولون الأسنان الطبيعية',
    price: 'ابتداءً من ١٥٠,٠٠٠ د.ع',
  },
  {
    icon: '🧹',
    title: 'تنظيف وتلميع',
    desc: 'تنظيف احترافي لإزالة الجير والترسبات والحفاظ على صحة اللثة',
    price: '٢٥,٠٠٠ د.ع',
  },
  {
    icon: '📸',
    title: 'أشعة وتشخيص',
    desc: 'أشعة رقمية دقيقة وتشخيص شامل لوضع خطة علاجية مثالية',
    price: '١٥,٠٠٠ د.ع',
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-black text-clinic-dark sm:text-4xl">خدماتنا</h2>
          <p className="mt-3 text-lg text-clinic-muted">
            رعاية متخصصة لكل حالة بأعلى معايير الجودة
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-teal/30 hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-teal/10 text-2xl transition-colors group-hover:bg-teal/20">
                {service.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold text-clinic-dark">{service.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-clinic-muted">{service.desc}</p>
              <p className="text-sm font-bold text-teal">{service.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
