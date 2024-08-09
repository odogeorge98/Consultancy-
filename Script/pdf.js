function filterReports() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const reports = document.querySelectorAll('#pdfList .col-md-4');

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



document.addEventListener("DOMContentLoaded", function () {
    const reportsPerPage = 8; // Display 8 reports per page
    const pdfItems = document.querySelectorAll('#pdfList .col-6'); // Select all report items
    const totalReports = pdfItems.length;
    const totalPages = Math.ceil(totalReports / reportsPerPage); // Calculate total number of pages
    const pagination = document.getElementById('pagination');

    function showPage(page) {
        const start = (page - 1) * reportsPerPage;
        const end = start + reportsPerPage;

        // Hide all items first
        pdfItems.forEach((item, index) => {
            item.style.display = 'none';
        });

        // Show the relevant items for the current page
        pdfItems.forEach((item, index) => {
            if (index >= start && index < end) {
                item.style.display = 'block';
            }
        });
    }

    function createPagination() {
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.className = 'page-item';
            pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            pageItem.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelectorAll('.pagination .page-item').forEach(item => {
                    item.classList.remove('active');
                });
                pageItem.classList.add('active');
                showPage(i);
            });
            pagination.appendChild(pageItem);
        }
    }

    // Initialize the pagination
    createPagination();
    showPage(1); // Show the first page by default
    pagination.firstElementChild.classList.add('active'); // Set the first page link as active
});
