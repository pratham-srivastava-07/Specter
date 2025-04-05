"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe, Zap, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Landing() {
  const [data, setData] = useState('');
  const [url, setUrl] = useState('https://example.com');
  const [isLoading, setIsLoading] = useState(false);

  const fetchViaProxy = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`);
      const text = await res.text();
      setData(text);
    } catch (e) {
      console.error('Failed to fetch via proxy:', e);
      setData('Error fetching');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    { icon: Shield, title: 'Secure', description: 'End-to-end encryption for all requests' },
    { icon: Globe, title: 'Global', description: 'Access content from anywhere' },
    { icon: Zap, title: 'Fast', description: 'Lightning-fast response times' },
    { icon: Lock, title: 'Private', description: 'Your data stays yours' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Specter
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A next-generation proxy server built with Rust, delivering unparalleled speed and security
            for your web requests.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((Feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all">
                <Feature.icon className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{Feature.title}</h3>
                <p className="text-muted-foreground">{Feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Proxy Tester Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="p-8 bg-card/50 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6 text-center">Try Specter Now</h2>
            <div className="flex gap-4 mb-6">
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="flex-1"
              />
              <Button
                onClick={fetchViaProxy}
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90"
              >
                {isLoading ? 'Sending...' : 'Send Request'}
              </Button>
            </div>
            {data && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <Card className="bg-muted p-4 overflow-auto max-h-[400px]">
                  <pre className="text-sm">{data}</pre>
                </Card>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}