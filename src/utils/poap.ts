/**
 * Fetches POAP token data from the POAP API
 * @param tokenId The ID of the POAP token to fetch
 * @returns Promise with the token data
 */
export const getPoapToken = async (tokenId: string | number) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-api-key': process.env.POAP_API_KEY || ''
    }
  };
  
  try {
    const response = await fetch(`https://api.poap.tech/token/${tokenId}`, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch POAP token: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching POAP token:', error);
    throw error;
  }
};

export const getPoapsForWallet = async (walletAddress: string) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-api-key': process.env.POAP_API_KEY || ''
    }
  };

  console.log(walletAddress, options);

  try {
    const response = await fetch(`https://api.poap.tech/actions/scan/${walletAddress}`, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch POAPs: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching POAPs:', error);
    throw error;
  }
};
