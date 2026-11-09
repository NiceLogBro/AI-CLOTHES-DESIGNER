"use client";

import React, { useState, useRef, useCallback } from "react";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  compact?: boolean;
  label?: string;
  supportText?: string;
}

export default function UploadZone({
  onFileSelect,
  compact = false,
  label = "Drop your outfit photo here or click to browse",
  supportText = "AI will identify the garment, fabric, measurements, and design",
}: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const simulateUpload = useCallback(
    (file: File) => {
      setUploading(true);
      setProgress(0);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      let current = 0;
      const interval = setInterval(() => {
        current += Math.random() * 25 + 5;
        if (current >= 100) {
          current = 100;
          clearInterval(interval);
          setUploading(false);
          setProgress(100);
          onFileSelect(file);
        }
        setProgress(Math.min(current, 100));
      }, 200);
    },
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) {
        simulateUpload(file);
      }
    },
    [simulateUpload]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        simulateUpload(file);
      }
    },
    [simulateUpload]
  );

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  if (preview && progress >= 100 && !uploading) {
    return (
      <div className="relative group">
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="relative aspect-video flex items-center justify-center bg-black/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Uploaded preview"
              className="max-h-72 object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Upload complete
            </div>
            <button
              onClick={() => {
                setPreview(null);
                setProgress(0);
              }}
              className="text-sm text-purple-300 hover:text-white transition-colors"
            >
              Replace image
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Animated gradient border */}
      <div
        className={`absolute -inset-[2px] rounded-2xl transition-opacity duration-500 ${
          isDragging ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
        style={{
          background:
            "conic-gradient(from var(--border-angle, 0deg), #7C3AED, #EC4899, #F59E0B, #7C3AED)",
          animation: "borderRotate 3s linear infinite",
        }}
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleClick();
        }}
        aria-label={label}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-500 ${
          compact ? "p-6" : "p-12"
        } ${
          isDragging
            ? "border-purple-400 bg-purple-500/10 scale-[1.02]"
            : "border-white/20 bg-white/5 hover:border-purple-500/50 hover:bg-white/[0.07]"
        }`}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-4">
            {/* Magical loading spinner */}
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-white/10" />
              <div
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 border-r-pink-500"
                style={{ animation: "spin 1s linear infinite" }}
              />
              <div
                className="absolute inset-2 rounded-full border-2 border-transparent border-b-amber-400 border-l-purple-400"
                style={{ animation: "spin 1.5s linear infinite reverse" }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-purple-300">
                {Math.round(progress)}%
              </div>
            </div>
            {/* Progress bar */}
            <div className="w-full max-w-xs h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-purple-300">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Upload icon */}
            <div
              className={`flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-white/10 ${
                compact ? "w-12 h-12" : "w-20 h-20"
              }`}
            >
              <svg
                className={`text-purple-400 ${compact ? "w-6 h-6" : "w-10 h-10"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </div>
            <div>
              <p
                className={`font-semibold text-white/90 ${compact ? "text-sm" : "text-lg"}`}
              >
                {label}
              </p>
              {supportText && !compact && (
                <p className="text-sm text-purple-300/70 mt-1">{supportText}</p>
              )}
            </div>
            <p className="text-xs text-white/30">
              Supports JPG, PNG, WEBP • Max 10MB
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
