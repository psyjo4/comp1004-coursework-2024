import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://eywvespkrnkoeixdzccf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5d3Zlc3Brcm5rb2VpeGR6Y2NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxMDY5MTEsImV4cCI6MjAyNzY4MjkxMX0.xYxfuxOoO7glrfrEdBKFHMir4b9GKj-a6V9zAps7E_o'
const supabase = createClient(supabaseUrl, supabaseKey)

/*                                   *
 * ========== Add Vehicle ========== *
 *                                   */
document.addEventListener('DOMContentLoaded', () => {
    const addVehicleForm = document.getElementById('add-vehicle-form');
    addVehicleForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const rego = document.getElementById('rego').value.trim();
        const make = document.getElementById('make').value.trim();
        const model = document.getElementById('model').value.trim();
        const colour = document.getElementById('colour').value.trim();
        const owner = document.getElementById('owner').value.trim();
        const messageDiv = document.getElementById('message');
        const addOwnerDiv = document.getElementById('add-owner');

        if (!rego || !make || !model || !colour || !owner) {
            messageDiv.textContent = 'Error: All fields are required.';
            return;
        }

        // Check if owner exists
        const { data: ownerData, error: ownerError } = await searchPersonByName(owner);
        if (ownerError) {
            messageDiv.textContent = 'Error: When checking owner.';
            return;
        }

        if (ownerData.length === 0) {
            // Owner does not exist, prompt to add owner
            messageDiv.textContent = 'Owner does not exist. Please add the owner.';
            addOwnerDiv.innerHTML = `
                <form id="add-owner-form">
                    <label for="personid">Person ID:</label>
                    <input type="text" id="personid" name="personid" required>
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>
                    <label for="address">Address:</label>
                    <input type="text" id="address" name="address" required>
                    <label for="dob">Date of Birth:</label>
                    <input type="date" id="dob" name="dob" required>
                    <label for="license">License Number:</label>
                    <input type="text" id="license" name="license" required>
                    <label for="expire">License Expiry Date:</label>
                    <input type="date" id="expire" name="expire" required>
                </form>
                <button type="button" id="add-owner-button">Add owner</button>
            `;

            const addOwnerButton = document.getElementById('add-owner-button');
            addOwnerButton.addEventListener('click', async () => {
                const personid = document.getElementById('personid').value.trim();
                const name = document.getElementById('name').value.trim();
                const address = document.getElementById('address').value.trim();
                const dob = document.getElementById('dob').value.trim();
                const license = document.getElementById('license').value.trim();
                const expire = document.getElementById('expire').value.trim();

                if (!personid || !name || !address || !dob || !license || !expire) {
                    messageDiv.textContent = 'Error: All fields are required.';
                    return;
                }

                const { data: personData, error: personError } = await addPerson({
                    PersonID: personid,
                    Name: name,
                    Address: address,
                    DOB: dob,
                    LicenseNumber: license,
                    ExpiryDate: expire
                });

                if (personError) {
                    messageDiv.textContent = 'Error adding owner.';
                    return;
                }

                // Now add the vehicle with the new owner
                const { data: vehicleData, error: vehicleError } = await addVehicle({
                    VehicleID: rego,
                    Make: make,
                    Model: model,
                    Colour: colour,
                    OwnerID: personid
                });

                if (vehicleError) {
                    messageDiv.textContent = 'Error adding vehicle.';
                    return;
                }

                messageDiv.textContent = 'Vehicle added successfully';
            });
        } else {

            // Owner exists, add the vehicle
            const { data: vehicleData, error: vehicleError } = await addVehicle({
                VehicleID: rego,
                Make: make,
                Model: model,
                Colour: colour,
                OwnerID: ownerData[0].PersonID
            });

            if (vehicleError) {
                messageDiv.textContent = 'Error adding vehicle.';
                return;
            }

            messageDiv.textContent = 'Vehicle added successfully';
        }
    });
});

async function addVehicle(vehicle) {
    const { data, error } = await supabase
        .from('Vehicles')
        .insert(vehicle);

    return { data, error };
}

async function addPerson(person) {
    const { data, error } = await supabase
        .from('People')
        .insert(person);

    return { data, error };
}

async function searchPersonByName(name) {
    const { data, error } = await supabase
        .from('People')
        .select('*')
        .eq('Name', name);

    return { data, error };
}
