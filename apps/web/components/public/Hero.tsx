export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-teal px-4 py-28 sm:px-6 lg:px-8"
      style={{ background: 'linear-gradient(135deg, #1A4A52 0%, #2A6B74 50%, #3D8D98 100%)' }}
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute left-1/4 top-10 text-[200px] select-none">🦷</div>
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-4 inline-block rounded-full bg-gold/20 px-4 py-1.5 text-sm font-semibold text-gold-light">
          البصرة — الزبير
        </div>
        <h1 className="text-4xl font-black leading-tight text-white sm:text-6xl">
          متخصص علاج
          <br />
          <span className="text-gold">جذور الأسنان</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
          د. حيدر — خبرة متخصصة في علاج جذور الأسنان، استخراج الملفات المكسورة،
          والتيجان التركيبية. علاج احترافي بأحدث التقنيات.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#booking"
            className="w-full rounded-xl bg-gold px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-gold-light hover:shadow-xl sm:w-auto"
          >
            احجز موعدك الآن
          </a>
          <a
            href="tel:+9647821487992"
            className="w-full rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-bold text-white transition-all hover:border-white/60 hover:bg-white/10 sm:w-auto"
          >
            📞 اتصل بنا
          </a>
        </div>
      </div>
    </section>
  );
}
