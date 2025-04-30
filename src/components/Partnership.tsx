import React from 'react';


const Partnership = () => (
    <section className='cow-grid-bg py-16'>
  <div className="bg-background max-w-2xl mx-auto my-32 px-6 py-16 rounded-2xl bg-gradient-to-br from-cow-purple/10 to-cow-pink/10 shadow-xl border border-cow-purple/20 pixel-corners">
    <div className="text-center space-y-8 ">
      <div className="space-y-3">
        <h2 className="text-4xl md:text-5xl font-vt323 text-cow-purple drop-shadow-sm">
          Partnership
        </h2>
        <p className="text-base md:text-lg text-cow-purple/80 max-w-xl mx-auto">
          We're excited to be working together with
        </p>
      </div>
      <a href="https://bsky.app/profile/creatorskingdom.bsky.social" 
         target="_blank" 
         rel="noopener" 
         className="inline-block group hover:scale-105 transition-all duration-300 ease-in-out"
      >
        <div id='skibidi' className="border-[#FFD700] border-[1px] bg-[#2F2E49] flex flex-col items-center space-y-4 p-6 rounded-xl bg-gradient-to-br from-cow-purple/5 to-cow-pink/5 hover:from-cow-purple/10 hover:to-cow-pink/10 transition-all shadow-[0_0_15px_-3px_rgba(255,215,0,0.3),0_0_30px_-5px_rgba(255,215,0,0.2),inset_0_0_10px_rgba(255,215,0,0.1)] hover:shadow-[0_0_20px_-1px_rgba(255,215,0,0.4),0_0_40px_-5px_rgba(255,215,0,0.3),inset_0_0_15px_rgba(255,215,0,0.2)]">
          <img 
            src="https://cdn.bsky.app/img/avatar/plain/did:plc:2v6n63ayh4zfevupgxrkufx4/bafkreibufdbu2k76p5mdnwo64bmptl6g2wnl6imd3wxm3nvkstoqgjkz2q@jpeg"
            alt="Creator's Kingdom"
            className="h-24 w-24 rounded-full border-2 border-cow-purple/20 shadow-lg group-hover:border-cow-yellow/50 transition-all" 
          />
          <div className="space-y-2">
            <span className="block text-2xl md:text-3xl font-vt323 group-hover:text-cow-yellow transition-colors">
              Creators' Kingdom
            </span>
            {(() => {
                const description = true;
                return description && (
                <p className="text-cow-purple/70 text-sm md:text-base max-w-md">
                    🏰 ↣ Where Creators Unite
                    👑 ↣ Making unique, diverse, and imaginative content
                    📩 ↣ Private/Invite Only
                </p>
                );
            })()}
            <div className="flex gap-4 justify-center mt-4 pt-3">
              <a
                href="https://bsky.app/profile/creatorskingdom.bsky.social"
                target="_blank"
                rel="noopener"
                className="px-4 py-2 bg-[#0085ff] text-white rounded-lg font-medium hover:bg-[#0070d6] transition-colors flex items-center gap-2"
              >
                <img className='w-5 h-5' src="/assets/bluesky_icon.png" alt="Bluesky"></img>
                Bluesky
              </a>
              <a
                href="https://instagram.com/creatorskingdom"
                target="_blank"
                rel="noopener"
                className="px-4 py-2 bg-[#E1306C] text-white rounded-lg font-medium hover:bg-[#c2255b] transition-colors flex items-center gap-2"
              >
                <img className="w-5 h-5" src="/assets/instagram_icon.png" alt="Instagram"></img>
                Instagram
              </a>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
  </section>
);

export default Partnership;
