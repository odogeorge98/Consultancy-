let allFiles = []; // To store all fetched files
const limit = 8; // Number of PDFs per page

// Function to fetch all PDFs
function fetchAllPDFs() {
    fetch('http://localhost:8080/api/files')
        .then(response => response.json())
        .then(data => {
            allFiles = data.files; // Store all files
            fetchPDFs(1); // Fetch the first page of PDFs
        })
        .catch(error => {
            console.error('Error fetching all PDFs:', error);
        });
}

// Function to fetch and display PDFs for the current page
function fetchPDFs(page) {
    console.log('Fetching page:', page); // Debugging log

    // Calculate slice indices
    const start = (page - 1) * limit;
    const end = start + limit;
    const filesToDisplay = allFiles.slice(start, end);

    // Update PDF list
    const pdfList = document.getElementById('pdfList');
    pdfList.innerHTML = ''; // Clear existing items

    filesToDisplay.forEach(file => {
        const listItem = document.createElement('div');
        listItem.classList.add('col-6', 'col-md-4', 'col-lg-3', 'mb-4');
        
        listItem.innerHTML = `
            <div class="pdf-download text-center p-3 shadow-sm" style="background-color: rgb(255, 255, 255);">
                <img src="../Resources/Imgs/pdf.png" alt="PDF Icon" class="img-fluid">
                <h5 class="mt-3">${file.title}</h5>
                <p class="text-muted">${file.description}</p>
                <a href="../uploads/${file.name}" download class="btn btn-primary mt-2">
                    <i class="fas fa-download me-2"></i>Download PDF
                </a>
            </div>
        `;
        pdfList.appendChild(listItem);
    });

    // Update pagination controls
    updatePaginationControls(page);
}

// Function to update pagination controls
function updatePaginationControls(currentPage) {
    const totalPages = Math.ceil(allFiles.length / limit);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    // Previous Page Link
    if (currentPage > 1) {
        const prevItem = document.createElement('li');
        prevItem.classList.add('page-item');
        prevItem.innerHTML = `<a class="page-link" href="#" onclick="fetchPDFs(${currentPage - 1}); return false;">Previous</a>`;
        pagination.appendChild(prevItem);
    } else {
        const prevItem = document.createElement('li');
        prevItem.classList.add('page-item', 'disabled');
        prevItem.innerHTML = `<span class="page-link">Previous</span>`;
        pagination.appendChild(prevItem);
    }

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item', currentPage === i ? 'active' : '');
        pageItem.innerHTML = `<a class="page-link" href="#" onclick="fetchPDFs(${i}); return false;">${i}</a>`;
        pagination.appendChild(pageItem);
    }

    // Next Page Link
    if (currentPage < totalPages) {
        const nextItem = document.createElement('li');
        nextItem.classList.add('page-item');
        nextItem.innerHTML = `<a class="page-link" href="#" onclick="fetchPDFs(${currentPage + 1}); return false;">Next</a>`;
        pagination.appendChild(nextItem);
    } else {
        const nextItem = document.createElement('li');
        nextItem.classList.add('page-item', 'disabled');
        nextItem.innerHTML = `<span class="page-link">Next</span>`;
        pagination.appendChild(nextItem);
    }
}

// Function to filter reports based on the search input
function filterReports() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const reports = document.querySelectorAll('#pdfList .pdf-download');

    reports.forEach(report => {
        const title = report.querySelector('h5').textContent.toLowerCase();
        const description = report.querySelector('p').textContent.toLowerCase();
        if (title.includes(searchInput) || description.includes(searchInput)) {
            report.style.display = 'block';
        } else {
            report.style.display = 'none';
        }
    });
}

// Initialize the page by fetching all PDFs and setting up event listeners
document.addEventListener("DOMContentLoaded", function () {
    fetchAllPDFs(); // Fetch all PDFs on page load

    // Attach filter function to the search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', filterReports);
});
