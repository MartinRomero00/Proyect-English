/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Heart,
  MessageCircle,
  Share,
  BarChart,
  Clock,
  Users,
  Smartphone,
  Brain,
} from "lucide-react";

// Sound system for presentation effects
const createSound = (frequency, duration = 100) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  oscillator.type = "sine";

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + duration / 1000
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration / 1000);
};

const playNotificationSound = () => createSound(800, 150);
const playLikeSound = () => createSound(1200, 100);

// Enhanced swipe sound system that alternates between different tones
const swipeSounds = [
  () => createSound(600, 80), // Original
  () => createSound(750, 90), // Higher pitch
  () => createSound(450, 100), // Lower pitch
  () => createSound(900, 70), // Sharp
  () => createSound(550, 85), // Mellow
];

let currentSoundIndex = 0;
const playSwipeSound = () => {
  const sound = swipeSounds[currentSoundIndex];
  sound();
  currentSoundIndex = (currentSoundIndex + 1) % swipeSounds.length;
};

// Slide data with viral memes and content
const slides = [
  {
    id: 1,
    title: "📱 Social Media Addiction",
    subtitle: "A Modern Love Story",
    type: "title",
    content:
      "Welcome to the digital rabbit hole where your thumb gets more exercise than your brain!",
  },
  {
    id: 2,
    title: "The Stats Don't Lie",
    type: "stats",
    content:
      "Let's talk numbers that'll make you want to throw your phone... but you won't.",
    stats: [
      {
        icon: Clock,
        value: "2.5 hours",
        label: "Average daily usage",
        emoji: "⏰",
      },
      { icon: Users, value: "4.8 billion", label: "Global users", emoji: "🌍" },
      {
        icon: Smartphone,
        value: "96",
        label: "Times checked per day",
        emoji: "📱",
      },
      {
        icon: Brain,
        value: "8 seconds",
        label: "Attention span (vs goldfish: 9s)",
        emoji: "🐠",
      },
    ],
  },
  {
    id: 3,
    title: "Morning Ritual: This is Fine",
    type: "viral-meme",
    content: "Every morning be like...",
    viralMeme: {
      title: "📱 Drake Pointing Meme 📱",
      actualMemeText:
        "The Drake meme shows rapper Drake in two panels: first rejecting something with his hand raised, then pointing approvingly at an alternative option.",
      setup: "Waking up and immediately:",
      option1: {
        text: "Checking the time",
        reaction: "❌ Drake rejecting",
        description: "Nah fam",
      },
      option2: {
        text: "Opening Instagram/TikTok",
        reaction: "✅ Drake approving",
        description: "Yes! This is the way",
      },
    },
  },
  {
    id: 4,
    title: "The Scroll of Infinite Doom",
    type: "interactive",
    content: "Try not to scroll... Go ahead, we dare you!",
    interactiveElements: [
      { type: "like", count: 1337, active: false },
      { type: "comment", count: 420, active: false },
      { type: "share", count: 69, active: false },
    ],
  },
  {
    id: 5,
    title: "Distracted Boyfriend Meme",
    type: "viral-meme",
    content: "The eternal struggle...",
    viralMeme: {
      title: "📱 Distracted Boyfriend Meme 📱",
      actualMemeText:
        "The Distracted Boyfriend meme shows a man walking with his girlfriend while turning to check out another woman walking by. The girlfriend looks upset and disapproving.",
      setup: "You trying to be productive:",
      boyfriend: "Your Brain",
      girlfriend: "Important Work",
      other_woman: "Social Media Notifications",
      description: "Every. Single. Time.",
    },
  },
  {
    id: 6,
    title: "Engagement Metrics",
    type: "chart",
    content: "How social media hooks your brain better than any drug dealer",
    chartData: [
      {
        platform: "TikTok",
        engagement: 95,
        color: "bg-pink-500",
        addiction: "MAXIMUM",
      },
      {
        platform: "Instagram",
        engagement: 87,
        color: "bg-purple-500",
        addiction: "HIGH",
      },
      {
        platform: "Twitter",
        engagement: 72,
        color: "bg-blue-500",
        addiction: "MEDIUM",
      },
      {
        platform: "Facebook",
        engagement: 65,
        color: "bg-blue-600",
        addiction: "DECLINING",
      },
      {
        platform: "LinkedIn",
        engagement: 45,
        color: "bg-indigo-500",
        addiction: "PROFESSIONAL",
      },
    ],
  },
  {
    id: 7,
    title: "Real Life vs Social Media",
    type: "comparison",
    content: "The brutal truth about digital vs reality",
    comparison: {
      left: {
        title: "Real Life You",
        items: [
          "😴 Tired from staying up scrolling",
          "🍕 Eating cereal for dinner again",
          "📱 Can't find phone for 5 seconds = panic",
          "👥 Avoiding eye contact IRL",
          "💸 Broke but buying things from ads",
        ],
      },
      right: {
        title: "Social Media You",
        items: [
          "✨ Living your best life always",
          "🥗 Only eating aesthetic food",
          "📸 Every moment is Instagram-worthy",
          "😎 Confident and witty 24/7",
          "💰 Rich enough to judge others' purchases",
        ],
      },
    },
  },
  {
    id: 8,
    title: "Mocking SpongeBob Meme",
    type: "viral-meme",
    content: "When someone says 'just put your phone down'",
    viralMeme: {
      title: "🧽 Mocking SpongeBob 🧽",
      actualMemeText:
        "The Mocking SpongeBob meme features SpongeBob SquarePants with a contorted face and hands positioned in a mocking gesture, used to sarcastically repeat someone's statement.",
      setup: "Them: 'Social media addiction isn't real'",
      mockingText: "sOcIaL mEdIa AdDiCtIoN iSn'T rEaL",
      response:
        "Meanwhile you've checked your phone 47 times during this presentation",
    },
  },
  {
    id: 9,
    title: "What is FOMO?",
    type: "fomo-explanation",
    content:
      "Fear of Missing Out - The anxiety that something exciting is happening elsewhere",
    fomo: {
      definition:
        "FOMO (Fear of Missing Out) is the anxiety that an exciting or interesting event may currently be happening elsewhere, often aroused by posts seen on social media.",
      symptoms: [
        "📱 Constantly checking social media",
        "😰 Anxiety when phone battery dies",
        "🔄 Compulsive refreshing of feeds",
        "😔 Feeling left out from social events",
        "⚡ Instant response to notifications",
      ],
      stats: {
        percentage: "69%",
        description: "of adults experience FOMO regularly",
      },
    },
  },
  {
    id: 10,
    title: "Signs You're Addicted",
    type: "list",
    content: "Check all that apply (we know you will)",
    listItems: [
      {
        text: "Phone is the first thing you see in the morning",
        checked: false,
        emoji: "🌅",
      },
      {
        text: "You know TikTok dances but not your multiplication tables",
        checked: false,
        emoji: "💃",
      },
      {
        text: "Your thumb has abs from scrolling",
        checked: false,
        emoji: "💪",
      },
      {
        text: "You've missed your stop because of a good meme",
        checked: false,
        emoji: "🚌",
      },
      { text: "'Just 5 more minutes' = 2 hours", checked: false, emoji: "⏰" },
      {
        text: "You take photos of your food before eating",
        checked: false,
        emoji: "📸",
      },
      { text: "FOMO is your middle name", checked: false, emoji: "😰" },
      {
        text: "You know influencers better than your neighbors",
        checked: false,
        emoji: "👥",
      },
    ],
  },
  {
    id: 11,
    title: "Expanding Brain Meme",
    type: "viral-meme",
    content: "The evolution of social media addiction",
    viralMeme: {
      title: "🧠 Galaxy Brain Evolution 🧠",
      actualMemeText:
        "The Galaxy Brain meme shows four panels of a brain getting progressively more enlightened and glowing, representing escalating levels of intelligence or awareness.",
      stages: [
        {
          level: "CASUAL USER",
          text: "Uses social media for specific purposes",
          brain: "🧠",
        },
        {
          level: "FREQUENT USER",
          text: "Checks multiple times throughout the day",
          brain: "🧠✨",
        },
        {
          level: "HEAVY USER",
          text: "Can't go anywhere without phone",
          brain: "🧠💫",
        },
        {
          level: "ADDICTED",
          text: "Life revolves around social media validation",
          brain: "🧠🌌",
        },
      ],
    },
  },
  {
    id: 12,
    title: "Woman Yelling at Cat",
    type: "viral-meme",
    content: "The internal battle is real",
    viralMeme: {
      title: "😾 Woman Yelling at Cat Meme 😾",
      actualMemeText:
        "This meme features a woman pointing and yelling emotionally at a confused-looking white cat sitting at a dinner table. It represents internal conflicts or arguments.",
      woman: {
        title: "Your Rational Brain:",
        text: "You need to stop scrolling and be productive! You have responsibilities! This is unhealthy!",
      },
      cat: {
        title: "Your Addicted Brain:",
        text: "But what if something important happened in the last 30 seconds? 👀",
      },
    },
  },
  {
    id: 13,
    title: "The Solution (Plot Twist)",
    type: "conclusion",
    content: "Breaking free from the digital matrix",
    solutions: [
      {
        title: "Digital Detox",
        description: "Turn off notifications (scary, we know)",
        emoji: "🔕",
      },
      {
        title: "Real Hobbies",
        description: "Remember those? They still exist!",
        emoji: "🎨",
      },
      {
        title: "Human Connection",
        description: "Talk to people IRL (revolutionary concept)",
        emoji: "👥",
      },
      {
        title: "Mindful Usage",
        description: "Use tech as a tool, not a drug",
        emoji: "🧘",
      },
    ],
  },
];

