'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PoapToken } from '@/utils/interfaces';

export default function DashboardPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [relevantPoap, setRelevantPoap] = useState<PoapToken[]>([]);
  const router = useRouter();

  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        // Check if MetaMask is installed
        if (!window.ethereum) {
          router.push('/register');
          return;
        }

        // Check if wallet is connected
        const accounts = await window.ethereum.request({ 
          method: 'eth_accounts' 
        });
        
        if (accounts && accounts.length > 0) {
          // Check if this wallet is registered in local storage
          const storedEmail = localStorage.getItem(`registered_${accounts[0]}`);
          
          if (storedEmail) {
            setWalletAddress(accounts[0]);
            // Fetch POAPs for this wallet
            fetchPoaps(accounts[0]);
          } else {
            // Wallet connected but not registered
            router.push('/register');
          }
        } else {
          // No wallet connected
          router.push('/register');
        }
      } catch (err) {
        console.error('Error checking wallet connection:', err);
        router.push('/register');
      }
    };
    
    const fetchPoaps = async (address: string) => {
      try {
        const response = await fetch(`/api/poaps?walletAddress=${address}`);
        if (response.ok) {
          const data = await response.json();
          setRelevantPoap(data.relevantPoap || []);
        } else {
          console.error('Failed to fetch POAPs');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching POAPs:', error);
        setLoading(false);
      }
    };
    
    checkWalletConnection();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 max-w-md w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Scavenger Hunt Dashboard
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Track your progress and collect all the POAPs!
          </p>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Your Connected Wallet</h2>
            <div className="flex items-center">
              <div className="px-4 py-2 bg-gray-100 rounded-md break-all flex-1 font-mono text-sm">
                {walletAddress}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Hunt Progress</h2>
            
            {relevantPoap.length > 0 ? (
              <div>
                <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">
                        You have collected {relevantPoap.length} POAP{relevantPoap.length !== 1 ? 's' : ''}!
                      </p>
                    </div>
                  </div>
                </div>
                
                <ul className="divide-y divide-gray-200">
                  {relevantPoap.map((poap) => (
                    <li key={poap.tokenId} className="py-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <img 
                            src={poap.event.image_url} 
                            alt={poap.event.name} 
                            className="h-16 w-16 rounded-full border-2 border-gray-200"
                          />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="text-lg font-medium text-gray-900 truncate">
                            {poap.event.name}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {poap.event.description}
                          </p>
                          <div className="mt-2 flex items-start flex-wrap text-xs text-gray-500">
                            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                              Token ID: {poap.tokenId}
                            </span>
                            <span className="mx-2">•</span>
                            <span>
                              Collected on {new Date(poap.created).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      You haven't collected any POAPs yet. Your scavenger hunt progress will appear here once the event begins.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
