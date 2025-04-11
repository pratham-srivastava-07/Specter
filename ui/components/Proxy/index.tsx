"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Send, Code, Copy, Check, RefreshCw, Globe, Server, Database, DownloadCloud, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SparklesCore } from "../ui/sparkles";
import Features from '../Features';

export default function ProxyTester() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
  const [responseTime, setResponseTime] = useState<any>(null);
  const [responseSize, setResponseSize] = useState<any>(null);
  const [responseStatus, setResponseStatus] = useState(null);
  const [copied, setCopied] = useState(false);
  const [lastRequests, setLastRequests] = useState<any>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeTab, setActiveTab] = useState("response");
  const [proxyLocation, setProxyLocation] = useState("auto");

  const fetchViaProxy = async () => {
    setIsLoading(true);
    setData('');
    setResponseStatus(null);
    setResponseTime(null);
    setResponseSize(null);
    const startTime = Date.now();
    
    try {
      // Filter out empty headers
      const validHeaders = headers.filter(h => h.key.trim() !== '' && h.value.trim() !== '');
      const headersObj = Object.fromEntries(validHeaders.map(h => [h.key, h.value]));
      
      const requestOptions: any = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'X-Proxy-Location': proxyLocation,
          ...headersObj
        }
      };
      
      if (method !== 'GET' && method !== 'HEAD' && body.trim() !== '') {
        requestOptions.body = body;
      }
      
      const res: any = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`, requestOptions);
      const text: any = await res.text();
      const endTime = Date.now();
      
      setData(text);
      setResponseStatus(res.status);
      setResponseTime(endTime - startTime);
      setResponseSize(new Blob([text]).size);
      
      // Save this request to history
      const newRequest = {
        url,
        method,
        timestamp: new Date().toISOString(),
        status: res.status
      };
      
      setLastRequests([newRequest, ...lastRequests.slice(0, 4)]);
    } catch (e: any) {
      console.error('Failed to fetch via proxy:', e);
      setData('Error fetching: ' + e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const removeHeader = (index: any) => {
    const newHeaders: any = [...headers];
    newHeaders.splice(index, 1);
    setHeaders(newHeaders);
  };

  const updateHeader = (index: any, field: any, value: any) => {
    const newHeaders: any = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };
  
  const formatResponseSize = (bytes: any) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Example locations for the proxy
  const locations = [
    { value: "auto", label: "Auto-select" },
    { value: "us-east", label: "US East (Virginia)" },
    { value: "us-west", label: "US West (California)" },
    { value: "eu-central", label: "EU Central (Frankfurt)" },
    { value: "ap-east", label: "Asia Pacific (Tokyo)" }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-16 relative overflow-hidden">
      {/* Sparkles Background */}
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlescolorful"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
          className="w-full h-full"
          particleColor="#00ff00"
          speed={0.5}
        />
      </div>
      
      {/* Header with back button */}
     {/* Header with centered content */}
<header className="container mx-auto px-4 py-16 relative z-10 flex flex-col items-center justify-center text-center">
  <motion.p 
    className="text-green-400 mt-4 text-lg md:text-xl max-w-2xl"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    Slice through the digital veil with precision. Your gateway to seamless API testing and network intelligence.
  </motion.p>
  
  <motion.div
    className="mt-6 flex justify-center"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.4 }}
  >
    <div className="px-4 py-2 rounded-full border border-green-500/30 bg-black/50 text-sm text-gray-400 flex items-center">
      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
      Proxy Network Online
    </div>
  </motion.div>
</header>

      <motion.div 
        className="container mx-auto px-4 relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Request Configuration Panel */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Card className="p-6 bg-black border border-green-500/30 backdrop-blur-sm h-full">
              <h2 className="text-2xl font-bold mb-6 text-white">Request Configuration</h2>
              
              <div className="flex gap-4 mb-6">
                <div className="w-1/4 text-white cursor-pointer">
                  <Select value={method} onValueChange={setMethod}>
                    <SelectTrigger className="border-green-500/30 bg-black">
                      <SelectValue placeholder="Method" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-green-500/30">
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                      <SelectItem value="PATCH">PATCH</SelectItem>
                      <SelectItem value="HEAD">HEAD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-3/4">
                  <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full bg-black border-green-500/30 text-white"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-white">Proxy Location</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Globe className="h-4 w-4 text-green-400" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-black border-green-500/30">
                        <p>Choose the server location for your proxy request</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select value={proxyLocation} onValueChange={setProxyLocation}>
                  <SelectTrigger className="w-full bg-black border-green-500/30 text-white">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-white cursor-pointer border-green-500/30">
                    {locations.map((location) => (
                      <SelectItem key={location.value} value={location.value}>
                        {location.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-white">Advanced Options</h3>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="advanced-mode" 
                      checked={showAdvanced}
                      onCheckedChange={setShowAdvanced}
                      className="data-[state=checked]:bg-green-500"
                    />
                    <Label htmlFor="advanced-mode" className="text-white">Show</Label>
                  </div>
                </div>
              </div>
              
              {showAdvanced && (
                <>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2 text-white">Headers</h3>
                    {headers.map((header, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          value={header.key}
                          onChange={(e) => updateHeader(index, 'key', e.target.value)}
                          placeholder="Header name"
                          className="w-1/2 bg-black border-green-500/30 text-white"
                        />
                        <Input
                          value={header.value}
                          onChange={(e) => updateHeader(index, 'value', e.target.value)}
                          placeholder="Value"
                          className="w-1/2 bg-black border-green-500/30 text-white"
                        />
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeHeader(index)}
                          className="text-gray-400 hover:text-green-400"
                        >
                          ✖
                        </Button>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={addHeader}
                      className="mt-2 text-green-400 hover:bg-green-500/10 border-green-500/30"
                    >
                      Add Header
                    </Button>
                  </div>
                  
                  {(method === 'POST' || method === 'PUT' || method === 'PATCH') && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2 text-white">Request Body</h3>
                      <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Request payload (JSON)"
                        className="w-full h-32 p-2 rounded-md bg-black border border-green-500/30 text-white"
                      />
                    </div>
                  )}
                </>
              )}
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={fetchViaProxy}
                  disabled={isLoading}
                  className="w-full bg-green-500 hover:bg-green-600 text-black font-bold cursor-pointer mt-4"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Request...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Request
                    </>
                  )}
                </Button>
              </motion.div>
              
              {/* Recent Requests */}
              {lastRequests.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4 text-white">Recent Requests</h3>
                  <div className="space-y-2">
                    {lastRequests.map((req: any, index: any) => (
                      <motion.div 
                        key={index} 
                        className="flex items-center justify-between p-2 rounded-md bg-black border border-green-500/20 hover:border-green-500/50 cursor-pointer transition-colors"
                        onClick={() => {
                          setUrl(req.url);
                          setMethod(req.method);
                        }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex items-center">
                          <span className={`inline-flex items-center justify-center w-16 px-2 py-1 mr-3 text-xs font-medium rounded ${
                            req.status >= 200 && req.status < 300 ? 'bg-green-500/20 text-green-400' :
                            req.status >= 400 ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {req.method}
                          </span>
                          <span className="text-sm truncate max-w-[120px] text-white">{req.url}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          req.status >= 200 && req.status < 300 ? 'bg-green-500/20 text-green-400' :
                          req.status >= 400 ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {req.status}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
          
          {/* Response Panel */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="bg-black border border-green-500/30 backdrop-blur-sm h-full relative">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="p-6 border-b border-green-500/30">
                  <h2 className="text-2xl font-bold mb-2 text-white">Response</h2>
                  {responseStatus && (
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        responseStatus >= 200 && responseStatus < 300 ? 'bg-green-500/20 text-green-400' :
                        responseStatus >= 400 ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        Status: {responseStatus}
                      </div>
                      
                      {responseTime && (
                        <div className="flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
                          <Server className="h-3 w-3 mr-1" />
                          Time: {responseTime}ms
                        </div>
                      )}
                      
                      {responseSize && (
                        <div className="flex items-center px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                          <Database className="h-3 w-3 mr-1" />
                          Size: {formatResponseSize(responseSize)}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <TabsList className="grid w-full grid-cols-2 bg-black border border-green-500/30">
                    <TabsTrigger value="response" className="data-[state=active]:bg-green-500 cursor-pointer text-white data-[state=active]:text-black">Response Body</TabsTrigger>
                    <TabsTrigger value="headers" className="data-[state=active]:bg-green-500 cursor-pointer text-white data-[state=active]:text-black">Response Headers</TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="p-0">
                  <TabsContent value="response" className="m-0">
                    <div className="relative">
                      {data ? (
                        <>
                          <div className="absolute top-2 right-2 flex space-x-2 z-10">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleCopy}
                                    className="bg-black/70 hover:bg-gray-900 text-green-400 border border-green-500/30"
                                  >
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-black border-green-500/30">
                                  <p>Copy to clipboard</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                      try {
                                        const formatted = JSON.stringify(JSON.parse(data), null, 2);
                                        setData(formatted);
                                      } catch (e) {
                                        // Not valid JSON, ignore
                                      }
                                    }}
                                    className="bg-black/70 hover:bg-gray-900 text-green-400 border border-green-500/30"
                                  >
                                    <Code className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-black border-green-500/30">
                                  <p>Format JSON</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          
                          <pre className="bg-black text-green-400 p-6 rounded-b-lg overflow-x-auto min-h-[400px] max-h-[600px] border-t border-green-500/10">
                            {data}
                          </pre>
                        </>
                      ) : (
                        <div className="bg-black text-gray-500 p-6 rounded-b-lg min-h-[400px] flex flex-col items-center justify-center border-t border-green-500/10">
                          {isLoading ? (
                            <>
                              <Loader2 className="h-10 w-10 animate-spin mb-4 text-green-400" />
                              <p>Fetching data through proxy...</p>
                            </>
                          ) : (
                            <>
                              <DownloadCloud className="h-10 w-10 mb-4 text-green-400" />
                              <p>Send a request to see the response</p>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="headers" className="m-0">
                    <div className="bg-black text-gray-300 p-6 rounded-b-lg min-h-[400px] max-h-[600px] overflow-y-auto border-t border-green-500/10">
                      {responseStatus ? (
                        <div className="grid grid-cols-2 gap-2">
                          <div className="col-span-2 pb-2 mb-4 border-b border-green-500/20">
                            <h3 className="text-lg font-medium text-white">Response Headers</h3>
                          </div>
                          
                          <div className="text-green-400">content-type</div>
                          <div>application/json</div>
                          <div className="text-green-400">server</div>
                          <div>nginx</div>
                          <div className="text-green-400">x-proxy-origin</div>
                          <div>{proxyLocation}</div>
                          <div className="text-green-400">date</div>
                          <div>{new Date().toUTCString()}</div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                          {isLoading ? (
                            <>
                              <Loader2 className="h-10 w-10 animate-spin mb-4 text-green-400" />
                              <p>Fetching headers...</p>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-10 w-10 mb-4 text-green-400" />
                              <p>No header information available</p>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </Card>
          </motion.div>
        </div>
        
        {/* Feature Descriptions */}
        <Features />
        
      </motion.div>
    </div>
  );
}