import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DonateButton from "@/components/DonateButton";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import confetti from "canvas-confetti";
import GuideCardSkeleton from "@/components/skeletons/GuideCardSkeleton";

interface Guide {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  markdownUrl: string;
}

const guidesData: Guide[] = [
  {
    id: 1,
    title: "Advanced Scriptwriting Guide",
    description:
      "Learn how to write ideal scripts including hooks, retains, informs, satisfies, and finally persuades the audience towards an action.",
    category: "scriptwriting",
    difficulty: "advanced",
    markdownUrl: "/guides/scriptwriting.md",
  },
  {
    id: 2,
    title: "How to use AI in Content creation",
    description:
      "Learn how to use AI tools to enhance your content creation process for free.",
    category: "artificial intelligence",
    difficulty: "intermediate",
    markdownUrl: "/guides/AI.md",
  },
  {
    id: 3,
    title: "Good question, bad question",
    description:
      "Learn how to properly ask for help and get people to notice you.",
    category: "communication",
    difficulty: "beginner",
    markdownUrl: "/guides/questions.md",
  },
  {
    id: 4,
    title: "Copyright, what's that?",
    description:
      "Learn how copyright works and how it affects your content creation process.",
    category: "copyright",
    difficulty: "intermediate",
    markdownUrl: "/guides/copyright.md",
  },
  {
    id: 5,
    title: "Things you should ask yourself when Creating Content",
    description:
      "Learn how to ask yourself the right questions to improve your content creation process.",
    category: "content creation",
    difficulty: "beginner",
    markdownUrl: "/guides/thingstoask.md",
  },
  {
    id: 6,
    title: "How to find your voice",
    description: "Learn how to find your voice and style in content creation.",
    category: "content creation",
    difficulty: "intermediate",
    markdownUrl: "/guides/voice.md",
  },
];

const GuidesPage = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setGuides(guidesData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenGuide = async (guide: Guide) => {
    try {
      const response = await fetch(guide.markdownUrl);
      const content = await response.text();
      setMarkdownContent(content);
      setSelectedGuide(guide);
    } catch (error) {
      console.error("Error loading markdown:", error);
    }
  };

  const handleCloseGuide = () => {
    setSelectedGuide(null);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/10 text-green-500";
      case "intermediate":
        return "bg-yellow-500/10 text-yellow-500";
      case "advanced":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "🟢";
      case "intermediate":
        return "🟡";
      case "advanced":
        return "🔴";
      default:
        return "⚪";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Guides - Renderdragon</title>
        <meta
          name="description"
          content="Access comprehensive guides and tutorials for Minecraft content creation, including scriptwriting, editing, and AI tools."
        />
        <meta property="og:title" content="Guides - Renderdragon" />
        <meta
          property="og:description"
          content="Access comprehensive guides and tutorials for Minecraft content creation, including scriptwriting, editing, and AI tools."
        />
        <meta
          property="og:image"
          content="https://renderdragon.org/ogimg/guides.png"
        />
        <meta property="og:url" content="https://renderdragon.org/guides" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Guides - Renderdragon" />
        <meta
          name="twitter:image"
          content="https://renderdragon.org/ogimg/guides.png"
        />
      </Helmet>

      <Navbar />

      <main className="flex-grow pt-24 pb-16 cow-grid-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-vt323 mb-8 text-center">
              <span className="text-cow-purple">Minecraft</span> Guides
            </h1>

            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
              Step-by-step tutorials to help you level up your Minecraft content
              creation skills. From beginner basics to advanced techniques,
              we've got you covered.
            </p>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <GuideCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide) => (
                  <Card
                    key={guide.id}
                    className="pixel-corners border border-border hover:border-primary transition-all cursor-pointer hover:shadow-lg hover:shadow-cow-purple/10"
                    onClick={() => handleOpenGuide(guide)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20">
                          {guide.category}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(guide.difficulty)} border border-current/20`}
                        >
                          {getDifficultyIcon(guide.difficulty)}{" "}
                          {guide.difficulty}
                        </span>
                      </div>
                      <CardTitle className="font-vt323 text-xl line-clamp-2">
                        {guide.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed line-clamp-3">
                        {guide.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center text-cow-purple text-sm font-medium group">
                        <BookOpen className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        <span className="group-hover:underline">
                          Open Guide
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Dialog
        open={!!selectedGuide}
        onOpenChange={(open) => !open && handleCloseGuide()}
      >
        <DialogContent className="max-w-4xl h-[85vh] max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader className="pb-4 border-b border-border/50">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-2xl font-vt323 text-cow-purple">
                {selectedGuide?.title}
              </DialogTitle>
              <button
                onClick={handleCloseGuide}
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-accent"
                aria-label="Close guide"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {selectedGuide && (
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-1 rounded-md text-xs bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  {selectedGuide.category}
                </span>
                <span
                  className={`px-2 py-1 rounded-md text-xs ${getDifficultyColor(selectedGuide.difficulty)} border border-current/20`}
                >
                  {getDifficultyIcon(selectedGuide.difficulty)}{" "}
                  {selectedGuide.difficulty}
                </span>
              </div>
            )}
          </DialogHeader>

          <div className="flex-1 overflow-y-auto py-6 px-2">
            <div className="prose prose-invert prose-lg max-w-none prose-headings:text-cow-purple prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-p:text-base prose-p:leading-relaxed prose-p:mb-4 prose-li:mb-2 prose-ul:mb-4 prose-ol:mb-4 prose-code:bg-accent/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-accent/30 prose-pre:border prose-pre:border-border/50 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto prose-blockquote:border-l-cow-purple prose-blockquote:bg-accent/20 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:my-4 prose-hr:border-border/50 prose-a:text-cow-purple prose-a:no-underline hover:prose-a:underline prose-table:border-border prose-th:border-border prose-td:border-border prose-th:bg-accent/30 prose-td:bg-accent/10">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl font-bold text-cow-purple mb-6 mt-8 first:mt-0 border-b border-border/50 pb-2">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-semibold text-cow-purple mb-4 mt-6 first:mt-0">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-medium text-cow-purple mb-3 mt-5 first:mt-0">
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-base font-medium text-cow-purple mb-2 mt-4 first:mt-0">
                      {children}
                    </h4>
                  ),
                  p: ({ children }) => (
                    <p className="text-base leading-relaxed mb-4 text-foreground/90">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-4 space-y-3 pl-6 list-disc">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-4 space-y-3 pl-6 list-decimal">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-base leading-relaxed text-foreground/90">
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-cow-purple bg-accent/20 pl-4 py-2 my-4 italic text-foreground/80">
                      {children}
                    </blockquote>
                  ),
                  code: ({ inline, children }) => {
                    if (inline) {
                      return (
                        <code className="bg-accent/50 px-1.5 py-0.5 rounded text-sm font-mono">
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code className="block bg-accent/30 border border-border/50 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => (
                    <pre className="bg-accent/30 border border-border/50 rounded-lg p-4 overflow-x-auto my-4">
                      {children}
                    </pre>
                  ),
                  hr: () => <hr className="border-border/50 my-8" />,
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cow-purple hover:underline transition-colors"
                    >
                      {children}
                    </a>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-foreground">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-foreground/90">{children}</em>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-4">
                      <table className="min-w-full border border-border">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border border-border bg-accent/30 px-4 py-2 text-left font-medium">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-border bg-accent/10 px-4 py-2">
                      {children}
                    </td>
                  ),
                }}
              >
                {markdownContent}
              </ReactMarkdown>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
      <DonateButton />
    </div>
  );
};

export default GuidesPage;
