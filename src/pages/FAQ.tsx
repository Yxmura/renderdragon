import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DonateButton from '@/components/DonateButton';
import { ChevronDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const [activeTab, setActiveTab] = useState('faq');
  
  useEffect(() => {
    document.title = 'FAQ - Renderdragon';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 cow-grid-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-vt323 mb-8 text-center">
              <span className="text-cow-purple">Legal</span> Information
            </h1>
            
            <Tabs defaultValue="faq" value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid w-full grid-cols-3 pixel-corners">
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="tos">Terms of Service</TabsTrigger>
                <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
              </TabsList>
              
              <TabsContent value="faq" className="mt-6">
                <div className="pixel-card">
                  <h2 className="text-2xl font-vt323 mb-6">Frequently Asked Questions</h2>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left font-medium">
                        Is everything on Renderdragon really free?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Yes! All resources, tools, and guides on Renderdragon are 100% free to use. 
                        We believe in supporting the Minecraft content creator community without paywalls. 
                        Some resources may require attribution to the original creator, which will be clearly marked on each resource.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left font-medium">
                        Do I need to create an account to download resources?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Nope! No account or login is required. Everything is freely available without registration.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left font-medium">
                        Can I use these resources in my commercial content?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Yes! You can use Renderdragon resources in monetized content like YouTube videos, Twitch streams, and more. 
                        Just check the resource page for any attribution requirements. Crediting us is optional, but always appreciated.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-left font-medium">
                        How accurate is the Music Copyright Checker?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Our tool gives general guidance based on known copyright data. However, since copyright policies and licensing can change, 
                        we always recommend verifying with the platform’s official tools like YouTube’s Content ID or by checking with the track owner directly. 
                        When in doubt, use music that’s clearly marked copyright-free or licensed.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-left font-medium">
                        How can I submit my own resources to share?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        We love community contributions! Join our Discord via the Contact page and share your work with us. 
                        Our team will review your submission, and if accepted, we’ll publish it and give you full credit as the creator.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-6">
                      <AccordionTrigger className="text-left font-medium">
                        Is the YouTube Downloader legal to use?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Our YouTube Downloader is intended for personal and educational use only. 
                        It is your responsibility to ensure that any content you download is used in accordance with copyright law 
                        and YouTube’s Terms of Service. Please respect content ownership.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-7">
                      <AccordionTrigger className="text-left font-medium">
                        How often are new resources added?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        We update the library regularly, depending on community submissions and internal projects. 
                        The more the community contributes, the more often you’ll see new assets!
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-8">
                      <AccordionTrigger className="text-left font-medium">
                        Who is behind Renderdragon?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Renderdragon was created by Team Wheels — a passionate group of developers and creators 
                        who wanted to make high-quality content creation tools and assets more accessible. 
                        You can learn more about us on the Contact page.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-9">
                      <AccordionTrigger className="text-left font-medium">
                        I got a copyright claim on my video. What should I do?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        That sucks — we know how frustrating that can be. First, double-check if the asset had any special requirements listed. 
                        If the claim seems incorrect or if you believe the resource shouldn’t be listed, please open a ticket in our Discord server. 
                        We'll investigate and remove or update the resource if needed. Keep in mind that Renderdragon does not guarantee that every asset is fully copyright-free.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </TabsContent>
              
              <TabsContent value="tos" className="mt-6">
                <div className="pixel-card space-y-6">
                  <h2 className="text-2xl font-vt323">Terms of Service</h2>

                  <div className="space-y-4 text-muted-foreground">
                    <h3 className="text-lg font-medium text-foreground">1. Acceptance of Terms</h3>
                    <p>
                      By accessing and using Renderdragon ("the Website"), you accept and agree to be bound by these 
                      Terms of Service. If you do not agree to these terms, please do not use the Website.
                    </p>

                    <h3 className="text-lg font-medium text-foreground">2. Use of Resources</h3>
                    <p>
                      All resources provided on Renderdragon are available for free for both personal and commercial use, 
                      unless otherwise stated on the specific resource. Some assets may require attribution to the original creator, 
                      which will be clearly indicated on the resource page.
                    </p>

                    <h3 className="text-lg font-medium text-foreground">3. Limitation of Liability</h3>
                    <p>
                      All resources and tools on Renderdragon are provided "as is" without any warranties, expressed or implied. 
                      In no event shall Renderdragon be liable for any damages including, but not limited to, 
                      direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use 
                      the Website, its resources, or its tools.
                    </p>

                    <h3 className="text-lg font-medium text-foreground">4. Copyright and Intellectual Property</h3>
                    <p>
                      The content on Renderdragon, including but not limited to text, graphics, logos, and software, is either 
                      the property of Renderdragon or used with permission from the respective creators. 
                      All content is protected under applicable intellectual property laws. Users are granted a limited, 
                      non-exclusive license to download and use resources for their own projects, subject to any additional 
                      terms specified on individual resource pages.
                    </p>

                    <h3 className="text-lg font-medium text-foreground">5. Copyright Issues</h3>
                    <p>
                      Renderdragon is a free library of community-submitted and openly available resources for content creators.
                      While we strive to ensure that most assets are copyright-free or licensed for commercial use, 
                      we do not and cannot guarantee that every resource is completely copyright-free.
                    </p>
                    <p>
                      Renderdragon does not claim ownership over all assets hosted or linked on this platform. These resources 
                      are owned by their respective creators and contributors. If a user receives a copyright claim on platforms 
                      such as YouTube, Twitch, Kick, or others, it is the user's responsibility to contact the original creator 
                      of the resource for clarification.
                    </p>
                    <p>
                      By using assets from Renderdragon, users acknowledge and accept that they do so at their own risk. 
                      Renderdragon is not liable for any copyright claims or disputes that may arise from the use of 
                      these resources.
                    </p>
                    <p>
                      If you believe a resource violates copyright or wish to request its removal, please use the Contact page 
                      to report it. We take such concerns seriously and will respond promptly.
                    </p>

                    <h3 className="text-lg font-medium text-foreground">6. User Conduct</h3>
                    <p>Users of Renderdragon agree not to:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Use the Website for any unlawful or malicious purpose</li>
                      <li>Attempt to gain unauthorized access to any part of the Website or its servers</li>
                      <li>Resell, redistribute, or reupload resources from the Website as their own</li>
                      <li>Falsely claim ownership or authorship of any resource found on the Website</li>
                    </ul>

                    <h3 className="text-lg font-medium text-foreground">7. Changes to Terms</h3>
                    <p>
                      Renderdragon reserves the right to modify or update these Terms of Service at any time without prior notice. 
                      Changes will be effective immediately upon posting. Continued use of the Website after any changes 
                      constitutes your acceptance of the revised terms.
                    </p>

                    <h3 className="text-lg font-medium text-foreground">8. Contact Information</h3>
                    <p>
                      If you have any questions about these Terms of Service, copyright concerns, or need assistance, 
                      please reach out to us via the Contact page on <a href="https://renderdragon.org" className="underline">renderdragon.org</a>.
                    </p>

                    <p className="text-sm">
                      Last updated: April 2025
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="privacy" className="mt-6">
                <div className="pixel-card space-y-6">
                  <h2 className="text-2xl font-vt323">Privacy Policy</h2>

                  <div className="space-y-4 text-muted-foreground">
                    <h3 className="text-lg font-medium text-foreground">1. Information We Collect</h3>
                    <p>
                      Renderdragon is committed to protecting your privacy. We do not collect personal information 
                      such as names, emails, or phone numbers. The only data we collect is limited to standard web server logs, which may include:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>IP addresses</li>
                      <li>Browser type and version</li>
                      <li>Device type</li>
                      <li>Pages visited and referring URLs</li>
                      <li>Time and date of access</li>
                    </ul>

                    <h3 className="text-lg font-medium text-foreground">2. How We Use Information</h3>
                    <p>
                      The information we collect is used exclusively to monitor site performance, detect technical issues, 
                      and understand general usage trends to improve the website experience. 
                      We do not share, sell, rent, or trade your data with third parties, unless legally required.
                    </p>

                    <h3 className="text-lg font-medium text-foreground">3. Cookies</h3>
                    <p>
                      Renderdragon uses cookies for essential site functionality and user experience (e.g., remembering light/dark mode). 
                      These cookies do not contain personal data and are never used for advertising or tracking you across other websites. 
                      You can disable cookies in your browser settings, but some features may not work correctly.
                    </p>

                    <h3 className="text-lg font-medium text-foreground">4. Third-Party Services</h3>
                    <p>
                      We may use privacy-respecting analytics tools (like Google Analytics or alternatives such as Plausible) 
                      to understand aggregate website traffic and usage. These services may receive basic non-identifiable information 
                      (like your IP address or browser type). No personally identifying data is shared with them.
                    </p>

                    <h3 className="text-lg font-medium text-foreground">5. External Links</h3>
                    <p>
                      Our website may link to third-party sites or tools (e.g., YouTube, Spotify, Discord). 
                      We are not responsible for the content or privacy practices of those external websites. 
                      Please read their privacy policies before engaging with their services.
                    </p>

                    <h3 className="text-lg font-medium text-foreground">6. Data Security</h3>
                    <p>
                      We take reasonable steps to secure all data collected through encrypted connections (HTTPS) 
                      and limited-access server environments. However, no online system is completely immune to risks, 
                      so we recommend not sharing sensitive personal information on any part of our platform.
                    </p>

                    <h3 className="text-lg font-medium text-foreground">7. Children’s Privacy</h3>
                    <p>
                      Renderdragon is not intended for children under the age of 13. 
                      We do not knowingly collect or store data from children. If you believe that a child under 13 has provided us with personal data, 
                      please contact us immediately and we will take appropriate action.
                    </p>

                    <h3 className="text-lg font-medium text-foreground">8. Your Data Rights</h3>
                    <p>
                      You have the right to request access to any data we may hold about you (if any), 
                      or to request deletion of that data. Since we don’t collect user accounts or personal identifiers, 
                      such requests are rarely needed, but we’re happy to help. Just contact us via the Contact page or Discord.
                    </p>

                    <h3 className="text-lg font-medium text-foreground">9. Changes to This Policy</h3>
                    <p>
                      We may update this Privacy Policy to reflect changes to our practices or for legal reasons. 
                      Any updates will be posted here, and the “Last updated” date will be changed accordingly.
                    </p>

                    <h3 className="text-lg font-medium text-foreground">10. Contact Information</h3>
                    <p>
                      If you have any questions, feedback, or concerns about your privacy on Renderdragon, 
                      please reach out to us through the Contact page or join our Discord server.
                    </p>

                    <p className="text-sm">
                      Last updated: April 2025
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <DonateButton />
      <Footer />
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default FAQ;