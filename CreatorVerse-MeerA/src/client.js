import { createClient } from '@supabase/supabase-js';

const URL = 'https://xbzqrfkotbihdjzzkaqq.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhienFyZmtvdGJpaGRqenprYXFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI1MTMyMjAsImV4cCI6MjAwODA4OTIyMH0.0XNI2cUQuLvF32nT-wbZbqEm9P7P_y58G4tUwusHMEU';
export const supabase = createClient(URL, API_KEY);