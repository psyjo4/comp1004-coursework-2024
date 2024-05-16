import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://eywvespkrnkoeixdzccf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5d3Zlc3Brcm5rb2VpeGR6Y2NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxMDY5MTEsImV4cCI6MjAyNzY4MjkxMX0.xYxfuxOoO7glrfrEdBKFHMir4b9GKj-a6V9zAps7E_o'
const supabase = createClient(supabaseUrl, supabaseKey)

async function searchPeople(nameInput, licenseInput) {
    let query = supabase
        .from('People')
        .select('*')
        .ilike('Name', `%${nameInput}%`)
        .ilike('LicenseNumber', `%${licenseInput}%`);

    const { data, error } = await query
    const resultDiv = document.getElementById('results');

    if (error) {
        console.log('error', error);
        resultDiv.innerHTML = `<p>An error occurred. Please try again.</p>`;
        resultDiv.classList.remove('multiple-results');
    } 
    else if (data.length === 0){
        console.log('no data', data);
        resultDiv.innerHTML = `<p>No results found.</p>`;
        resultDiv.classList.remove('multiple-results');
    }
    else {
        console.log('data', data);
        let resultsHTML = data.map(person => `
            <div class="person-result">
                <p><strong>Name:</strong> ${person.Name}</p>
                <p><strong>Address:</strong> ${person.Address}</p>
                <p><strong>DOB:</strong> ${person.DOB}</p>
                <p><strong>Expiry Date:</strong> ${person.ExpiryDate}</p>
                <p><strong>License Number:</strong> ${person.LicenseNumber}</p>
                <p><strong>Person ID:</strong> ${person.PersonID}</p>
            </div>
        `).join('');
        resultDiv.innerHTML = resultsHTML;
        resultDiv.classList.add('multiple-results');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const nameInput = document.getElementById('name-input').value.trim();
        const licenseInput = document.getElementById('licence-input').value.trim();
        const inputLength = nameInput.length + licenseInput.length;

        if ((inputLength >= 4) && (nameInput || licenseInput)) {
            searchPeople(nameInput, licenseInput);
        } 
        else {
            const resultDiv = document.getElementById('results');
            resultDiv.innerHTML = `<p>Please enter 4 or more characters to search.</p>`;
            resultDiv.classList.remove('multiple-results');
        }
    });
});

search();