// Individual slide components
const TitleSlide = ({ slide }) => (
  <motion.div
    className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white p-8"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
  >
    <motion.h1
      className="text-6xl md:text-8xl font-bold mb-6 text-center"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {slide.title}
    </motion.h1>
    <motion.h2
      className="text-2xl md:text-4xl font-light mb-8 text-center opacity-90"
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5 }}
    >
      {slide.subtitle}
    </motion.h2>
    <motion.p
      className="text-lg md:text-xl text-center max-w-2xl leading-relaxed mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
    >
      {slide.content}
    </motion.p>

    {/* QR Code Section */}
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
    >
      <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 border-2 border-white/30 max-w-sm mx-auto">
        <h3 className="text-lg font-bold mb-4">Share This Presentation</h3>
        <div className="w-32 h-32 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center border-2 border-white/40 p-2">
          <img
            src="/qr.svg"
            alt="QR Code to access presentation"
            className="w-full h-full"
          />
        </div>
        <p className="text-xs opacity-80">
          Scan to access the full interactive presentation
        </p>
      </div>
    </motion.div>
  </motion.div>
);

const StatsSlide = ({ slide }) => (
  <motion.div
    className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="max-w-6xl mx-auto">
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-center mb-4"
        initial={{ y: -30 }}
        animate={{ y: 0 }}
      >
        {slide.title}
      </motion.h1>
      <motion.p
        className="text-xl text-center mb-16 opacity-90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {slide.content}
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {slide.stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl mb-4">{stat.emoji}</div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm opacity-80">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </motion.div>
);

const FomoSlide = ({ slide }) => (
  <motion.div
    className="min-h-screen bg-gradient-to-br from-red-900 via-pink-900 to-purple-900 text-white p-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="max-w-5xl mx-auto">
      <motion.h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
        {slide.title}
      </motion.h1>
      <motion.p className="text-xl text-center mb-12 opacity-90">
        {slide.content}
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/30"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Definition</h3>
          <p className="text-lg mb-6 leading-relaxed">
            {slide.fomo.definition}
          </p>

          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-red-300">
              {slide.fomo.stats.percentage}
            </div>
            <div className="text-sm opacity-80">
              {slide.fomo.stats.description}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/30"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center">
            Common Symptoms
          </h3>
          <div className="space-y-4">
            {slide.fomo.symptoms.map((symptom, index) => (
              <motion.div
                key={index}
                className="flex items-center text-lg bg-white/10 rounded-xl p-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + 0.1 * index }}
              >
                {symptom}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

const ViralMemeSlide = ({ slide }) => {
  if (slide.viralMeme.title?.includes("Drake")) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
            {slide.title}
          </motion.h1>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Meme Image */}
            <motion.div
              className="flex justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <img
                src="/drake.jpg"
                alt="Drake Pointing Meme"
                className="max-w-full h-auto rounded-2xl shadow-2xl border-4 border-white/30"
                style={{ maxHeight: "500px" }}
              />
            </motion.div>

            {/* Text Content */}
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/30">
              <h2 className="text-2xl font-bold text-center mb-6">
                {slide.viralMeme.title}
              </h2>

              <div className="text-center mb-8">
                <p className="text-xl font-semibold mb-4">
                  {slide.viralMeme.setup}
                </p>
                <p className="text-lg opacity-90">
                  Every morning, your brain makes this exact choice!
                </p>
              </div>

              <div className="bg-yellow-400/20 rounded-xl p-6 border border-yellow-300/30">
                <p className="text-center">
                  <span className="font-bold text-lg">Fun Fact:</span>
                  <br />
                  <span className="text-sm">
                    Studies show that 80% of people check their phone within 15
                    minutes of waking up. Social media has literally rewired our
                    morning routine! 📱⏰
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (slide.viralMeme.title?.includes("Distracted Boyfriend")) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
            {slide.title}
          </motion.h1>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Meme Image */}
            <motion.div
              className="flex justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <img
                src="/novia.jpg"
                alt="Distracted Boyfriend Meme"
                className="max-w-full h-auto rounded-2xl shadow-2xl border-4 border-white/30"
                style={{ maxHeight: "500px" }}
              />
            </motion.div>

            {/* Content */}
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/30">
              <h2 className="text-2xl font-bold text-center mb-6">
                {slide.viralMeme.title}
              </h2>

              <div className="text-center mb-8">
                <p className="text-xl font-semibold mb-4">
                  {slide.viralMeme.setup}
                </p>
                <p className="text-lg opacity-90">
                  The constant battle between productivity and digital
                  distractions!
                </p>
              </div>

              <div className="bg-purple-400/20 rounded-xl p-6 border border-purple-300/30">
                <p className="text-center">
                  <span className="font-bold text-lg">Did You Know?</span>
                  <br />
                  <span className="text-sm">
                    The average person gets distracted by notifications every 11
                    minutes and takes 25 minutes to fully refocus.{" "}
                    {slide.viralMeme.description} 🧠⚡
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (slide.viralMeme.title?.includes("SpongeBob")) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-yellow-400 via-green-500 to-blue-500 text-white p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
            {slide.title}
          </motion.h1>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Meme Image */}
            <motion.div
              className="flex justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <img
                src="/bob.jpg"
                alt="Mocking SpongeBob Meme"
                className="max-w-full h-auto rounded-2xl shadow-2xl border-4 border-white/30"
                style={{ maxHeight: "500px" }}
              />
            </motion.div>

            {/* Content */}
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/30">
              <h2 className="text-2xl font-bold text-center mb-6">
                {slide.viralMeme.title}
              </h2>

              <div className="text-center mb-8">
                <p className="text-xl font-semibold mb-4">
                  When someone denies social media addiction...
                </p>
                <p className="text-lg opacity-90">
                  This meme perfectly captures our response to digital denial!
                </p>
              </div>

              <div className="bg-orange-400/20 rounded-xl p-6 border border-orange-300/30">
                <p className="text-center">
                  <span className="font-bold text-lg">Ironic Fact:</span>
                  <br />
                  <span className="text-sm">
                    People who claim they "aren't addicted" to social media
                    check their phones 150+ times per day.{" "}
                    {slide.viralMeme.response} 🤳�
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (slide.viralMeme.title?.includes("Galaxy Brain")) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
            {slide.title}
          </motion.h1>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Meme Image */}
            <motion.div
              className="flex justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <img
                src="/expanse.jpg"
                alt="Galaxy Brain Expanding Meme"
                className="max-w-full h-auto rounded-2xl shadow-2xl border-4 border-white/30"
                style={{ maxHeight: "500px" }}
              />
            </motion.div>

            {/* Content */}
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/30">
              <h2 className="text-2xl font-bold text-center mb-6">
                {slide.viralMeme.title}
              </h2>

              <div className="text-center mb-8">
                <p className="text-xl font-semibold mb-4">
                  The Progressive Stages of Digital Dependency
                </p>
                <p className="text-lg opacity-90">
                  How we gradually become more dependent on social validation!
                </p>
              </div>

              <div className="bg-indigo-400/20 rounded-xl p-6 border border-indigo-300/30">
                <p className="text-center">
                  <span className="font-bold text-lg">Research Shows:</span>
                  <br />
                  <span className="text-sm">
                    Social media addiction develops in stages, starting with
                    casual use and progressing to compulsive behavior. Each
                    stage normalizes the next level of dependency. The final
                    stage? Your entire self-worth depends on likes and
                    followers! 🧠⚡
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (slide.viralMeme.title?.includes("Woman Yelling at Cat")) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-red-600 via-orange-600 to-yellow-600 text-white p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
            {slide.title}
          </motion.h1>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Meme Image */}
            <motion.div
              className="flex justify-center order-2 lg:order-1"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <img
                src="/cat.jpg"
                alt="Woman Yelling at Cat Meme"
                className="max-w-full h-auto rounded-2xl shadow-2xl border-4 border-white/30"
                style={{ maxHeight: "500px" }}
              />
            </motion.div>

            {/* Content */}
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/30 order-1 lg:order-2">
              <h2 className="text-2xl font-bold text-center mb-6">
                {slide.viralMeme.title}
              </h2>

              <div className="text-center mb-8">
                <p className="text-xl font-semibold mb-4">
                  The Internal Battle is Real
                </p>
                <p className="text-lg opacity-90">
                  Every social media user's daily mental conflict!
                </p>
              </div>

              <div className="bg-purple-400/20 rounded-xl p-6 border border-purple-300/30">
                <p className="text-center">
                  <span className="font-bold text-lg">Psychology Fact:</span>
                  <br />
                  <span className="text-sm">
                    Your brain literally argues with itself about social media
                    use. The prefrontal cortex (logic) vs. the dopamine reward
                    system (addiction). Guess who usually wins? 🧠⚔️📱
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
};

