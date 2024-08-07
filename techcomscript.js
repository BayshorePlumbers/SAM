document.addEventListener('DOMContentLoaded', function() {
    const inputFields = document.querySelectorAll('input');
    const printButton = document.getElementById('printButton');
    const toggleSwitch = document.getElementById('toggleSwitch');
    const oe = document.getElementById('oe');

    // Prevent negative values in Other Expenses field
    oe.addEventListener('input', function() {
        if (parseFloat(oe.value) < 0) {
            alert("Other Expenses cannot be negative.");
            oe.value = 0;
        }
    });

    // Define the calculateCommission function
    function calculateCommission() {
        const tp = parseFloat(document.getElementById('tp').value) || 0;
        const material = parseFloat(document.getElementById('material').value) || 0;
        const oe = parseFloat(document.getElementById('oe').value) || 0;
        const day1 = parseFloat(document.getElementById('day1').value) || 0;
        const day2 = parseFloat(document.getElementById('day2').value) || 0;
        const day3 = parseFloat(document.getElementById('day3').value) || 0;
        const day4 = parseFloat(document.getElementById('day4').value) || 0;
        const day5 = parseFloat(document.getElementById('day5').value) || 0;
        const ah = parseFloat(document.getElementById('ah').value) || 0;
        const toh = parseFloat(document.getElementById('toh').value) || 0;
        const pd = parseFloat(document.getElementById('pd').value) || 0;

        const totalHours = day1 + day2 + day3 + day4 + day5 + ah + (1.5 * toh);
        document.getElementById('totalHours').value = totalHours;

        const grossAmount = tp - (material * 1.2) - (totalHours * 75) - oe;
        let finalPrice;

            if (toggleSwitch.checked) {
                finalPrice = 0.22848 * grossAmount;
            } else {
                finalPrice = 0.21191 * grossAmount;
            }
        const grossProfit = grossAmount - finalPrice;
        const overheads = pd * 246;
        const profit = grossProfit - overheads + (material * 1.2 * 0.1667) + (totalHours * 75 * 0.4);

        let profper = 0;
        if (tp !== 0) {
            profper = ((profit / tp) * 100).toFixed(2);
        }

        let t1;
        
            if (toggleSwitch.checked) {
                t1 = 0.22848 * grossAmount;
            } else {
                t1 = 0.21191 * grossAmount;
            }
        const t2 = 0.151011 * grossAmount;
        const t3 = 0.099331 * grossAmount;
        const t4 = "$18 Per Hour";
        const sw = ((material * 1.2) / tp) || 0;
        const wh = (material * 1.2) / tp || 0;
        const rd = (material * 1.2) / tp || 0;

        document.getElementById('finalPrice').textContent = '$' + finalPrice.toFixed(2);
        document.getElementById('grossAmount').textContent = '$' + grossAmount.toFixed(2);
        document.getElementById('grossProfit').textContent = '$' + grossProfit.toFixed(2);
        document.getElementById('overheads').textContent = '$' + overheads.toFixed(2);
        document.getElementById('profit').textContent = '$' + profit.toFixed(2);
        document.getElementById('profper').textContent = profper + '%';
        document.getElementById('t1').value = '$' + t1.toFixed(2);
        document.getElementById('t2').value = '$' + t2.toFixed(2);
        document.getElementById('t3').value = '$' + t3.toFixed(2);
        document.getElementById('t4').value = t4;
        document.getElementById('sw').value = sw.toFixed(2);
        document.getElementById('wh').value = wh.toFixed(2);
        document.getElementById('rd').value = rd.toFixed(2);
        // Set the bpp field to the profit percentage
        document.getElementById('bpp').value = profper + '%';
}

    // Add event listener for each input field to trigger calculation on input change
    inputFields.forEach(input => {
        input.addEventListener('input', calculateCommission);
    });

    // Calculate commission when the page loads
    calculateCommission();

    // Add event listener for the print button
    printButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default behavior

        // Ensure the values are correctly fetched before opening the print window
        const technicianName = document.getElementById('tn').value;
        const notes = document.getElementById('notes').value;
        const jobAddress = document.getElementById('ja').value;
        const totalPrice = document.getElementById('tp').value;
        const materialExpenses = document.getElementById('material').value;
        const oe = document.getElementById('oe').value;
        const projectHours = document.getElementById('pd').value;
        const day1 = document.getElementById('day1').value;
        const day2 = document.getElementById('day2').value;
        const day3 = document.getElementById('day3').value;
        const day4 = document.getElementById('day4').value;
        const day5 = document.getElementById('day5').value;
        const additionalHours = document.getElementById('ah').value;
        const overtimeHours = document.getElementById('toh').value;
        const totalHours = document.getElementById('totalHours').value;
        const tier1 = document.getElementById('t1').value;
        const tier2 = document.getElementById('t2').value;
        const tier3 = document.getElementById('t3').value;
        const tier4 = document.getElementById('t4').value;
        const sw = document.getElementById('sw').value;
        const wh = document.getElementById('wh').value;
        const rd = document.getElementById('rd').value;
        const commission = document.getElementById('finalPrice').textContent;
        const invoiceNumber = document.getElementById('in').value;
        const priceBookJobCode = document.getElementById('pbtc').value;
        const bpp = document.getElementById('bpp').value;
        //const tech1 = document.getElementById('tech1').textContent;
        //const tech2 = document.getElementById('tech2').textContent;
        const grossAmount = document.getElementById('grossAmount').textContent;
        const grossProfit = document.getElementById('grossProfit').textContent;
        const overheads = document.getElementById('overheads').textContent;
        const profit = document.getElementById('profit').textContent;
        const profper = document.getElementById('profper').textContent;

        // Adjust the logo size for printing
        const logoImage = document.querySelector('.logo-container img');
        logoImage.style.width = '200px'; // Adjust as needed
        logoImage.style.height = 'auto'; // Maintain aspect ratio
        
        // Create the HTML content for the print window
        let htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>TECHNICIAN POTENTIAL COMMISSION</title>
                <style>
                    .logo-container img {
                        width: 200px; /* Adjust the width as needed */
                        height: auto; /* Maintain aspect ratio */
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="logo-container">
                        <img src="BP.png" alt="BP logo">
                    </div>
                    <h2>TECHNICIAN COMMISSION CALCULATOR</h2>
                    <div class="details-section">
                    <h3>DETAILS:</h3>
                    <table>
                        <tr><th>Technician's Name:</th><td>${technicianName}</td></tr>
                        <tr><th>Invoice Number:</th><td>${invoiceNumber}</td></tr>
                        <tr><th>Job Address:</th><td>${jobAddress}</td></tr>
                        <tr><th>Price Book Job Code:</th><td>${priceBookJobCode}</td></tr>
                        <tr><th>Project Hours:</th><td>${projectHours}</td></tr>
                        <tr><th>Material Expenses:</th><td>${materialExpenses}</td></tr>
                        <tr><th>Other Expenses:</th><td>${oe}</td></tr>
                        <tr><th>Total Price:</th><td>${totalPrice}</td></tr>
                        <tr><th>Notes:</th><td>${notes}</td></tr>
                    </table>
                    </div>
                    <div class="labor-details-section">
                        <h3>LABOR DETAILS:</h3>
                        <table>
                            <tr>
                                <th>Day 1</th><th>Day 2</th><th>Day 3</th><th>Day 4</th><th>Day 5</th>
                            </tr>
                            <tr>
                                <td>${day1}</td><td>${day2}</td><td>${day3}</td><td>${day4}</td><td>${day5}</td>
                            </tr>
                            <tr>
                                <th>Additional Hours</th><th>Overtime Hours</th><th>Total Hours</th>
                            </tr>
                            <tr>
                                <td>${additionalHours}</td><td>${overtimeHours}</td><td>${totalHours}</td>
                            </tr>
                        </table>
                    </div>
                    <h3>FOR OFFICE USE ONLY:</h3>
                    <table>
                        <tr>
                            <th>SW21/RP21</th><th>WH32</th><th>RD15/UL15</th><th>Z.SS</th><th>BPP%</th>
                        </tr>
                        <tr>
                            <td>${sw}</td><td>${wh}</td><td>${rd}</td><td>${bpp}</td>
                        </tr>
                    </table>
                    <div class="commission-details-section">
                    <h3>COMMISSION DETAILS:</h3>
                    <table>
                        <tr><th>Technician Commission:</th><td>${commission}</td></tr>
                        <tr><th>Gross Amount:</th><td>${grossAmount}</td></tr>
                        <tr><th>Gross Profit:</th><td>${grossProfit}</td></tr>
                        <tr><th>Overheads:</th><td>${overheads}</td></tr>
                        <tr><th>Profit:</th><td>${profit}</td></tr>
                        <tr><th>Profit %age:</th><td>${profper}</td></tr>
                    </table>
                    </div>
                </div>
            </body>
            </html>
        `;

         // Open a new tab for printing
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(htmlContent);
        printWindow.document.close();

        // Trigger the print dialog
        printWindow.print();

        // Wait for the content to be loaded before printing
        //printWindow.onload = function() {
        //    printWindow.print();
    });
})    