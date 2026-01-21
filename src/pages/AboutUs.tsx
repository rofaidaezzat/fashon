import { Target, Sparkles, TrendingUp, ShieldCheck, Users } from "lucide-react";
import ImageWithFallback from "../Components/ImageWithFallback";
import { useLanguage } from "../context/LanguageContext";

const AboutUs = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
            alt="Fashion Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-sans font-bold mb-6 tracking-tight">
            {t.about.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto">
            {t.about.subtitle}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Our Story Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          {/* Image */}
          <div className="order-2 md:order-1 relative group">
            <div className="absolute -inset-4 bg-rose-100 rounded-3xl transform rotate-3 transition-transform duration-500 group-hover:rotate-6"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&fit=crop"
              alt="Fashon Story"
              className="relative rounded-3xl shadow-xl w-full object-cover aspect-[3/4]"
            />
          </div>

          {/* Story Text */}
          <div className="order-1 md:order-2">
            <div className="inline-block bg-rose-50 text-rose-600 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              {t.about.our_story}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {t.about.story_title} <br />{" "}
              <span className="text-rose-600">{t.about.story_title_highlight}</span>
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
              <p>
                {t.about.story_p1}
              </p>
              <p>
                {t.about.story_p2}
              </p>
              <p>
                {t.about.story_p3}
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-10 mb-24">
          {/* Mission Card */}
          <div className="bg-gray-50 rounded-3xl p-10 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center mb-6">
              <div className="bg-white p-4 rounded-2xl shadow-sm group-hover:bg-rose-500 transition-colors duration-300">
                <Target className="w-8 h-8 text-rose-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 ml-5">
                {t.about.mission}
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t.about.mission_desc}
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-gray-50 rounded-3xl p-10 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center mb-6">
              <div className="bg-white p-4 rounded-2xl shadow-sm group-hover:bg-rose-500 transition-colors duration-300">
                <Sparkles className="w-8 h-8 text-rose-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 ml-5">
                {t.about.vision}
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t.about.vision_desc}
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              {t.about.values_title}
            </h3>
            <div className="h-1 w-20 bg-rose-500 mx-auto rounded-full"></div>
            <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
              {t.about.values_subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="text-center group">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg group-hover:-translate-y-2 transition-transform duration-300 h-full">
                <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-600 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {t.about.value_1}
                </h4>
                <p className="text-gray-500 leading-relaxed">
                  {t.about.value_1_desc}
                </p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="text-center group">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg group-hover:-translate-y-2 transition-transform duration-300 h-full">
                <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-600 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {t.about.value_2}
                </h4>
                <p className="text-gray-500 leading-relaxed">
                  {t.about.value_2_desc}
                </p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="text-center group">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg group-hover:-translate-y-2 transition-transform duration-300 h-full">
                <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-600 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
                  <Users className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {t.about.value_3}
                </h4>
                <p className="text-gray-500 leading-relaxed">
                  {t.about.value_3_desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="text-center relative py-12">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[120px] leading-none text-gray-100 font-serif font-bold opacity-50 select-none z-0">
            STYLE
          </div>
          <p className="text-3xl text-gray-800 leading-relaxed font-light italic relative z-10 font-serif">
            "{t.about.quote}"
          </p>
          <p className="text-lg text-rose-600 mt-6 font-bold tracking-widest uppercase relative z-10">
            {t.about.quote_author}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