const InteractiveSlide = ({ slide }) => {
  const [elements, setElements] = useState(slide.interactiveElements);

  const handleInteraction = (index, type) => {
    setElements((prev) =>
      prev.map((el, i) =>
        i === index
          ? {
              ...el,
              active: !el.active,
              count: el.count + (el.active ? -1 : 1),
            }
          : el
      )
    );

    if (type === "like") playLikeSound();
    else playNotificationSound();
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 text-white p-8 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-2xl mx-auto w-full">
        <motion.h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
          {slide.title}
        </motion.h1>
        <motion.p className="text-lg md:text-xl text-center mb-8 opacity-90">
          {slide.content}
        </motion.p>

        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 border-2 border-white/30">
          <div className="bg-black rounded-2xl p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mr-3"></div>
                <div>
                  <div className="font-bold text-sm md:text-base">
                    @socialmedia_addict
                  </div>
                  <div className="text-xs opacity-60">2 minutes ago</div>
                </div>
              </div>
            </div>

            <div className="text-sm md:text-lg mb-4 leading-relaxed">
              Just one more scroll... I promise this is the last one 📱✨
              <br />
              <span className="text-blue-400">#AddictedToScrolling</span>{" "}
              <span className="text-pink-400">#SendHelp</span>
            </div>

            <div className="flex justify-center space-x-4">
              {elements.map((element, index) => {
                const icons = {
                  like: Heart,
                  comment: MessageCircle,
                  share: Share,
                };
                const IconComponent = icons[element.type];

                return (
                  <motion.button
                    key={element.type}
                    className={`flex items-center space-x-2 px-3 py-2 md:px-4 md:py-2 rounded-full transition-all ${
                      element.active
                        ? "bg-red-500 text-white"
                        : "bg-gray-700 text-gray-300"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleInteraction(index, element.type)}
                  >
                    <IconComponent size={16} className="md:w-5 md:h-5" />
                    <span className="text-sm md:text-base">
                      {element.count}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-6">
            <div className="text-sm md:text-lg opacity-90">
              Try clicking the buttons above! Can you resist the dopamine hit?
              🧠💫
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ChartSlide = ({ slide }) => (
  <motion.div
    className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white p-4 md:p-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="max-w-6xl mx-auto">
      <motion.h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-center mb-6 md:mb-8">
        {slide.title}
      </motion.h1>
      <motion.p className="text-lg md:text-xl text-center mb-8 md:mb-12 opacity-90 px-2">
        {slide.content}
      </motion.p>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 md:p-8 border border-white/20">
        <h3 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8">
          Platform Addiction Levels
        </h3>

        <div className="space-y-4 md:space-y-6">
          {slide.chartData.map((platform, index) => (
            <motion.div
              key={platform.platform}
              className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="w-full md:w-24 font-bold text-center md:text-left">
                {platform.platform}
              </div>
              <div className="flex-1 md:mx-4">
                <div className="bg-gray-700 rounded-full h-8 md:h-6 overflow-hidden">
                  <motion.div
                    className={`h-full ${platform.color} rounded-full flex items-center justify-center md:justify-end md:pr-2`}
                    initial={{ width: 0 }}
                    animate={{ width: `${platform.engagement}%` }}
                    transition={{ delay: 0.3 + 0.1 * index, duration: 0.8 }}
                  >
                    <span className="text-white text-sm md:text-sm font-bold">
                      {platform.engagement}%
                    </span>
                  </motion.div>
                </div>
              </div>
              <div className="w-full md:w-32 text-center md:text-right mt-2 md:mt-0">
                <span
                  className={`px-3 py-1 md:px-2 rounded-full text-xs font-bold ${
                    platform.addiction === "MAXIMUM"
                      ? "bg-red-500"
                      : platform.addiction === "HIGH"
                      ? "bg-orange-500"
                      : platform.addiction === "MEDIUM"
                      ? "bg-yellow-500"
                      : platform.addiction === "DECLINING"
                      ? "bg-gray-500"
                      : "bg-blue-500"
                  }`}
                >
                  {platform.addiction}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const ComparisonSlide = ({ slide }) => (
  <motion.div
    className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 text-white p-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="max-w-6xl mx-auto">
      <motion.h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
        {slide.title}
      </motion.h1>
      <motion.p className="text-xl text-center mb-12 opacity-90">
        {slide.content}
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="bg-red-500/20 backdrop-blur-lg rounded-3xl p-8 border border-red-500/30"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-center mb-6">
            {slide.comparison.left.title}
          </h3>
          <div className="space-y-4">
            {slide.comparison.left.items.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + 0.1 * index }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-green-500/20 backdrop-blur-lg rounded-3xl p-8 border border-green-500/30"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-center mb-6">
            {slide.comparison.right.title}
          </h3>
          <div className="space-y-4">
            {slide.comparison.right.items.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + 0.1 * index }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

const ListSlide = ({ slide }) => {
  const [checkedItems, setCheckedItems] = useState(
    slide.listItems.map((item) => ({ ...item, checked: false }))
  );

  const toggleItem = (index) => {
    setCheckedItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
    playLikeSound();
  };

  const checkedCount = checkedItems.filter((item) => item.checked).length;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 text-white p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
          {slide.title}
        </motion.h1>
        <motion.p className="text-xl text-center mb-12 opacity-90">
          {slide.content}
        </motion.p>

        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/30">
          <div className="text-center mb-8">
            <div className="text-3xl font-bold">
              {checkedCount}/{checkedItems.length} checked
            </div>
            <div className="text-lg opacity-80">
              {checkedCount >= 6
                ? "You're definitely addicted! 📱💀"
                : checkedCount >= 4
                ? "Getting there... 📱😅"
                : checkedCount >= 2
                ? "Mild addiction 📱🤔"
                : "You're lying! 📱😏"}
            </div>
          </div>

          <div className="space-y-4">
            {checkedItems.map((item, index) => (
              <motion.button
                key={index}
                className={`w-full flex items-center text-left p-4 rounded-2xl transition-all border-2 ${
                  item.checked
                    ? "bg-green-600/30 border-green-400/60"
                    : "bg-white/15 border-white/30"
                }`}
                onClick={() => toggleItem(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="text-2xl mr-4">{item.emoji}</div>
                <div className="flex-1 text-lg">{item.text}</div>
                <div className="text-2xl">{item.checked ? "✅" : "⬜"}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ConclusionSlide = ({ slide }) => (
  <motion.div
    className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 text-white p-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="max-w-6xl mx-auto">
      <motion.h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
        {slide.title}
      </motion.h1>
      <motion.p className="text-xl text-center mb-12 opacity-90">
        {slide.content}
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {slide.solutions.map((solution, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-center border border-white/20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="text-4xl mb-4">{solution.emoji}</div>
            <h3 className="text-xl font-bold mb-3">{solution.title}</h3>
            <p className="text-sm opacity-90">{solution.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="text-2xl mb-4">Remember:</div>
        <div className="text-lg opacity-90 max-w-2xl mx-auto">
          Technology should enhance your life, not replace it. Use it wisely,
          touch grass occasionally, and maybe... just maybe... you can break
          free from the infinite scroll! 📱➡️🌿
        </div>
      </motion.div>
    </div>
  </motion.div>
);

// Main App component
function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const nextSlide = useCallback(() => {
    if (soundEnabled) playSwipeSound();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [soundEnabled]);

  const prevSlide = useCallback(() => {
    if (soundEnabled) playSwipeSound();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [soundEnabled]);

  const goToSlide = (index) => {
    if (soundEnabled) playNotificationSound();
    setCurrentSlide(index);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "Escape") {
        e.preventDefault();
        setCurrentSlide(0);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [nextSlide, prevSlide]);

  const renderSlide = (slide) => {
    switch (slide.type) {
      case "title":
        return <TitleSlide slide={slide} />;
      case "stats":
        return <StatsSlide slide={slide} />;
      case "viral-meme":
        return <ViralMemeSlide slide={slide} />;
      case "interactive":
        return <InteractiveSlide slide={slide} />;
      case "chart":
        return <ChartSlide slide={slide} />;
      case "comparison":
        return <ComparisonSlide slide={slide} />;
      case "fomo-explanation":
        return <FomoSlide slide={slide} />;
      case "list":
        return <ListSlide slide={slide} />;
      case "conclusion":
        return <ConclusionSlide slide={slide} />;
      default:
        return <div>Slide type not found</div>;
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Navigation */}
      <div className="fixed top-4 left-4 right-4 z-50 flex justify-between items-center">
        <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white">
          {currentSlide + 1} / {slides.length}
        </div>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="bg-black/50 backdrop-blur-sm rounded-full p-3 text-white hover:bg-black/70 transition-all"
        >
          {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </div>

      {/* Slide indicators */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 bg-black/50 backdrop-blur-sm rounded-full p-3 text-white hover:bg-black/70 transition-all"
        disabled={currentSlide === 0}
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 bg-black/50 backdrop-blur-sm rounded-full p-3 text-white hover:bg-black/70 transition-all"
        disabled={currentSlide === slides.length - 1}
      >
        <ChevronRight size={24} />
      </button>

      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5 }}
        >
          {renderSlide(slides[currentSlide])}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
