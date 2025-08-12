"use client";

import { useState, useEffect } from "react";
import {
  Lightbulb,
  RefreshCw,
  BookOpen,
  Save,
  Trash2,
  Quote as QuoteIcon,
} from "lucide-react";

interface Quote {
  id: string;
  text: string;
  author: string;
  category: string;
  timestamp: Date;
}

export default function QuoteGenerator() {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [savedQuotes, setSavedQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("business");

  const quotes = {
    business: [
      {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
      },
      {
        text: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs",
      },
      {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
      },
      {
        text: "Don't be afraid to give up the good to go for the great.",
        author: "John D. Rockefeller",
      },
      {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
      },
    ],
    motivation: [
      {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt",
      },
      {
        text: "It is during our darkest moments that we must focus to see the light.",
        author: "Aristotle",
      },
      {
        text: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins",
      },
      {
        text: "Success is not how high you have climbed, but how you make a positive difference to the world.",
        author: "Roy T. Bennett",
      },
      {
        text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
        author: "Ralph Waldo Emerson",
      },
    ],
    digital: [
      {
        text: "The digital revolution is far more significant than the invention of writing or even of printing.",
        author: "Douglas Engelbart",
      },
      {
        text: "Technology is best when it brings people together.",
        author: "Matt Mullenweg",
      },
      {
        text: "The Internet is becoming the town square for the global village of tomorrow.",
        author: "Bill Gates",
      },
      {
        text: "Digital transformation is not about technology, it's about strategy and new ways of thinking.",
        author: "Anonymous",
      },
      {
        text: "In the digital age, the most valuable skill you can acquire is learning how to learn.",
        author: "Anonymous",
      },
    ],
  };

  const categories = [
    { value: "business", label: "Business", icon: "💼" },
    { value: "motivation", label: "Motivation", icon: "🚀" },
    { value: "digital", label: "Digital", icon: "💻" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("savedQuotes");
    if (saved) {
      setSavedQuotes(JSON.parse(saved));
    }
    generateQuote();
  }, []);

  const generateQuote = () => {
    setIsLoading(true);

    setTimeout(() => {
      const categoryQuotes = quotes[selectedCategory as keyof typeof quotes];
      const randomQuote =
        categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];

      setCurrentQuote({
        id: Date.now().toString(),
        text: randomQuote.text,
        author: randomQuote.author,
        category: selectedCategory,
        timestamp: new Date(),
      });
      setIsLoading(false);
    }, 500);
  };

  const saveQuote = () => {
    if (!currentQuote) return;

    const newSavedQuotes = [...savedQuotes, currentQuote];
    setSavedQuotes(newSavedQuotes);
    localStorage.setItem("savedQuotes", JSON.stringify(newSavedQuotes));
  };

  const deleteQuote = (id: string) => {
    const updatedQuotes = savedQuotes.filter((quote) => quote.id !== id);
    setSavedQuotes(updatedQuotes);
    localStorage.setItem("savedQuotes", JSON.stringify(updatedQuotes));
  };

  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center schema-card ring-1 ring-white/80 rounded-full px-4 py-3 mb-2">
            <Lightbulb className="text-orange-500 mr-2" size={24} />
            <span className="text-white font-semibold">Daily Inspiration</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-heading font-display leading-tight font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-500 to-white bg-clip-text text-transparent">
              Quote Generator
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Get inspired with powerful quotes from successful entrepreneurs,
            innovators, and thought leaders. Save your favorites and build your
            personal collection.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Quote Generator */}
            <div className="small-card font-display text-center rounded-3xl shadow-2xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-white/80 mb-6">
                Generate New Quote
              </h3>

              {/* Category Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Choose Category
                </label>
                <div className="grid grid-cols-3 gap-3 border-y border-orange p-3 font-sans">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`p-3 rounded-xl text-center transition-all duration-300 ${
                        selectedCategory === category.value
                          ? "bg-gradient-to-r from-orange-500 to-transparent text-white shadow-lg"
                          : "bg-transparent hover:bg-black/20 hover:text-orange-500"
                      }`}
                    >
                      <div className="text-2xl mb-1">{category.icon}</div>
                      <div className="text-sm font-medium">
                        {category.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Quote Display */}
              <div className="b rounded-2xl p-6 mb-6 min-h-[200px] flex items-center justify-center">
                {isLoading ? (
                  <div className="text-center">
                    <RefreshCw
                      className="animate-spin text-orange-500 mx-auto mb-4"
                      size={32}
                    />
                    <p className="text-white font-display">
                      Generating inspiration...
                    </p>
                  </div>
                ) : currentQuote ? (
                  <div className="text-center">
                    <blockquote className="text-lg md:text-xl font-medium text-white mb-4 leading-relaxed">
                      "{currentQuote.text}"
                    </blockquote>
                    <cite className="text-d leading-tight font-sans font-semibold">
                      — {currentQuote.author}
                    </cite>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    Click generate to get your first quote!
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={generateQuote}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-transparent to-orange-500 hover:from-teal-600 hover:to-gray-600/80 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <RefreshCw
                    className={`mr-2 ${isLoading ? "animate-spin" : ""}`}
                    size={20}
                  />
                  Generate New Quote
                </button>

                {currentQuote && (
                  <button
                    onClick={saveQuote}
                    className="bg-gradient-to-r from-orange-500 to-transparent hover:from-teal-600 hover:to-gray-600/80  text-white px-6 py-3 rounded-xl font-semibold  flex items-center"
                  >
                    <Save className="mr-2" size={20} />
                    Save
                  </button>
                )}
              </div>
            </div>

            {/* Saved Quotes */}
            <div className="small-card rounded-3xl font-display leading-tight shadow-2xl p-8 ">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold  text-white/80">
                  Saved Quotes
                </h3>
                <div className="flex items-center text-orange-500">
                  <BookOpen className="mr-2" size={20} />
                  <span className="text-sm">{savedQuotes.length} saved</span>
                </div>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {savedQuotes.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="text-orange mx-auto mb-4" size={48} />
                    <p className="text-gray-300">
                      No saved quotes yet. Generate and save your favorites!
                    </p>
                  </div>
                ) : (
                  savedQuotes.map((quote) => (
                    <div
                      key={quote.id}
                      className="small-card rounded-xl p-4 group  transition-colors duration-300"
                    >
                      <blockquote className="text-black text-center mb-2 leading-relaxed">
                        "{quote.text}"
                      </blockquote>
                      <div className="flex items-center justify-between">
                        <cite className="text-warm place-content-center font-semibold text-sm">
                          — {quote.author}
                        </cite>
                        <button
                          onClick={() => deleteQuote(quote.id)}
                          className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 transition-all duration-300"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-center mt-2">
                        <span className="text-xs text-warm capitalize">
                          {quote.category}
                        </span>
                        <span className="text-xs text-white">
                          {new Date(quote.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <h3 className="text-3xl font-bold font-display leading-tight text-center text-fire mb-10">
            Professional Business & Web Development Quotes
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                text: "Your website is the window to your business. Keep it fresh, clean, and engaging.",
                author: "Paul Cookson",
              },
              {
                text: "Websites promote you 24/7: No employee will do that.",
                author: "Paul Cookson",
              },
              {
                text: "Business opportunities are like buses; there’s always another one coming.",
                author: "Richard Branson",
              },
              {
                text: "The best websites aren’t the prettiest — they’re the ones that convert.",
                author: "Anonymous",
              },
            ].map((quote, idx) => (
              <div
                key={idx}
                className="bg-black/40 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
              >
                <QuoteIcon size={45} className="text-white/20 mb-4" />
                <blockquote className="text-lg text-real italic mb-3">
                  “{quote.text}”
                </blockquote>
                <cite className="text-orange-500 capitalize caret-inherit font-semibold">
                  — {quote.author}
                </cite>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
