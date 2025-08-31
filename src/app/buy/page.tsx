import Link from 'next/link';
import { Section } from '@/components/ui/section';

export const metadata = { title: 'Buy | Cross Creek Realty' };

export default function BuyPage() {
  return (
    <>
      {/* Hero Section - Million Dollar Design */}
      <Section variant="dark" contained={false} className="relative overflow-hidden !py-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('/featured-map.jpg')] bg-center bg-no-repeat md:bg-cover opacity-20"></div>
        <div className="relative z-10">
          <div className="container-wide py-12 md:py-20">
            <div className="max-w-4xl">
              <div className="inline-block px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold tracking-wider mb-6">
                PREMIUM HOME BUYING
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                Find Your Dream Home
                <span className="block text-4xl md:text-5xl font-light text-amber-400 mt-2">
                  in Atlanta&apos;s Finest Neighborhoods
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl leading-relaxed">
                Experience white-glove service with data-driven insights, exclusive access to off-market properties, and strategic negotiation that gets you the best possible deal.
              </p>
              
              {/* Premium CTA Section */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10 md:mb-12">
                <Link 
                  href="/listings" 
                  className="relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg tracking-wide transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-offset-4 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">EXPLORE LISTINGS</span>
                </Link>
                <Link 
                  href="/#contact" 
                  className="relative px-8 py-4 border-2 border-white/30 text-white font-bold text-lg tracking-wide transition-all duration-300 hover:bg-white hover:text-slate-900 hover:border-white focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-4 group"
                >
                  <span className="relative z-10">FREE CONSULTATION</span>
                </Link>
              </div>

              {/* Premium Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-6 md:pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">500+</div>
                  <div className="text-white/80 text-sm font-medium">HOMES SOLD</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">98%</div>
                  <div className="text-white/80 text-sm font-medium">CLIENT SATISFACTION</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">$2.1B</div>
                  <div className="text-white/80 text-sm font-medium">TOTAL VOLUME</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">15+</div>
                  <div className="text-white/80 text-sm font-medium">YEARS EXPERIENCE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Premium Process Section */}
      <Section variant="light" className="py-20">
        <div className="container-wide">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-slate-100 text-slate-600 text-sm font-semibold tracking-wider mb-4">
              OUR PROCESS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              The Cross Creek Advantage
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our proven 5-step process ensures you find the perfect home at the best possible price with minimal stress.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-2xl font-bold flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-transparent border-t-amber-500"></div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Discovery & Strategy</h3>
              <p className="text-slate-600 leading-relaxed">
                Deep dive into your lifestyle, needs, and financial goals to create a personalized buying strategy.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-2xl font-bold flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-transparent border-t-amber-500"></div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Market Analysis</h3>
              <p className="text-slate-600 leading-relaxed">
                Comprehensive neighborhood research, market trends, and property value analysis.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-2xl font-bold flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-transparent border-t-amber-500"></div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Property Tours</h3>
              <p className="text-slate-600 leading-relaxed">
                Expert-guided tours with insider knowledge about neighborhoods and properties.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-2xl font-bold flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  4
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-transparent border-t-amber-500"></div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Strategic Offer</h3>
              <p className="text-slate-600 leading-relaxed">
                Data-driven pricing strategy and expert negotiation to secure the best deal.
              </p>
            </div>

            {/* Step 5 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-2xl font-bold flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  5
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-transparent border-t-amber-500"></div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Closing & Beyond</h3>
              <p className="text-slate-600 leading-relaxed">
                Seamless closing process and ongoing support for your new home journey.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Premium Services Grid */}
      <Section variant="dark" className="py-20">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Exclusive Buyer Services
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Access to off-market properties, VIP neighborhood tours, and insider market intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 group hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 mb-6 flex items-center justify-center">
                <span className="text-white text-xl">🏠</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Off-Market Access</h3>
              <p className="text-white/80 leading-relaxed mb-6">
                Get first access to properties before they hit the market through our exclusive network.
              </p>
              <Link href="/#contact" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors duration-300">
                Learn More →
              </Link>
            </div>

            {/* Service 2 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 group hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 mb-6 flex items-center justify-center">
                <span className="text-white text-xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Market Intelligence</h3>
              <p className="text-white/80 leading-relaxed mb-6">
                Real-time market data, neighborhood insights, and property value projections.
              </p>
              <Link href="/#contact" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors duration-300">
                Learn More →
              </Link>
            </div>

            {/* Service 3 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 group hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 mb-6 flex items-center justify-center">
                <span className="text-white text-xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Negotiation Expertise</h3>
              <p className="text-white/80 leading-relaxed mb-6">
                Strategic negotiation tactics that consistently secure better prices and terms.
              </p>
              <Link href="/#contact" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors duration-300">
                Learn More →
              </Link>
            </div>

            {/* Service 4 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 group hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 mb-6 flex items-center justify-center">
                <span className="text-white text-xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Property Analysis</h3>
              <p className="text-white/80 leading-relaxed mb-6">
                Comprehensive property inspections, renovation estimates, and investment potential.
              </p>
              <Link href="/#contact" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors duration-300">
                Learn More →
              </Link>
            </div>

            {/* Service 5 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 group hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 mb-6 flex items-center justify-center">
                <span className="text-white text-xl">💼</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Closing Support</h3>
              <p className="text-white/80 leading-relaxed mb-6">
                End-to-end closing coordination with trusted lenders, inspectors, and attorneys.
              </p>
              <Link href="/#contact" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors duration-300">
                Learn More →
              </Link>
            </div>

            {/* Service 6 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 group hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 mb-6 flex items-center justify-center">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Post-Purchase Care</h3>
              <p className="text-white/80 leading-relaxed mb-6">
                Ongoing support, maintenance referrals, and neighborhood integration assistance.
              </p>
              <Link href="/#contact" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors duration-300">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Premium Tools Section */}
      <Section variant="light" className="py-20">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Essential Buyer Tools
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Access our premium tools and resources to make informed decisions throughout your home buying journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Tool 1 */}
            <div className="bg-white border border-slate-200 p-8 group hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 mb-6 flex items-center justify-center">
                <span className="text-white text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Payment Calculator</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Calculate monthly payments, estimate closing costs, and understand your buying power.
              </p>
              <Link 
                href="/calculator" 
                className="inline-block px-6 py-3 bg-slate-900 text-white font-semibold transition-all duration-300 hover:bg-amber-500 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-offset-4"
              >
                Calculate Now
              </Link>
            </div>

            {/* Tool 2 */}
            <div className="bg-white border border-slate-200 p-8 group hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 mb-6 flex items-center justify-center">
                <span className="text-white text-2xl">🗺️</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Featured Areas</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Explore Atlanta&apos;s most desirable neighborhoods with detailed insights and market data.
              </p>
              <Link 
                href="/featured-areas" 
                className="inline-block px-6 py-3 bg-slate-900 text-white font-semibold transition-all duration-300 hover:bg-amber-500 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-offset-4"
              >
                Explore Areas
              </Link>
            </div>

            {/* Tool 3 */}
            <div className="bg-white border border-slate-200 p-8 group hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 mb-6 flex items-center justify-center">
                <span className="text-white text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Buyer Checklist</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Comprehensive checklist to ensure you&apos;re prepared for every step of the buying process.
              </p>
              <Link 
                href="/#contact" 
                className="inline-block px-6 py-3 bg-slate-900 text-white font-semibold transition-all duration-300 hover:bg-amber-500 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-offset-4"
              >
                Get Checklist
              </Link>
            </div>

            {/* Tool 4 */}
            <div className="bg-white border border-slate-200 p-8 group hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 mb-6 flex items-center justify-center">
                <span className="text-white text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Market Reports</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Monthly market insights, trend analysis, and neighborhood performance data.
              </p>
              <Link 
                href="/#contact" 
                className="inline-block px-6 py-3 bg-slate-900 text-white font-semibold transition-all duration-300 hover:bg-amber-500 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-offset-4"
              >
                View Reports
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Premium CTA Section */}
      <Section variant="dark" className="py-20">
        <div className="container-wide text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-xl text-white/80 mb-12 leading-relaxed">
              Join hundreds of satisfied buyers who trusted Cross Creek Realty to guide them through one of life&apos;s most important decisions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/listings" 
                className="relative px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xl tracking-wide transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-offset-4 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">START YOUR SEARCH</span>
              </Link>
              <Link 
                href="/#contact" 
                className="relative px-10 py-5 border-2 border-white/30 text-white font-bold text-xl tracking-wide transition-all duration-300 hover:bg-white hover:text-slate-900 hover:border-white focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-4 group"
              >
                <span className="relative z-10">FREE CONSULTATION</span>
              </Link>
            </div>

            <div className="mt-12 pt-12 border-t border-white/20">
              <p className="text-white/60 text-sm mb-4">Trusted by Atlanta&apos;s most discerning buyers</p>
              <div className="flex justify-center items-center gap-8 opacity-60">
                <div className="text-white/40 text-xs">🏆 TOP PRODUCER 2024</div>
                <div className="text-white/40 text-xs">⭐ 5-STAR RATING</div>
                <div className="text-white/40 text-xs">🏠 LUXURY SPECIALIST</div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}


