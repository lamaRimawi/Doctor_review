async function getDoctorDetails(id) {
    const response = await fetch(`https://66c450e2b026f3cc6ceed002.mockapi.io/api/v1/doctors/${id}`);
    return await response.json();
}

// async function getDoctorReviews(id) {
//     const response = await fetch(`https://66c450e2b026f3cc6ceed002.mockapi.io/api/v1/reviews?doctorId=${id}`);
//     return await response.json();
// }

async function loadDoctorPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const doctorId = urlParams.get('id');

    if (!doctorId) {
        alert('No doctor ID provided');
        return;
    }

    const doctor = await getDoctorDetails(doctorId);
    // const reviews = await getDoctorReviews(doctorId);
    const username = localStorage.getItem('username');


    const doctorInfo = document.getElementById('doctorInfo');
    doctorInfo.innerHTML = `
        <h2>${doctor.name}</h2>
        <p><strong>Category:</strong> ${doctor.category}</p>
        <p><strong>Created At:</strong> ${doctor.createdAt}</p>
        <p><strong>Rating:</strong> ${doctor.rating}</p>
        <p><strong>Rating note:</strong> ${doctor.ratingNote}</p>
        <p><strong>City ID:</strong> ${doctor.cityId}</p>
    `;


    const reviewsSection = document.getElementById('reviews');
    reviewsSection.innerHTML = `
        <h3>Reviews</h3>
        ${username ? '<button id="reviewButton" class="btn btn-primary">Add Review</button>' : ''}
        <ul class="list-group">
            ${doctorInfo.map(review => `
                <li class="list-group-item">
                    <strong>${review.reviewerName}</strong> - ${review.createdAt}
                    <div>
                        Rating: ${review.rating} stars
                        <a href="#" class="float-right" data-bs-toggle="modal" data-bs-target="#reviewDialog" data-notes="${review.ratingNote}">View Notes</a>
                    </div>
                </li>
            `).join('')}
        </ul>
    `;


    $('#reviewDialog').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget);
        const notes = button.data('notes');
        const modal = $(this);
        modal.find('#reviewNotes').text(notes);
    });


    const reviewButton = document.getElementById('reviewButton');
    if (reviewButton) {
        reviewButton.addEventListener('click', function () {

        });
    }
}

loadDoctorPage();
