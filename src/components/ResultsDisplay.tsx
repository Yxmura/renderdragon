import React from 'react';
import { motion } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle, XCircle, Clock, Database, TrendingUp, RefreshCw } from "lucide-react";
import { Button } from './ui/button';
import { CopyrightResult } from '@/types/copyright';

interface ResultsDisplayProps {
  result: CopyrightResult;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, onReset }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe':
        return 'text-green-800 bg-green-100 border-green-300';
      case 'no monetization':
        return 'text-yellow-800 bg-yellow-100 border-yellow-300';
      case 'unsafe':
        return 'text-red-800 bg-red-100 border-red-300';
      default:
        return 'text-gray-800 bg-gray-100 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe':
        return <CheckCircle className="w-6 h-6" />;
      case 'no monetization':
        return <AlertTriangle className="w-6 h-6" />;
      case 'unsafe':
        return <XCircle className="w-6 h-6" />;
      default:
        return <AlertTriangle className="w-6 h-6" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Very Low':
        return 'text-green-700';
      case 'Low':
        return 'text-blue-700';
      case 'Medium':
        return 'text-yellow-700';
      case 'Medium-High':
        return 'text-orange-700';
      case 'High':
        return 'text-red-700';
      case 'Very High':
        return 'text-red-800';
      default:
        return 'text-gray-700';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div 
      className="mt-8 space-y-6 text-gray-900 dark:text-gray-200"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main Result Card */}
      <motion.div 
        className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden transition-all duration-300"
        variants={itemVariants}
      >
        <div className="p-8">
          <div className="flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-6">
            {result.imageUrl && (
              <motion.div 
                className="flex-shrink-0"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <img
                  src={result.imageUrl}
                  alt={`${result.title} by ${result.artist}`}
                  className="w-24 h-24 rounded-lg object-cover shadow-md"
                />
              </motion.div>
            )}
            
            <div className="flex-1">
              <motion.div 
                className="flex items-center space-x-3 mb-4"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div 
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border font-semibold ${getStatusColor(result.status)} transition-colors`}
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    {getStatusIcon(result.status)}
                  </motion.div>
                  <span className="capitalize">{result.status.replace('-', ' ')}</span>
                </motion.div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {result.confidence}% confidence
                </div>
              </motion.div>
              
              <motion.h2 
                className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                "{result.title}" by {result.artist}
              </motion.h2>
              
              <motion.div 
                className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>Risk: <span className={`font-semibold ${getRiskColor(result.riskAssessment)}`}>{result.riskAssessment}</span></span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Processed in {result.processingTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Database className="w-4 h-4" />
                  <span>{result.sourceStats.coverage}% source coverage</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-gray-50 dark:bg-slate-700/30 rounded-lg p-4 border border-gray-200 dark:border-slate-600"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Recommended Action</h3>
                <p className="text-gray-700 dark:text-gray-300">{result.recommendedAction}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Platform Recommendations */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={itemVariants}
      >
        <motion.div 
          className="bg-white dark:bg-slate-800/50 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-6 transition-all duration-300"
        >
          <div className="flex items-center space-x-3 mb-4">
            <motion.div 
              className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center border border-red-200"
            >
              <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </motion.div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">YouTube</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{result.platforms.youtube}</p>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-slate-800/50 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-6 transition-all duration-300"
        >
          <div className="flex items-center space-x-3 mb-4">
            <motion.div 
              className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center border border-purple-200"
            >
              <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.571 4.714h.858c1.428 0 2.286.857 2.286 2.286v9.714c0 1.429-.858 2.286-2.286 2.286h-.858c-1.428 0-2.285-.857-2.285-2.286V7c0-1.429.857-2.286 2.285-2.286zM4.714 8.571H5.57c1.429 0 2.286.858 2.286 2.286v2.286c0 1.428-.857 2.286-2.286 2.286h-.856c-1.428 0-2.286-.858-2.286-2.286v-2.286c0-1.428.858-2.286 2.286-2.286zM18.286 8.571h.857c1.428 0 2.286.858 2.286 2.286v2.286c0 1.428-.858 2.286-2.286 2.286h-.857c-1.429 0-2.286-.858-2.286-2.286v-2.286c0-1.428.857-2.286 2.286-2.286z"/>
              </svg>
            </motion.div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Twitch</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{result.platforms.twitch}</p>
        </motion.div>
      </motion.div>

      {/* Source Analysis */}
      <motion.div 
        className="bg-white dark:bg-slate-800/50 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-6 transition-all duration-300"
        variants={itemVariants}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Source Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Commercial Databases</h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium text-gray-800 dark:text-gray-200">Content ID:</span> {result.sources.contentId}</p>
              <p><span className="font-medium text-gray-800 dark:text-gray-200">PRO Registration:</span> {result.sources.pro}</p>
              <p><span className="font-medium text-gray-800 dark:text-gray-200">DRM Status:</span> {result.sources.drm}</p>
              <p><span className="font-medium text-gray-800 dark:text-gray-200">Commercial DBs:</span> {result.sources.commercialDatabases}</p>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Open Sources</h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium text-gray-800 dark:text-gray-200">Public Domain:</span> {result.sources.publicDomain}</p>
              <p><span className="font-medium text-gray-800 dark:text-gray-200">Royalty Free:</span> {result.sources.royaltyFree}</p>
              <p><span className="font-medium text-gray-800 dark:text-gray-200">Open Sources:</span> {result.sources.openSources}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* YouTube Analysis & Processing Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={itemVariants}
      >
        {result.youtubeAnalysis && (
          <motion.div 
            className="bg-white dark:bg-slate-800/50 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-6 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">YouTube Analysis</h3>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Videos:</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{result.youtubeAnalysis.totalVideos}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Official Content:</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{result.youtubeAnalysis.officialContent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">User Generated:</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{result.youtubeAnalysis.userGeneratedContent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">User Content Ratio:</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{result.youtubeAnalysis.userContentRatio}%</span>
              </div>
              <div className="mt-3 p-3 bg-gray-50 dark:bg-slate-700/30 rounded-lg border border-gray-200 dark:border-slate-600">
                <p className="text-gray-600 dark:text-gray-400 text-xs">{result.youtubeAnalysis.assessment}</p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div 
          className="bg-white dark:bg-slate-800/50 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-6 transition-all duration-300"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Processing Stats</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Sources Checked:</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{result.sourceStats.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Successful Queries:</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{result.sourceStats.successful}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Coverage:</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{result.sourceStats.coverage}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Processing Time:</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{result.processingTime}</span>
            </div>
          </div>

          {result.riskFactors && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Risk Breakdown</h4>
              <div className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Commercial:</span>
                  <span>{result.riskFactors.commercial}/100</span>
                </div>
                <div className="flex justify-between">
                  <span>Popularity:</span>
                  <span>{result.riskFactors.popularity}/100</span>
                </div>
                <div className="flex justify-between">
                  <span>Official:</span>
                  <span>{result.riskFactors.official}/100</span>
                </div>
                <div className="flex justify-between font-medium text-gray-900 dark:text-white">
                  <span>Total Score:</span>
                  <span>{result.totalRiskScore}/100</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>

      <motion.div className="mt-6 text-center" variants={itemVariants}>
        <Button
          onClick={onReset}
          variant="outline"
          size="lg"
          className="border-2 border-blue-400 text-white hover:text-white hover:bg-blue-400/20 backdrop-blur-md bg-white/10"
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          Scan Another Track
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ResultsDisplay;
