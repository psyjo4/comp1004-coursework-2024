import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://eywvespkrnkoeixdzccf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5d3Zlc3Brcm5rb2VpeGR6Y2NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxMDY5MTEsImV4cCI6MjAyNzY4MjkxMX0.xYxfuxOoO7glrfrEdBKFHMir4b9GKj-a6V9zAps7E_o'
const supabase = createClient(supabaseUrl, supabaseKey)

async function populateOwners() {
    const { data, error } = await supabase
        .from('People')
        .select('PersonID, Name');

    if (error) {
        console.error('Error fetching owners:', error);
        return;
    }

    const select = document.getElementById('person-id');
    data.forEach(person => {
        const option = document.createElement('option');
        option.value = person.PersonID;
        option.textContent = person.Name;
        select.appendChild(option);
    });
}

populateOwners();