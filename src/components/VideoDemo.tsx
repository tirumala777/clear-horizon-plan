
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface VideoDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoDemo = ({ isOpen, onClose }: VideoDemoProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-black/95 border-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-white">
            How to Use Our Financial Platform
          </DialogTitle>
        </DialogHeader>
        
        <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
          {/* Placeholder for video - replace with actual video URL */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/50 to-purple-900/50">
            <div className="text-center text-white">
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                <div className="w-0 h-0 border-l-8 border-r-0 border-t-6 border-b-6 border-l-white border-t-transparent border-b-transparent ml-1"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Demo Video Coming Soon</h3>
              <p className="text-gray-300">
                Learn how to navigate our platform, set up your portfolio, and maximize your financial growth.
              </p>
            </div>
          </div>
          
          {/* Uncomment and replace with actual video URL when ready */}
          {/*
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="Financial Platform Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
          */}
        </div>
        
        <div className="p-6 pt-4">
          <p className="text-gray-300 text-sm text-center">
            This demo will show you how to get started with budgeting, investment tracking, and AI-powered financial insights.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoDemo;
