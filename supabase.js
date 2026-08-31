const SUPABASE_URL = "https://qmoktlngjfciubsgkslk.supabase.co";

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtb2t0bG5namZjaXVic2drc2xrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3MjI4NjcsImV4cCI6MjEwMjI5ODg2N30.dY9y3pnxg5jkGOVftU0qv_DbZsyKmvHidAa8s2A98Qw";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);