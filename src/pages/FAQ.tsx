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
                        Some resources may require attribution to the original creator, but that will be 
                        clearly marked on each resource.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left font-medium">
                        Do I need to create an account to download resources?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        No, you don't need to create an account to access or download any resources 
                        from Renderdragon. Everything is freely available without registration.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left font-medium">
                        Can I use these resources in my commercial content?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Yes, you can use our resources in your monetized content (YouTube videos, Twitch streams, etc.). 
                        Just be sure to check if the specific resource requires attribution to the original creator. 
                        This information will be clearly displayed on each resource's page. Crediting us is optional but appreciated.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-left font-medium">
                        How accurate is the Music Copyright Checker?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Our Music Copyright Checker provides general guidance based on known information about songs, but copyright policies can change frequently. While we strive to provide accurate information, we recommend double-checking with the official sources or using YouTube's Content ID system before publishing. Alternatives are finding copyright-free music on Youtube or paying for Epidemicsound.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-left font-medium">
                        How can I submit my own resources to share?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        We love community contributions! Please contact us in our Discord server which you can join on our Contact page 
                        with details about your resource. We'll review it and potentially add it to our collection, 
                        giving you full credit as the creator.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-6">
                      <AccordionTrigger className="text-left font-medium">
                        Is the YouTube Downloader legal to use?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Our YouTube Downloader is provided for educational purposes and personal use. 
                        It is your responsibility to ensure you have the right to download and use any content. 
                        Always respect copyright laws and YouTube's Terms of Service.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-7">
                      <AccordionTrigger className="text-left font-medium">
                        How often are new resources added?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        We add new resources regularly, but it depends on the community. 
                        If you want to contribute please join our Discord server!
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-8">
                      <AccordionTrigger className="text-left font-medium">
                        Who is behind Renderdragon?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Renderdragon was created by Team Wheels, a group of content creators 
                        and developers who wanted to make content creation more accessible to everyone. 
                        You can learn more about our team on the Contact page.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-8">
                      <AccordionTrigger className="text-left font-medium">
                        I got a copyright claim on my video, what should I do?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        We understand that copyright claims can be frustrating especially when our mission has been to provide copyright-free assets. Now, copyright laws change from day to day and we try to keep our resources up to date. Please create a ticket in our Discord server and we will remove the resource from our collection as soon as possible.
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
                      except for standard web server logs, which may include:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>IP addresses</li>
                      <li>Browser type and version</li>
                      <li>Pages visited</li>
                      <li>Time and date of visits</li>
                    </ul>
                    
                    <h3 className="text-lg font-medium text-foreground">2. How We Use Information</h3>
                    <p>
                      The information collected is used solely for the purpose of improving the Website and understanding user behavior. 
                      We do not sell, rent, or share any information with third parties except as required by law.
                    </p>
                    
                    <h3 className="text-lg font-medium text-foreground">3. Cookies</h3>
                    <p>
                      Renderdragon uses cookies to enhance your browsing experience. Cookies are small files stored on your 
                      device that help us provide a better user experience. You can choose to disable cookies in your browser settings, 
                      but this may affect the functionality of the Website.
                    </p>
                    
                    <h3 className="text-lg font-medium text-foreground">4. Third-Party Services</h3>
                    <p>
                      We may use third-party services such as Google Analytics to help understand user behavior on our Website. 
                      These services may collect information sent by your browser as part of a web page request, such as cookies or your IP address.
                    </p>
                    
                    <h3 className="text-lg font-medium text-foreground">5. External Links</h3>
                    <p>
                      Renderdragon may contain links to external websites. We are not responsible for the privacy practices 
                      or content of these external sites. We encourage users to read the privacy policies of any external websites they visit.
                    </p>
                    
                    <h3 className="text-lg font-medium text-foreground">6. Data Security</h3>
                    <p>
                      We take reasonable measures to protect the information collected against unauthorized access, alteration, disclosure, or destruction. 
                      However, no method of transmission over the Internet or electronic storage is 100% secure.
                    </p>
                    
                    <h3 className="text-lg font-medium text-foreground">7. Children's Privacy</h3>
                    <p>
                      Renderdragon is not directed at children under the age of 13. We do not knowingly collect personal information 
                      from children under 13. If you believe we have collected personal information from a child under 13, 
                      please contact us to have it removed.
                    </p>
                    
                    <h3 className="text-lg font-medium text-foreground">8. Changes to Privacy Policy</h3>
                    <p>
                      We may update this Privacy Policy from time to time. Any changes will be posted on this page, 
                      and the effective date will be updated accordingly.
                    </p>
                    
                    <h3 className="text-lg font-medium text-foreground">9. Contact Information</h3>
                    <p>
                      If you have any questions about this Privacy Policy, please contact us through the Contact page.
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