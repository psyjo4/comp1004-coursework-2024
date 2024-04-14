import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://eywvespkrnkoeixdzccf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5d3Zlc3Brcm5rb2VpeGR6Y2NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxMDY5MTEsImV4cCI6MjAyNzY4MjkxMX0.xYxfuxOoO7glrfrEdBKFHMir4b9GKj-a6V9zAps7E_o'
const supabase = createClient(supabaseUrl, supabaseKey)

async function searchVehicleByRegistrationNumber(registrationNumber) {
    const { data, error } = await supabase
        .from('Vehicles')
        .select(`
            VehicleID,
            Make,
            Model,
            Colour,
            Owner:People!OwnerID (
                Name,
                LicenseNumber
            )
        `)
        .ilike('VehicleID', `%${registrationNumber}%`);

    const resultsDiv = document.getElementById('results');

    if (error) {
        resultsDiv.textContent = 'An error occurred. Please try again.';
        resultsDiv.classList.remove('multiple-results');
    } else if (data.length === 0) {
        resultsDiv.textContent = 'No results found.';
        resultsDiv.classList.remove('multiple-results');
    } else {
        const vehicle = data[0];
        resultsDiv.innerHTML = `
            <p><strong>Make:</strong> ${vehicle.Make}</p>
            <p><strong>Model:</strong> ${vehicle.Model}</p>
            <p><strong>Colour:</strong> ${vehicle.Colour}</p>
            ${vehicle.Owner ? `
                <p><strong>Owner's Name:</strong> ${vehicle.Owner.Name}</p>
                <p><strong>License Number:</strong> ${vehicle.Owner.LicenseNumber}</p>
            ` : '<p><strong>Owner:</strong> Unknown</p>'}
        `;
        resultsDiv.classList.add('multiple-results');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('vehicle-search-form');
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const registrationNumber = document.getElementById('registration-number').value.trim();
        
        if ((registrationNumber.length >= 4)) {
            searchVehicleByRegistrationNumber(registrationNumber);
        } 
        else {
            const resultDiv = document.getElementById('results');
            resultDiv.innerHTML = `<p>Please enter 4 or more characters to search.</p>`;
            resultDiv.classList.remove('multiple-results');
        }
    });
});
