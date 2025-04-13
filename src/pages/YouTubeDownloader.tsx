import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Download, AlertCircle, Check, RefreshCcw, Youtube, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface DownloadOption {
    id: string;
    label: string;
    format: string;
    quality: string;
    size?: string; // Size might not always be available from the API
}

interface VideoInfo {
    title: string;
    thumbnail: string;
    duration: string;
    author: string;
    options: DownloadOption[];
}

const YouTubeDownloader = () => {
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [selectedOptionId, setSelectedOptionId] = useState<string>('');
    const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
    const [isLoadingInfo, setIsLoadingInfo] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [urlError, setUrlError] = useState(false);
    const [downloadType, setDownloadType] = useState<'video' | 'audio'>('video');
    const [filteredOptions, setFilteredOptions] = useState<DownloadOption[]>([]);

    useEffect(() => {
        document.title = 'YouTube Downloader - Renderdragon';
    }, []);

    useEffect(() => {
        if (videoInfo) {
            setFilteredOptions(
                videoInfo.options.filter(option =>
                    downloadType === 'video'
                        ? option.format.includes('mp4') || option.format.includes('webm') // Include common video formats
                        : option.format.includes('mp3') || option.format.includes('aac') // Include common audio formats
                )
            );
            setSelectedOptionId(''); // Reset selected option when download type changes
        }
    }, [videoInfo, downloadType]);

    const isValidYoutubeUrl = (url: string) => {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
        return youtubeRegex.test(url);
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setYoutubeUrl(url);
        setUrlError(url.length > 0 && !isValidYoutubeUrl(url));
        setVideoInfo(null); // Clear previous info on URL change
    };

    const handleDownloadTypeChange = (value: 'video' | 'audio') => {
        setDownloadType(value);
    };

    const handleFetchInfo = async () => {
        if (!youtubeUrl) {
            toast.error("Please enter a YouTube URL");
            return;
        }

        if (!isValidYoutubeUrl(youtubeUrl)) {
            setUrlError(true);
            toast.error("Invalid YouTube URL");
            return;
        }

        setIsLoadingInfo(true);
        setVideoInfo(null);
        setSelectedOptionId('');
        setUrlError(false);

        try {
            const response = await fetch(`/api/info?url=${youtubeUrl}`); // Replace with your actual API endpoint
            if (!response.ok) {
                const errorData = await response.json();
                toast.error(`Failed to fetch info: ${errorData.error || response.statusText}`);
                console.error("Error fetching video info:", errorData);
                return;
            }
            const data: VideoInfo = await response.json();
            setVideoInfo(data);
        } catch (error) {
            toast.error("An unexpected error occurred while fetching info.");
            console.error("Error fetching video info:", error);
        } finally {
            setIsLoadingInfo(false);
        }
    };

    const handleDownload = async () => {
        if (!videoInfo || !selectedOptionId) {
            toast.error("Please select a format first");
            return;
        }

        const selectedOption = videoInfo.options.find(opt => opt.id === selectedOptionId);
        if (!selectedOption) {
            toast.error("Selected format not found.");
            return;
        }

        setIsDownloading(true);
        toast.info("Preparing download...", { duration: 2000 });

        try {
            const response = await fetch(`/api/download?url=${youtubeUrl}&format=${selectedOption.format}&quality=${selectedOption.quality}`); // Replace with your actual API endpoint
            if (!response.ok) {
                const errorData = await response.json();
                toast.error(`Download failed: ${errorData.error || response.statusText}`);
                console.error("Download error:", errorData);
                return;
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${videoInfo.title}.${selectedOption.format}`; // Suggest a filename
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            toast.success("Download started!", { description: `Downloading ${selectedOption.label}` });
        } catch (error) {
            toast.error("An unexpected error occurred during download.");
            console.error("Download error:", error);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow pt-24 pb-16 cow-grid-bg">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-vt323 mb-8 text-center">
                            <span className="text-cow-purple">YouTube</span> Downloader
                        </h1>

                        <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
                            Download YouTube videos for content creation purposes. Always respect copyright laws
                            and only download videos you have permission to use.
                        </p>

                        <Alert className="mb-8 pixel-corners">
                            <Info className="h-4 w-4" />
                            <AlertTitle>Important Notice</AlertTitle>
                            <AlertDescription>
                                This tool is for educational purposes only. You are responsible for
                                ensuring you have the right to download and use any content.
                            </AlertDescription>
                        </Alert>

                        <div className="pixel-card mb-8">
                            <div className="flex flex-col md:flex-row gap-4">
                                <Input
                                    placeholder="Paste YouTube URL here"
                                    value={youtubeUrl}
                                    onChange={handleUrlChange}
                                    className={`pixel-corners flex-grow ${urlError ? 'border-red-500' : ''}`}
                                />

                                <Button
                                    onClick={handleFetchInfo}
                                    disabled={isLoadingInfo}
                                    className="pixel-btn-primary flex items-center justify-center"
                                >
                                    {isLoadingInfo ? (
                                        <>
                                            <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Youtube className="h-4 w-4 mr-2" />
                                            <span>Fetch Video Info</span>
                                        </>
                                    )}
                                </Button>
                            </div>

                            {urlError && (
                                <p className="text-red-500 text-xs mt-2 flex items-center">
                                    <AlertCircle className="h-3 w-3 mr-1" />
                                    Please enter a valid YouTube URL
                                </p>
                            )}
                        </div>

                        {isLoadingInfo && (
                            <div className="text-center py-12 animate-pulse">
                                <RefreshCcw className="h-12 w-12 mx-auto mb-4 animate-spin text-cow-purple" />
                                <p className="text-lg">Fetching video information...</p>
                            </div>
                        )}

                        {videoInfo && (
                            <div className="pixel-card space-y-6">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="w-full md:w-2/5">
                                        <div className="rounded-md overflow-hidden">
                                            <img
                                                src={videoInfo.thumbnail}
                                                alt={videoInfo.title}
                                                className="w-full h-auto"
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full md:w-3/5">
                                        <h2 className="text-xl font-vt323 mb-2">
                                            {videoInfo.title}
                                        </h2>

                                        <div className="flex flex-wrap gap-3 mb-4">
                                            <div className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs flex items-center">
                                                <span className="mr-1">Duration:</span> {videoInfo.duration}
                                            </div>

                                            <div className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs flex items-center">
                                                <span className="mr-1">Channel:</span> {videoInfo.author}
                                            </div>
                                        </div>

                                        <RadioGroup
                                            value={downloadType}
                                            onValueChange={(value) => handleDownloadTypeChange(value as 'video' | 'audio')}
                                            className="flex gap-4 mb-4"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="video" id="video" />
                                                <Label htmlFor="video">Video</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="audio" id="audio" />
                                                <Label htmlFor="audio">Audio only</Label>
                                            </div>
                                        </RadioGroup>

                                        <Select value={selectedOptionId} onValueChange={setSelectedOptionId}>
                                            <SelectTrigger className="pixel-corners">
                                                <SelectValue placeholder="Select format & quality" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {filteredOptions.map(option => (
                                                    <SelectItem key={option.id} value={option.id}>
                                                        {option.label} {option.size && `(${option.size})`}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleDownload}
                                    disabled={!selectedOptionId || isDownloading}
                                    className="w-full pixel-btn-primary flex items-center justify-center"
                                >
                                    {isDownloading ? (
                                        <>
                                            <RefreshCcw className="h-5 w-5 mr-2 animate-spin" />
                                            <span>Downloading...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Download className="h-5 w-5 mr-2" />
                                            <span>Download {downloadType === 'video' ? 'Video' : 'Audio'}</span>
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}

                        <div className="mt-12 space-y-6">
                            <h2 className="text-2xl font-vt323 text-center mb-6">How to Use Properly</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="pixel-card">
                                    <div className="flex items-center justify-center h-12 w-12 bg-cow-purple/20 rounded-full mx-auto mb-4">
                                        <span className="font-vt323 text-xl">1</span>
                                    </div>
                                    <h3 className="text-lg font-vt323 text-center mb-2">Paste URL</h3>
                                    <p className="text-sm text-muted-foreground text-center">
                                        Copy the YouTube video URL and paste it in the input field above.
                                    </p>
                                </div>

                                <div className="pixel-card">
                                    <div className="flex items-center justify-center h-12 w-12 bg-cow-purple/20 rounded-full mx-auto mb-4">
                                        <span className="font-vt323 text-xl">2</span>
                                    </div>
                                    <h3 className="text-lg font-vt323 text-center mb-2">Select Format</h3>
                                    <p className="text-sm text-muted-foreground text-center">
                                        Choose between video or audio-only, then select your preferred quality.
                                    </p>
                                </div>

                                <div className="pixel-card">
                                    <div className="flex items-center justify-center h-12 w-12 bg-cow-purple/20 rounded-full mx-auto mb-4">
                                        <span className="font-vt323 text-xl">3</span>
                                    </div>
                                    <h3 className="text-lg font-vt323 text-center mb-2">Download</h3>
                                    <p className="text-sm text-muted-foreground text-center">
                                        Click the download button and wait for the file to be processed.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default YouTubeDownloader;