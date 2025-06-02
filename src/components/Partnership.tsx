import React from 'react';

const Partnership = () => (
    <section className='cow-grid-bg py-16'>
        <div className="bg-background max-w-5xl mx-auto my-32 px-6 py-16 rounded-2xl bg-gradient-to-br from-cow-purple/10 to-cow-pink/10 shadow-xl border border-cow-purple/20 pixel-corners">
            <div className="text-center space-y-8 ">
                <div className="space-y-3">
                    <h2 className="text-4xl md:text-5xl font-vt323 text-cow-purple drop-shadow-sm">
                        Partnership
                    </h2>
                    <p className="text-base md:text-lg text-cow-purple/80 max-w-xl mx-auto">
                        We're excited to be working together with
                    </p>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center gap-8">

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
                                            Creators Kingdom is a place where your ideas can grow and come to life. It's a community built on creativity and teamwork, where everyone's passion helps bring bold visions into reality.
                                        </p>
                                    );
                                })()}
                                <div className="flex gap-4 justify-center mt-4 pt-3">
                                    <a
                                        href="https://bsky.app/profile/creatorskingdom.bsky.social"
                                        target="_blank"
                                        rel="noopener"
                                        className="px-2 py-2 bg-[#0085ff] text-white rounded-lg font-medium hover:bg-[#0070d6] transition-colors flex items-center gap-2"
                                    >
                                        <img className='w-5 h-5' src="/assets/bluesky_icon.png" alt="Bluesky"></img>
                                        Bluesky
                                    </a>
                                    <a
                                        href="https://instagram.com/creatorskingdom"
                                        target="_blank"
                                        rel="noopener"
                                        className="px-2 py-2 bg-[#E1306C] text-white rounded-lg font-medium hover:bg-[#c2255b] transition-colors flex items-center gap-2"
                                    >
                                        <img className="w-5 h-5" src="/assets/instagram_icon.png" alt="Instagram"></img>
                                        Instagram
                                    </a>
                                </div>
                            </div>
                        </div>
                    </a>

                    <a href="https://discord.gg/wXhHe5bVgz"
                       target="_blank"
                       rel="noopener"
                       className="inline-block group hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                         <div className="border-blue-500 border-[1px] bg-gray-800 flex flex-col items-center space-y-4 p-6 rounded-xl bg-gradient-to-br from-blue-500/5 to-green-500/5 hover:from-blue-500/10 hover:to-green-500/10 transition-all shadow-[0_0_15px_-3px_rgba(59,130,246,0.3),0_0_30px_-5px_rgba(59,130,246,0.2),inset_0_0_10px_rgba(59,130,246,0.1)] hover:shadow-[0_0_20px_-1px_rgba(59,130,246,0.4),0_0_40px_-5px_rgba(59,130,246,0.3),inset_0_0_15px_rgba(59,130,246,0.2)]">
                             <img
                                src="/assets/progerskitchen.webp" 
                                alt="Proger's Kitchen icon" 
                                className="h-24 w-24 rounded-full border-2 border-blue-500/20 shadow-lg group-hover:border-blue-400/50 transition-all"
                             />
                            <div className="space-y-2">
                                <span className="block text-2xl md:text-3xl font-vt323 group-hover:text-blue-400 transition-colors">
                                    Proger's Kitchen
                                </span>
                                <p className="text-gray-400 text-sm md:text-base max-w-md">
                                    Proger's Kitchen is a vibrant community where creativity and collaboration thrive. It's a place for creators to give feedback, get feedback, share assets, and help each other grow more and more.
                                </p>
                                <div className="flex gap-4 justify-center mt-4 pt-3">
                                    <a
                                        href="https://discord.gg/wXhHe5bVgz"
                                        target="_blank"
                                        rel="noopener"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                                    >
                                      <img className='w-5 h-5' src="/assets/discord_icon.png" alt="Discord"></img>
                                        Join Discord Server
                                    </a>
                                </div>
                            </div>
                        </div>
                    </a>

                    <a
                       href="https://dsc.gg/decoursmp"
                       target="_blank"
                       rel="noopener"
                       className="inline-block group hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                        <div className="border-green-500 border-[1px] bg-gray-800 flex flex-col items-center space-y-4 p-6 rounded-xl bg-gradient-to-br from-green-500/5 to-blue-500/5 hover:from-green-500/10 hover:to-blue-500/10 transition-all shadow-[0_0_15px_-3px_rgba(34,197,94,0.3),0_0_30px_-5px_rgba(34,197,94,0.2),inset_0_0_10px_rgba(34,197,94,0.1)] hover:shadow-[0_0_20px_-1px_rgba(34,197,94,0.4),0_0_40px_-5px_rgba(34,197,94,0.3),inset_0_0_15px_rgba(34,197,94,0.2)]">
                            <img
                                src="/assets/Decour.jpg"
                                alt="Decour SMP icon"
                                className="h-24 w-24 rounded-full border-2 border-green-500/20 shadow-lg group-hover:border-green-400/50 transition-all"
                            />
                            <span className="block text-2xl md:text-3xl font-vt323 group-hover:text-green-400 transition-colors">
                                Decour SMP
                            </span>
                            <p className="text-gray-400 text-sm md:text-base max-w-md">
                                A fully non-economy based Lifesteal SMP with useful plugins that enhance the vanilla experience. Join our quickly growing community!
                            </p>
                            <div className="flex gap-4 justify-center mt-4 pt-3">
                                <a
                                    href="https://dsc.gg/decoursmp"
                                    target="_blank"
                                    rel="noopener"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
                                >
                                    <img className='w-5 h-5' src="/assets/discord_icon.png" alt="Discord"></img>
                                    Join Discord Server
                                </a>
                            </div>
                        </div>
                    </a>

                </div> 
            </div>
        </div>
    </section>
);

export default Partnership;
