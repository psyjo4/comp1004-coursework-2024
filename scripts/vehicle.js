import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://eywvespkrnkoeixdzccf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5d3Zlc3Brcm5rb2VpeGR6Y2NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxMDY5MTEsImV4cCI6MjAyNzY4MjkxMX0.xYxfuxOoO7glrfrEdBKFHMir4b9GKj-a6V9zAps7E_o'
const supabase = createClient(supabaseUrl, supabaseKey)

/*                                      *
 * ========== Vehicle Search ========== *
 *                                      */
async function searchVehicle(registrationNumber) {
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
    const messageDiv = document.getElementById('message');

    if (error) {
        console.log('error', error);
        messageDiv.textContent = 'Error';
    } 
    else if (data.length === 0) {
        console.log('no data', data);
        messageDiv.textContent = 'No result found';
    }
    else {
        console.log('data', data);
        const vehicle = data[0];
        resultsDiv.innerHTML = `
        <div class="result">
            <p><strong>Make:</strong> ${vehicle.Make}</p>
            <p><strong>Model:</strong> ${vehicle.Model}</p>
            <p><strong>Colour:</strong> ${vehicle.Colour}</p>
            ${vehicle.Owner ? `
                <p><strong>Owner's Name:</strong> ${vehicle.Owner.Name}</p>
                <p><strong>License Number:</strong> ${vehicle.Owner.LicenseNumber}</p>
            ` : '<p><strong>Owner:</strong> Unknown</p>'}
        </div>`;
        messageDiv.textContent = 'Search successful';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('vehicle-search-form');
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const registrationNumber = document.getElementById('rego').value.trim();
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = '';

        if (!registrationNumber) {
            messageDiv.textContent = 'Error';
            return
        }

        searchVehicle(registrationNumber);
    });
});