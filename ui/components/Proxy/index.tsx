"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Send, Code, Copy, Check, RefreshCw, Globe, Server, Database, DownloadCloud, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function ProxyTester() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
  const [responseTime, setResponseTime] = useState<any>(null);
  const [responseSize, setResponseSize] = useState<any>(null);
  const [responseStatus, setResponseStatus] = useState<any>(null);
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
    const startTime: any = Date.now();
    
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
      
      const res = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`, requestOptions);
      const text = await res.text();
      const endTime: any = Date.now();
      
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
      
      setLastRequests((prev: any)=> [newRequest, ...prev.slice(0, 4)]);
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
    const newHeaders = [...headers];
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
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-slate-800 text-white pb-16">
      {/* Header with back button */}
      <header className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-16">
          <Link href="/">
            <Button variant="ghost" className="text-gray-400 p-2 mr-4">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </Link>
          
        </div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400">
            Specter
          </h1>
      </header>

      <motion.div 
        className="container mx-auto px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Request Configuration Panel */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 h-full">
              <h2 className="text-2xl font-bold mb-6 text-white">Request Configuration</h2>
              
              <div className="flex gap-4 mb-6">
                <div className="w-1/4 text-white">
                  <Select value={method} onValueChange={setMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Method" />
                    </SelectTrigger>
                    <SelectContent>
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
                    className="w-full bg-slate-800 border-gray-700 text-white"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-white">Proxy Location</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Globe className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Choose the server location for your proxy request</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select value={proxyLocation} onValueChange={setProxyLocation}>
                  <SelectTrigger className="w-full bg-slate-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
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
                    />
                    <Label htmlFor="advanced-mode text-white">Show</Label>
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
                          className="w-1/2 bg-slate-800 border-gray-700 text-white"
                        />
                        <Input
                          value={header.value}
                          onChange={(e) => updateHeader(index, 'value', e.target.value)}
                          placeholder="Value"
                          className="w-1/2 bg-slate-800 border-gray-700 text-white"
                        />
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeHeader(index)}
                          className="text-gray-400 hover:text-white"
                        >
                          ✖
                        </Button>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={addHeader}
                      className="mt-2 text-gray-400 border-gray-600"
                    >
                      Add Header
                    </Button>
                  </div>
                  
                  {(method === 'POST' || method === 'PUT' || method === 'PATCH') && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2">Request Body</h3>
                      <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Request payload (JSON)"
                        className="w-full h-32 p-2 rounded-md bg-slate-800 border border-gray-700 text-white"
                      />
                    </div>
                  )}
                </>
              )}
              
              <Button
                onClick={fetchViaProxy}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white mt-4"
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
              
              {/* Recent Requests */}
              {lastRequests.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4 text-white">Recent Requests</h3>
                  <div className="space-y-2">
                    {lastRequests.map((req: any, index: any) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-2 rounded-md bg-slate-800/50 hover:bg-slate-700/50 cursor-pointer transition-colors"
                        onClick={() => {
                          setUrl(req.url);
                          setMethod(req.method);
                        }}
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
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
          
          {/* Response Panel */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 h-full">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="p-6 border-b border-gray-700">
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
                        <div className="flex items-center px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm">
                          <Database className="h-3 w-3 mr-1" />
                          Size: {formatResponseSize(responseSize)}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <TabsList className="grid w-full grid-cols-2 bg-slate-800">
                    <TabsTrigger value="response">Response Body</TabsTrigger>
                    <TabsTrigger value="headers">Response Headers</TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="p-0">
                  <TabsContent value="response" className="m-0">
                    <div className="relative">
                      {data ? (
                        <>
                          <div className="absolute top-2 right-2 flex space-x-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleCopy}
                                    className="bg-slate-800/70 hover:bg-slate-700 text-gray-300"
                                  >
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
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
                                    className="bg-slate-800/70 hover:bg-slate-700 text-gray-300"
                                  >
                                    <Code className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Format JSON</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          
                          <pre className="bg-slate-950 text-gray-300 p-6 rounded-b-lg overflow-x-auto min-h-[400px] max-h-[600px]">
                            {data}
                          </pre>
                        </>
                      ) : (
                        <div className="bg-slate-950 text-gray-500 p-6 rounded-b-lg min-h-[400px] flex flex-col items-center justify-center">
                          {isLoading ? (
                            <>
                              <Loader2 className="h-10 w-10 animate-spin mb-4" />
                              <p>Fetching data through proxy...</p>
                            </>
                          ) : (
                            <>
                              <DownloadCloud className="h-10 w-10 mb-4" />
                              <p>Send a request to see the response</p>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="headers" className="m-0">
                    <div className="bg-slate-950 text-gray-300 p-6 rounded-b-lg min-h-[400px] max-h-[600px] overflow-y-auto">
                      {responseStatus ? (
                        <div className="grid grid-cols-2 gap-2">
                          <div className="col-span-2 pb-2 mb-4 border-b border-gray-800">
                            <h3 className="text-lg font-medium ">Response Headers</h3>
                          </div>
                          
                          {/* This would display actual headers from the response */}
                          {/* Since we don't have actual header data, showing placeholders */}
                          <div className="text-gray-400">content-type</div>
                          <div>application/json</div>
                          <div className="text-gray-400">server</div>
                          <div>nginx</div>
                          <div className="text-gray-400">x-proxy-origin</div>
                          <div>{proxyLocation}</div>
                          <div className="text-gray-400">date</div>
                          <div>{new Date().toUTCString()}</div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                          {isLoading ? (
                            <>
                              <Loader2 className="h-10 w-10 animate-spin mb-4" />
                              <p>Fetching headers...</p>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-10 w-10 mb-4" />
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
        <motion.div 
          variants={itemVariants}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700">
            <div className="bg-purple-500/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Global Proxy Network</h3>
            <p className="text-gray-300">
              Access web resources from multiple geographic locations to test region-specific content and latency from various parts of the world.
            </p>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700">
            <div className="bg-blue-500/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <RefreshCw className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Request History</h3>
            <p className="text-gray-300">
              Keep track of your recent requests and easily reuse them. Compare response times and detect changes in API responses over time.
            </p>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700">
            <div className="bg-emerald-500/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Code className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Advanced Request Options</h3>
            <p className="text-gray-300">
              Customize headers, request body, and other parameters to thoroughly test API endpoints and web services with precision.
            </p>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}