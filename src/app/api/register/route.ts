import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Initialize the database table if it doesn't exist
async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS wallet_registrations (
        wallet_address TEXT PRIMARY KEY,
        email TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Call initialization on module load
initializeDatabase();

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { walletAddress, email } = body;
    
    // Validate the input
    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Check if wallet is already registered
    const checkResult = await pool.query(
      'SELECT email FROM wallet_registrations WHERE wallet_address = $1',
      [walletAddress]
    );
    
    if (checkResult.rows.length > 0) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Wallet already registered',
          alreadyRegistered: true,
          email: checkResult.rows[0].email
        }
      );
    }
    
    // Store the registration in PostgreSQL
    await pool.query(
      'INSERT INTO wallet_registrations (wallet_address, email) VALUES ($1, $2)',
      [walletAddress, email]
    );
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      walletAddress,
      email
    });
    
  } catch (error) {
    console.error('Error processing registration:', error);
    return NextResponse.json(
      { error: 'Failed to process registration' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('walletAddress');
    
    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }
    
    // Check if wallet is registered in PostgreSQL
    const result = await pool.query(
      'SELECT email FROM registrations WHERE wallet_address = $1',
      [walletAddress]
    );
    
    if (result.rows.length > 0) {
      return NextResponse.json({
        registered: true,
        email: result.rows[0].email
      });
    }
    
    return NextResponse.json({ registered: false });
  } catch (error) {
    console.error('Error checking registration:', error);
    return NextResponse.json(
      { error: 'Failed to check registration' },
      { status: 500 }
    );
  }
}

