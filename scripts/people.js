import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://eywvespkrnkoeixdzccf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5d3Zlc3Brcm5rb2VpeGR6Y2NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxMDY5MTEsImV4cCI6MjAyNzY4MjkxMX0.xYxfuxOoO7glrfrEdBKFHMir4b9GKj-a6V9zAps7E_o'
const supabase = createClient(supabaseUrl, supabaseKey)

/*                                     *
 * ========== Search People ========== *
 *                                     */
async function searchPeople(nameInput, licenseInput) {
    let query = supabase
        .from('People')
        .select('*');

    if (nameInput) {
        query = query.ilike('Name', `%${nameInput}%`);
    } else if (licenseInput) {
        query = query.ilike('LicenseNumber', `%${licenseInput}%`);
    }

    const { data, error } = await query
    const resultDiv = document.getElementById('results');
    const messageDiv = document.getElementById('message');

    if (error) {
        console.log('error', error);
        messageDiv.textContent = 'Error';
    } 
    else if (data.length === 0){
        console.log('no data', data);
        messageDiv.textContent = 'No result found';
    }
    else {
        console.log('data', data);
        let resultsHTML = data.map(person => `
            <div class="result">
                <p><strong>Name:</strong> ${person.Name}</p>
                <p><strong>Address:</strong> ${person.Address}</p>
                <p><strong>DOB:</strong> ${person.DOB}</p>
                <p><strong>Expiry Date:</strong> ${person.ExpiryDate}</p>
                <p><strong>License Number:</strong> ${person.LicenseNumber}</p>
                <p><strong>Person ID:</strong> ${person.PersonID}</p>
            </div>
        `).join('');
        resultDiv.innerHTML = resultsHTML;
        messageDiv.textContent = 'Search successful';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('people-search-form');
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const nameInput = document.getElementById('name').value.trim();
        const licenseInput = document.getElementById('license').value.trim();
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = '';

        if (!nameInput && !licenseInput) {
            messageDiv.textContent = 'Error';
            return;
        } else if (nameInput && licenseInput) {
            messageDiv.textContent = 'Error';
            return;
        }

        searchPeople(nameInput, licenseInput);
    });
});