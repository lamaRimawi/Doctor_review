
function highlightStars(rating) {
    document.querySelectorAll('#ratingStars .fa-star').forEach(function(star) {
        star.classList.remove('checked');
        if (star.getAttribute('data-value') <= rating) {
            star.classList.add('checked');
        }
    });
}


function showUserReview(doctorId, username,selectedRating) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const review = reviews.find(r => r.doctorId === doctorId && r.username === username);

    if (review) {
        const reviewCard = document.getElementById('userReviewCard');
        const reviewTextElement = reviewCard.querySelector('.card-text');
        const reviewStarsElement = reviewCard.querySelector('.review-stars');
    var reviewText = document.getElementById("reviewText").value;



     // let selectedRating = 0;


    // document.querySelectorAll('#ratingStars .fa-star').forEach(function(star) {
    //     star.addEventListener('click', function() {
    //         selectedRating = this.getAttribute('data-value');
    //         highlightStars(selectedRating);
    //     });
    // });


        reviewTextElement.textContent = reviewText;
        // reviewTextElement.textContent=review.text;
        reviewStarsElement.innerHTML=generateStarRating(selectedRating);
        // reviewStarsElement.innerHTML = generateStarRating(review.rating);

        const reviewCollapse = new bootstrap.Collapse(reviewCard, {
            toggle: true
        });
        reviewCollapse.show();
    } else {
        alert('No review found for this user.');
    }
}


async function getDoctorDetails(id) {
    const response = await fetch(`https://66c450e2b026f3cc6ceed002.mockapi.io/api/v1/doctors/${id}`);
    return await response.json();
}


function saveReviewLocally(review) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

    const updatedReviews = reviews.filter(r => !(r.doctorId === review.doctorId && r.username === review.username));
    updatedReviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
}


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
    const loggedIn = !!username;

    const reviewModalFooter = document.querySelector('.modal-footer');
    if (loggedIn) {
        const viewReviewButton = document.createElement('button');
        viewReviewButton.type = 'button';
        viewReviewButton.className = 'btn btn-info';
        viewReviewButton.textContent = 'View My Review';
         document.querySelectorAll('#ratingStars .fa-star').forEach(function(star) {
        star.addEventListener('click', function() {
            rate = this.getAttribute('data-value');
            highlightStars(rate);
        });
    });



        viewReviewButton.addEventListener('click', () => showUserReview(doctorId, username,rate));
        reviewModalFooter.insertBefore(viewReviewButton, reviewModalFooter.firstChild);
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];

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
                <h3 class="card-title"><strong>Reviews</strong></h3>
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


    function validateForm() {
        const submitButton = document.getElementById('submitReviewButton');
        submitButton.disabled = selectedRating <= 0;
    }

document.getElementById('submitReviewButton').addEventListener('click', function() {
    const reviewText = document.getElementById('reviewText').value;
    const doctorId = new URLSearchParams(window.location.search).get('id');
    const username = localStorage.getItem('username');
    const reviewData = {
        doctorId: doctorId,
        rating: selectedRating,
        text: reviewText || '',
        username: username,
    };


    saveReviewLocally(reviewData);

    console.log('Review Submitted:', reviewData);


    const reviewCard = document.getElementById('userReviewCard');
    const reviewTextElement = reviewCard.querySelector('.card-text');
    const reviewStarsElement = reviewCard.querySelector('.review-stars');

    reviewTextElement.textContent = reviewText;
    reviewStarsElement.innerHTML = generateStarRating(selectedRating);


    const reviewCollapse = new bootstrap.Collapse(reviewCard, {
        toggle: false
    });
    reviewCollapse.show();


    selectedRating = 0;
    highlightStars(selectedRating);
    document.getElementById('reviewForm').reset();
    validateForm();

    $('#reviewDialog').modal('hide');
});



    validateForm();
});
