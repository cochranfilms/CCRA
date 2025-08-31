import { loadCommunities } from '@/lib/data';
import { Section } from '@/components/ui/section';
import Link from 'next/link';

export const metadata = {
  title: 'Communities | Cross Creek Realty',
};

export default async function CommunitiesPage() {
  const communities = await loadCommunities();
  return (
    <>
      {/* Hero Section - Million Dollar Design */}
      <Section variant="dark" contained={false} className="relative overflow-hidden !py-0">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-40"
          src="/realty.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        {/* Tint Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="container-wide py-12 md:py-20">
            <div className="max-w-4xl">
              <div className="inline-block px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold tracking-wider mb-6">
                ATLANTA&apos;S FINEST COMMUNITIES
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                Discover Your Perfect
                <span className="block text-4xl md:text-5xl font-light text-amber-400 mt-2">
                  Neighborhood
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl leading-relaxed">
                From luxury high-rises in Buckhead to family-friendly communities in North Fulton, explore Atlanta&apos;s most desirable areas with insider knowledge and market expertise.
              </p>
              
              {/* Premium CTA Section */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10 md:mb-12">
                <Link 
                  href="#communities" 
                  className="relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg tracking-wide transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-offset-4 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">EXPLORE COMMUNITIES</span>
                </Link>
                <Link 
                  href="/#contact" 
                  className="relative px-8 py-4 border-2 border-white/30 text-white font-bold text-lg tracking-wide transition-all duration-300 hover:bg-white hover:text-slate-900 hover:border-white focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-4 group"
                >
                  <span className="relative z-10">NEIGHBORHOOD GUIDE</span>
                </Link>
              </div>

              {/* Premium Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-6 md:pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">25+</div>
                  <div className="text-white/80 text-sm font-medium">COMMUNITIES</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">4</div>
                  <div className="text-white/80 text-sm font-medium">COUNTIES</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">$850K</div>
                  <div className="text-white/80 text-sm font-medium">AVG HOME VALUE</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">9.2/10</div>
                  <div className="text-white/80 text-sm font-medium">SCHOOL RATING</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Premium Overview Section */}
      <Section variant="light" className="py-20">
        <div className="container-wide">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-slate-100 text-slate-600 text-sm font-semibold tracking-wider mb-4">
              ATLANTA METRO
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Where Lifestyle Meets Investment
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Each community offers unique advantages - from top-rated schools and walkable amenities to luxury shopping and fine dining. Our comprehensive market analysis helps you find the perfect balance of lifestyle and investment potential.
            </p>
          </div>

          {/* Premium Feature Grid */}
          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <div className="text-center group">
              <div className="w-32 h-32 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-6xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-2xl shadow-amber-500/30">
                🏫
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">Top-Rated Schools</h3>
              <p className="text-slate-600 leading-relaxed text-lg max-w-sm mx-auto">
                Access to Atlanta&apos;s finest public and private schools, with detailed ratings and performance data for informed family decisions.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-32 h-32 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-6xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-2xl shadow-amber-500/30">
                🚇
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">Prime Location</h3>
              <p className="text-slate-600 leading-relaxed text-lg max-w-sm mx-auto">
                Strategic positioning with easy access to major highways, MARTA stations, and Atlanta&apos;s business and entertainment districts.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-32 h-32 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-6xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-2xl shadow-amber-500/30">
                📈
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">Investment Growth</h3>
              <p className="text-slate-600 leading-relaxed text-lg max-w-sm mx-auto">
                Proven track record of property value appreciation with detailed market analysis and future growth projections.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Communities Grid Section */}
      <Section variant="dark" className="py-20" id="communities">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Featured Communities
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Explore Atlanta&apos;s most desirable neighborhoods with comprehensive insights, market data, and lifestyle information.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {communities.map((c, idx) => (
              <Link 
                key={c.slug} 
                href={`/communities/${c.slug}`} 
                className="group bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden transition-all duration-300 hover:bg-white/10 hover:shadow-2xl hover:shadow-black/20"
              >
                {/* Image Container */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={!c.heroImage.endsWith('.svg') ? c.heroImage : `https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop`} 
                    alt={c.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Community Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold tracking-wide">
                    {c.stats.dom < 30 ? 'HOT MARKET' : 'STABLE'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
                    {c.name}
                  </h3>
                  
                  {/* Stats Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-amber-400 font-bold text-lg">
                      {c.stats.medianPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-white/60 text-sm">
                      {c.stats.dom} days on market
                    </div>
                  </div>

                  {/* Market Status */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-2 h-2 rounded-full ${
                      c.stats.dom < 30 ? 'bg-green-400' : 
                      c.stats.dom < 60 ? 'bg-yellow-400' : 'bg-red-400'
                    }`}></div>
                    <span className="text-white/70 text-sm">
                      {c.stats.dom < 30 ? 'High Demand' : 
                       c.stats.dom < 60 ? 'Moderate Activity' : 'Buyer\'s Market'}
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="text-amber-400 font-semibold text-sm group-hover:text-amber-300 transition-colors duration-300">
                    Explore Community →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* Premium Lifestyle Section */}
      <Section variant="light" className="py-20">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Atlanta Lifestyle Excellence
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover why Atlanta continues to be ranked among the top cities for quality of life, business opportunities, and cultural experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Lifestyle Feature 1 */}
            <div className="bg-white border border-slate-200 p-8 group hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 mb-6 flex items-center justify-center">
                <span className="text-white text-2xl">🍽️</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Culinary Scene</h3>
              <p className="text-slate-600 leading-relaxed">
                From James Beard award-winning restaurants to innovative food halls, Atlanta&apos;s dining scene rivals any major city.
              </p>
            </div>

            {/* Lifestyle Feature 2 */}
            <div className="bg-white border border-slate-200 p-8 group hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 mb-6 flex items-center justify-center">
                <span className="text-white text-2xl">🎭</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Arts & Culture</h3>
              <p className="text-slate-600 leading-relaxed">
                World-class museums, theaters, and cultural institutions that enrich the community and provide endless entertainment.
              </p>
            </div>

            {/* Lifestyle Feature 3 */}
            <div className="bg-white border border-slate-200 p-8 group hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 mb-6 flex items-center justify-center">
                <span className="text-white text-2xl">🌳</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Outdoor Living</h3>
              <p className="text-slate-600 leading-relaxed">
                Beautiful parks, walking trails, and green spaces that promote an active, healthy lifestyle year-round.
              </p>
            </div>

            {/* Lifestyle Feature 4 */}
            <div className="bg-white border border-slate-200 p-8 group hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 mb-6 flex items-center justify-center">
                <span className="text-white text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Business Hub</h3>
              <p className="text-slate-600 leading-relaxed">
                Fortune 500 companies, startups, and entrepreneurs creating opportunities and driving economic growth.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Premium CTA Section */}
      <Section variant="dark" className="py-20">
        <div className="container-wide text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Find Your Community?
            </h2>
            <p className="text-xl text-white/80 mb-12 leading-relaxed">
              Let our neighborhood experts guide you to the perfect community that matches your lifestyle, investment goals, and family needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/#contact" 
                className="relative px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xl tracking-wide transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-offset-4 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">FREE CONSULTATION</span>
              </Link>
              <Link 
                href="/listings" 
                className="relative px-10 py-5 border-2 border-white/30 text-white font-bold text-xl tracking-wide transition-all duration-300 hover:bg-white hover:text-slate-900 hover:border-white focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-4 group"
              >
                <span className="relative z-10">BROWSE HOMES</span>
              </Link>
            </div>

            <div className="mt-12 pt-12 border-t border-white/20">
              <p className="text-white/60 text-sm mb-4">Trusted by Atlanta families for over 15 years</p>
              <div className="flex justify-center items-center gap-8 opacity-60">
                <div className="text-white/40 text-xs">🏆 NEIGHBORHOOD EXPERT</div>
                <div className="text-white/40 text-xs">⭐ LOCAL KNOWLEDGE</div>
                <div className="text-white/40 text-xs">🏠 COMMUNITY PARTNER</div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}


