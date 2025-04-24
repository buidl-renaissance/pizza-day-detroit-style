"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>;
      isMetaMask?: boolean;
    };
  }
}

export default function Register() {
  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [isMobileSafari, setIsMobileSafari] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    // Check if user is on Mobile Safari
    const ua = window.navigator.userAgent;
    const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
    const webkit = !!ua.match(/WebKit/i);
    const isMobileSafari = iOS && webkit && !ua.match(/CriOS/i) && !ua.match(/FxiOS/i);
    setIsMobileSafari(isMobileSafari);

    // Check if wallet is already connected and registration exists
    const checkExistingRegistration = async () => {
      try {
        // Check if MetaMask is installed
        if (window.ethereum) {
          // Check if already connected
          const accounts = await window.ethereum.request({ 
            method: "eth_accounts" 
          });
          
          if (accounts && accounts.length > 0) {
            setWalletAddress(accounts[0]);
            
            // Check if this wallet is already registered
            const storedEmail = localStorage.getItem(`registered_${accounts[0]}`);
            if (storedEmail) {
              setRegisteredEmail(storedEmail);
              setAlreadyRegistered(true);
              setSuccess(true);
            }
          }
        }
      } catch (err) {
        console.error("Error checking existing registration:", err);
      }
    };
    
    checkExistingRegistration();
  }, []);

  const connectWallet = async () => {
    setIsConnecting(true);
    setError("");
    
    try {
      if (!window.ethereum) {
        if (isMobileSafari) {
          // Redirect to MetaMask mobile app
          window.location.href = "https://metamask.app.link/dapp/" + window.location.host + window.location.pathname;
          return;
        }
        throw new Error("MetaMask is not installed. Please install MetaMask to continue.");
      }
      
      const accounts = await window.ethereum.request({ 
        method: "eth_requestAccounts" 
      });
      
      setWalletAddress(accounts[0]);
      
      // Check if this wallet is already registered
      const storedEmail = localStorage.getItem(`registered_${accounts[0]}`);
      if (storedEmail) {
        setRegisteredEmail(storedEmail);
        setAlreadyRegistered(true);
        setSuccess(true);
      } else {
        setShowModal(true); // Show the modal after wallet connection
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to connect wallet. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    if (!email) {
      setError("Please enter your email address.");
      setIsSubmitting(false);
      return;
    }
    
    if (!walletAddress) {
      setError("Please connect your MetaMask wallet first.");
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Send registration data to the API
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress,
          email,
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to register. Please try again.');
      }
      
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Registration failed. Please try again.');
      }
      
      // Save registration to local storage
      localStorage.setItem(`registered_${walletAddress}`, email);
      setRegisteredEmail(email);
      setAlreadyRegistered(true);
      
      setSuccess(true);
      setShowModal(false);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to register. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans">
      <main className="mx-auto py-8">
        <section className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Join the Scavenger Hunt</h1>
          
          {success ? (
            <div>
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {alreadyRegistered 
                  ? "You are already registered for the scavenger hunt!" 
                  : "Registration successful! Redirecting you..."}
              </div>
              {alreadyRegistered && (
                <div className="mt-4">
                  <p className="font-medium mb-2">Registered Wallet:</p>
                  <div className="px-4 py-2 bg-gray-100 rounded-md break-all mb-3">
                    {walletAddress}
                  </div>
                  <p className="font-medium mb-2">Registered Email:</p>
                  <div className="px-4 py-2 bg-gray-100 rounded-md break-all">
                    {registeredEmail}
                  </div>
                  <div className="mt-4">
                    <a 
                      href="/dashboard" 
                      className="w-full cta px-4 py-3 rounded-md font-bold text-center block"
                    >
                      Go to Dashboard
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}
              
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="w-full cta px-4 py-3 rounded-md font-bold text-center"
              >
                {isConnecting ? "Connecting..." : walletAddress ? 
                  `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 
                  isMobileSafari ? "Open in MetaMask App" : "Register Wallet"}
              </button>
              
              <p className="mt-6 text-sm text-center text-gray-600">
                {isMobileSafari 
                  ? "You'll be redirected to the MetaMask app to connect your wallet."
                  : "Connect your MetaMask wallet to participate in the Detroit Bitcoin Pizza Day Scavenger Hunt."}
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Registration Modal */}
      {showModal && walletAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Complete Registration</h2>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <div className="mb-6">
              <p className="font-medium mb-2">Connected Wallet:</p>
              <div className="px-4 py-2 bg-gray-100 rounded-md break-all">
                {walletAddress}
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="your@email.com"
                  autoCapitalize="off"
                  autoCorrect="off"
                />
              </div>
              
              <div className="flex flex-col space-y-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cta px-4 py-3 rounded-md font-bold text-center"
                >
                  {isSubmitting ? "Registering..." : "Complete Registration"}
                </button>
                
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-3 rounded-md font-bold border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
