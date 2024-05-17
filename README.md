# comp1004-coursework-2024
A front end built using HTML/CSS/JavaScript that connects a database and allows users to query and update the database.

<https://psyjo4.github.io/comp1004-coursework-2024/pages/people.html>

## Description of Additional Work

### HTML
- **Head**: Added meta tags to improve SEO and responsiveness.
- **Content**: Structured the main content area using semantic HTML tags (`<header>`, `<nav>`, `<aside>`, `<main>`, `<footer>`).
- **Line 9**: Removed the favicon link as it would fail the test because they are not check if the href is type rel="stylesheet"!

### CSS
- **Line 1**: Defined CSS variables for consistent theming.
- **Line 10**: Applied global styles for scrollbar customization.
- **Line 14**: Set background color and font properties for the body.
- **Line 22**: Implemented CSS Grid for layout in the `#container` element.
- **Line 31**: Added margin, padding, and border to header, sidebar, main content, and footer.
- **Line 43**: Used Flexbox for navigation links to ensure responsive design.
- **Line 94**: Added responsive design using media queries for screens less than 500px.
- **Line 130**: Added specific styles for elements inside the `#results` container to adjust spacing and alignment.

### JavaScript
- **File**: `people.js`
  - **Line 1**: Initialized Supabase client.
  - **Line 10**: Implemented the `searchPeople` function to query the database based on name or license number.
  - **Line 33**: Added error handling and dynamic message updates for search results.
  - **Line 50**: Added event listener for form submission to trigger the search functionality and validate inputs.

- **File**: `add-vehicle.js`
  - **Line 1**: Initialized Supabase client.
  - **Line 10**: Added event listener for form submission to handle adding a vehicle.
  - **Line 13**: Implemented the `addVehicle` function to add a vehicle to the database.
  - **Line 15**: Checked if the owner exists in the database and handled the scenario where the owner needs to be added.
  - **Line 19**: Displayed a form to add owner details if the owner does not exist.
  - **Line 40**: Implemented the `addPerson` function to add a new owner to the database.
  - **Line 60**: Combined vehicle and owner addition with proper error handling and messaging.

- **File**: `vehicle-search.js`
  - **Line 1**: Initialized Supabase client.
  - **Line 10**: Implemented the `searchVehicle` function to query the database based on vehicle registration number.
  - **Line 35**: Added error handling and dynamic message updates for search results.
  - **Line 50**: Added event listener for form submission to trigger the search functionality and validate inputs.

## Playwright Testing Issues
### Issue Description
During Playwright testing, the following issue was encountered:

1. **Test**: `coursework-sample.spec.js:70:1 › same external css for all html pages`
   - **Issue**: The test is encounters two <link> elements and is unsure which one to check. This happens if I have both a favicon link and a stylesheet link in your HTML.
   - **Suggested changes**: Ajusts the test to check the link type rel="stylesheet" not just href...
    ```javascript
    const cssLink = await page.locator('link[rel="stylesheet"]').getAttribute('href');
    ```

2. **Test**: `coursework-sample.spec.js:93:1 › header should have padding 10px, margin 10px, and border 1px solid black`
    - **Suggested changes**: I managed to change my CSS code to pass this test; however, I feel it limited the creativity of the styling... also because the complete requirements were given to use so late, I had to redo my whole website styling. I have attached a screenshot of my website before these restrictions.
    - **Original Styling**:
    ![Screenshot-1](/images/Screenshot%202024-05-17%20at%2012.50.12.png)
    ![Screenshot-2](/images/Screenshot%202024-05-17%20at%2012.50.19.png)
