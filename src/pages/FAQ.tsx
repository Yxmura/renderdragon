
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const [activeTab, setActiveTab] = useState('faq');
  
  useEffect(() => {
    document.title = 'FAQ - Creator On Wheels';
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
                        Is everything on Creator On Wheels really free?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Yes! All resources, tools, and guides on Creator On Wheels are 100% free to use. 
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
                        from Creator On Wheels. Everything is freely available without registration.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left font-medium">
                        Can I use these resources in my commercial content?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Yes, you can use our resources in your monetized content (YouTube videos, Twitch streams, etc.). 
                        Just be sure to check if the specific resource requires attribution to the original creator. 
                        This information will be clearly displayed on each resource's page.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-left font-medium">
                        How accurate is the Music Copyright Checker?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Our Music Copyright Checker provides general guidance based on known information 
                        about songs, but copyright policies can change frequently. While we strive to provide 
                        accurate information, we recommend double-checking with the official sources 
                        or using YouTube's Content ID system before publishing.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-left font-medium">
                        How can I submit my own resources to share?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        We love community contributions! Please contact us through our Contact page 
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
                        We add new resources regularly, typically several times per month. 
                        Follow our social media channels to stay updated on new additions.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-8">
                      <AccordionTrigger className="text-left font-medium">
                        Who is behind Creator On Wheels?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Creator On Wheels was created by Team Wheels, a group of content creators 
                        and developers who wanted to make content creation more accessible to everyone. 
                        You can learn more about our team on the Contact page.
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
                      By accessing and using Creator On Wheels ("the Website"), you accept and agree to be bound by these 
                      Terms of Service. If you do not agree to these terms, please do not use the Website.
                    </p>
                    
                    <h3 className="text-lg font-medium text-foreground">2. Use of Resources</h3>
                    <p>
                      All resources provided on Creator On Wheels are available for free for both personal and commercial use, 
                      unless otherwise stated on the specific resource. Some resources may require attribution to the original creator, 
                      which will be clearly indicated on the resource page.
                    </p>
                    
                    <h3 className="text-lg font-medium text-foreground">3. Limitation of Liability</h3>
                    <p>
                      The resources and tools provided on Creator On Wheels are provided "as is" without any warranties, 
                      expressed or implied. In no event shall Creator On Wheels be liable for any damages including, but not limited to, 
                      direct, indirect, special, incidental or consequential damages or other losses arising out of the use of or 
                      inability to use our resources or tools.
                    </p>
                    
                    <h3 className="text-lg font-medium text-foreground">4. Copyright and Intellectual Property</h3>
                    <p>
                      The content on Creator On Wheels, including text, graphics, logos, and software, is the property of 
                      Creator On Wheels or its content suppliers and is protected by copyright laws. Users are granted a limited 
                      license to download or print content from the Website for personal and commercial use.
                    </p>
                    
                    <h3 className="text-lg font-medium text-foreground">5. User Conduct</h3>
                    <p>
                      Users of Creator On Wheels agree not to:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Use the Website for any unlawful purpose</li>
                      <li>Attempt to gain unauthorized access to any part of the Website</li>
                      <li>Resell or redistribute resources from the Website as their own</li>
                      <li>Claim ownership of resources provided on the Website</li>
                    </ul>
                    
                    <h3 className="text-lg font-medium text-foreground">6. Changes to Terms</h3>
                    <p>
                      Creator On Wheels reserves the right to modify these Terms of Service at any time. 
                      Changes will be effective immediately upon posting on the Website. Your continued use of the 
                      Website after any changes indicates your acceptance of the modified terms.
                    </p>
                    
                    <h3 className="text-lg font-medium text-foreground">7. Contact Information</h3>
                    <p>
                      If you have any questions about these Terms of Service, please contact us through the Contact page.
                    </p>
                    
                    <p className="text-sm">
                      Last updated: November 2023
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
                      Creator On Wheels is committed to protecting your privacy. We do not collect personal information 
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
                      Creator On Wheels uses cookies to enhance your browsing experience. Cookies are small files stored on your 
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
                      Creator On Wheels may contain links to external websites. We are not responsible for the privacy practices 
                      or content of these external sites. We encourage users to read the privacy policies of any external websites they visit.
                    </p>
                    
                    <h3 className="text-lg font-medium text-foreground">6. Data Security</h3>
                    <p>
                      We take reasonable measures to protect the information collected against unauthorized access, alteration, disclosure, or destruction. 
                      However, no method of transmission over the Internet or electronic storage is 100% secure.
                    </p>
                    
                    <h3 className="text-lg font-medium text-foreground">7. Children's Privacy</h3>
                    <p>
                      Creator On Wheels is not directed at children under the age of 13. We do not knowingly collect personal information 
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
                      Last updated: November 2023
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
