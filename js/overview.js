async function getDoctorDetails(id) {
    const response = await fetch(`https://66c450e2b026f3cc6ceed002.mockapi.io/api/v1/doctors/${id}`);
    return await response.json();
}

async function loadDoctorPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const doctorId = urlParams.get('id');

    if (!doctorId) {
        alert('No doctor ID provided');
        return;
    }

    const doctor = await getDoctorDetails(doctorId);
    const username = localStorage.getItem('username');

    const images = [
        "../image/7309673.jpg",
        "../image/7294791.jpg",
        "../image/7309681.jpg",
        "../image/images.jfif"
    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];

    function generateStarRating(rating) {
        const fullStar = '<span class="fa fa-star checked" style="color: red;"></span>';
        const emptyStar = '<span class="fa fa-star"></span>';
        let stars = '';

        for (let i = 0; i < Math.floor(rating); i++) {
            stars += fullStar;
        }

        if (rating % 1 !== 0) {
            stars += '<span class="fa fa-star-half-alt" style="color: gold;"></span>';
        }

        for (let i = Math.ceil(rating); i < 5; i++) {
            stars += emptyStar;
        }

        return stars;
    }

   const doctorInfo = document.getElementById('doctorInfo');
doctorInfo.innerHTML = `
    <div class="card mb-3 info d-flex flex-column flex-md-row">
        <div class="col-auto text-center">
            <img class="card-img-left img-fluid" src="${randomImage}" alt="Doctor Image" style="max-width: 300px;">
            
        </div>
        <div class="card-body">
            <h3 class="card-title">${doctor.name}</h3>
         
<pre class="card-text" data-bs-toggle="tooltip" data-bs-placement="top" title="More details about the category"><strong style="font-size: 20px">Category: </strong> ${doctor.category}</pre>

            <pre class="card-text"><strong style="font-size: 20px">Rating: </strong>${generateStarRating(doctor.rating)}</pre>
            <pre class="card-text"><strong style="font-size: 20px">Date: </strong> ${doctor.createdAt}</pre>
            <p class="card-text "><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
    </div>
`;

const reviewsSection = document.getElementById('reviews');
reviewsSection.innerHTML = `
    <div class="card mb-3 shadow mt-5 rev"> 
        <div class="card-body">
            <h3 class="card-title" ><strong>Reviews</strong></h3>
            <pre class="card-text"><strong>Rating: </strong>${generateStarRating(doctor.rating)}</pre>
            <button id="reviewButton" class="btn btn-secondary" data-toggle="modal" data-target="#reviewDialog">Add Review</button>
        </div>
    </div>
`;

}

loadDoctorPage();
document.addEventListener('DOMContentLoaded', function () {
    let selectedRating = 0;


    document.querySelectorAll('#ratingStars .fa-star').forEach(function(star) {
        star.addEventListener('click', function() {
            selectedRating = this.getAttribute('data-value');
            highlightStars(selectedRating);
            validateForm();
        });
    });

    function highlightStars(rating) {
        document.querySelectorAll('#ratingStars .fa-star').forEach(function(star) {
            star.classList.remove('checked');
            if (star.getAttribute('data-value') <= rating) {
                star.classList.add('checked');
            }
        });
    }

    function validateForm() {
        const submitButton = document.getElementById('submitReviewButton');
        if (selectedRating > 0) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }




  document.getElementById('submitReviewButton').addEventListener('click', async function() {
    const reviewText = document.getElementById('reviewText').value;
    const doctorId = new URLSearchParams(window.location.search).get('id');
    const reviewData = {
        doctorId: doctorId,
        rating: selectedRating,
        text: reviewText || '',
    };

    try {
        const response = await fetch(`https://66c450e2b026f3cc6ceed002.mockapi.io/api/v1/doctors?${doctorId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        });

        if (response.ok) {
            console.log('Review Submitted Successfully:', reviewData);

        } else {
            console.error('Failed to submit review:', response.statusText);
            alert('Failed to submit review. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting review:', error);
        alert('Error submitting review. Please check your network connection and try again.');
    }


        console.log('Review Submitted:', reviewData);


        selectedRating = 0;
        highlightStars(selectedRating);
        document.getElementById('reviewForm').reset();
        validateForm();


        $('#reviewDialog').modal('hide');
    });


    validateForm();
});






