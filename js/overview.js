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
        <div class="card mb-3 bg-warning">
            <img class="card-img-top" src="${randomImage}" alt="Card image cap">
            <div class="card-body">
                <h3 class="card-title">${doctor.name}</h3>
                <pre class="card-text"><strong>Category: </strong> ${doctor.category}</pre>
                <pre class="card-text"><strong>Rating: </strong>${generateStarRating(doctor.rating)}</pre>
                <pre class="card-text"><strong>Date: </strong> ${doctor.createdAt}</pre>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
    `;

    const reviewsSection = document.getElementById('reviews');


reviewsSection.innerHTML = `
    <div class="card mb-3 bg-warning">
        <div class="card-body">
            <h3 class="card-title">Reviews</h3>
            <pre class="card-text"><strong>Rating: </strong>${generateStarRating(doctor.rating)}</pre>
            <button id="reviewButton" class="btn btn-secondary" data-toggle="modal" data-target="#reviewDialog">Add Review</button>
        </div>
    </div>
`;

}



loadDoctorPage();
