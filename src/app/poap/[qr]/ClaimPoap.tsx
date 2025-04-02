"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface PoapDetails {
  id: string;
  name: string;
  description: string;
  image_url: string;
  event_url?: string;
  country?: string;
  city?: string;
  start_date?: string;
  end_date?: string;
}

export default function ClaimPoap({ qrCode }: { qrCode: string }) {
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [poapDetails, setPoapDetails] = useState<PoapDetails | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        // Check if MetaMask is installed
        if (!window.ethereum) {
          router.push("/register");
          return;
        }

        // Check if wallet is connected
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts && accounts.length > 0) {
          // Check if this wallet is registered in local storage
          const storedEmail = localStorage.getItem(`registered_${accounts[0]}`);

          if (storedEmail) {
            setWalletAddress(accounts[0]);
            // Fetch POAP details for this QR code
            fetchPoapDetails(qrCode);
          } else {
            // Wallet connected but not registered
            router.push("/register");
          }
        } else {
          // No wallet connected
          router.push("/register");
        }
      } catch (err) {
        console.error("Error checking wallet connection:", err);
        router.push("/register");
      }
    };

    const fetchPoapDetails = async (qrCode: string) => {
      try {
        const response = await fetch(`/api/poap-details?qrCode=${qrCode}`);
        if (response.ok) {
          const data = await response.json();
          setPoapDetails(data.poapDetails);
        } else {
          setError("Failed to fetch POAP details. Invalid QR code.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching POAP details:", error);
        setError("An error occurred while fetching POAP details.");
        setLoading(false);
      }
    };

    checkWalletConnection();
  }, [qrCode, router]);

  const handleClaimPoap = async () => {
    setClaiming(true);
    setError("");

    try {
      const response = await fetch("/api/claim-poap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress,
          qrCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to claim POAP");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to claim POAP. Please try again.");
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    } finally {
      setClaiming(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 max-w-md w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">
            Loading POAP details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Claim Your POAP
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            You&apos;ve found a scavenger hunt item!
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {success ? (
          <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-6 rounded-lg text-center mb-6">
            <svg
              className="h-12 w-12 text-green-500 mx-auto mb-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-medium">POAP Claimed Successfully!</h3>
            <p className="mt-2">Redirecting to your dashboard...</p>
          </div>
        ) : poapDetails ? (
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex flex-col items-center">
                {poapDetails.image_url && (
                  <div className="mb-4">
                    <Image
                      src={poapDetails.image_url}
                      alt={poapDetails.name || "POAP"}
                      className="h-40 w-40 rounded-full border-2 border-gray-200"
                      width={160}
                      height={160}
                    />
                  </div>
                )}

                <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
                  {poapDetails.name || "Special POAP"}
                </h2>

                <p className="text-gray-500 text-center mb-6">
                  {poapDetails.description ||
                    "Claim this special POAP for your collection!"}
                </p>

                <div className="w-full px-4 py-3 bg-gray-100 rounded-md mb-6">
                  <p className="text-sm text-gray-700 font-medium">
                    Connected Wallet:
                  </p>
                  <p className="font-mono text-xs break-all">{walletAddress}</p>
                </div>

                <button
                  onClick={handleClaimPoap}
                  disabled={claiming}
                  className="w-full cta px-4 py-3 rounded-md font-bold text-center"
                >
                  {claiming ? "Claiming..." : "Claim POAP"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Invalid QR code or POAP not found. Please scan a valid QR
                  code.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
