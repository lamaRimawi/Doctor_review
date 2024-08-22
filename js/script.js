const nav_tabs = document.getElementById("nav_tabs");
let doctorData = [];
var info = [];
let selectedDoctorId = null;
const myGridElement = document.querySelector('#myGrid');
let selectedCityId = null;


function createAllTab() {
    let li = document.createElement("li");
    li.className = "nav-item";
    let a = document.createElement("a");
    a.className = "nav-link text-secondary active";
    a.textContent = "All";
    a.setAttribute("data-city-id", "all");
    li.appendChild(a);
    nav_tabs.appendChild(li);


    a.addEventListener('click', function() {
        setActiveTab(a);
        selectedCityId = null;
        filterAndDisplayDoctors();
    });
}

async function get() {
    const resp = await fetch("https://66c450e2b026f3cc6ceed002.mockapi.io/api/v1/city");
    const data = await resp.json();
    return data;
}

async function getDoctors() {
    const resp = await fetch("https://66c450e2b026f3cc6ceed002.mockapi.io/api/v1/doctors");
    const data = await resp.json();
    return data;
}

get().then(data => {
    createAllTab();

    data.forEach(item => {
        let name = item.name;
        let li = document.createElement("li");
        li.className = "nav-item";
        let a = document.createElement("a");
        a.className = "nav-link text-secondary";
        a.textContent = name;
        a.setAttribute("data-city-id", item.id);
        li.appendChild(a);
        nav_tabs.appendChild(li);


        a.addEventListener('click', function() {
            setActiveTab(a);
            selectedCityId = item.id;
            filterAndDisplayDoctors();
        });
    });
});

getDoctors().then(data => {
    info = data;

    let formselect = document.getElementById("form-select");
    let categories = [...new Set(data.map(item => item.category))]; // Get unique categories
    categories.forEach(cat => {
        let option = document.createElement("option");
        option.textContent = cat;
        formselect.appendChild(option);
    });


    displayDoctors(info);
});

function setActiveTab(selectedTab) {

    const tabs = document.querySelectorAll('#nav_tabs .nav-link');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        tab.classList.remove('text-warning');
    });


    selectedTab.classList.add('active');
    selectedTab.classList.add('text-warning');

}

function displayDoctors(data) {
    let gridOptions = {
        rowData: data,
        columnDefs: [
            { field: "createdAt", headerName: "Created At", filter: "agDateColumnFilter", sortable: true },
            { field: "name", headerName: "Name", filter: "agTextColumnFilter", sortable: true },
            { field: "category", headerName: "Category", filter: "agTextColumnFilter", sortable: true },
            { field: "rating", headerName: "Rating", filter: "agNumberColumnFilter", sortable: true },
            { field: "id", headerName: "ID" },
            { field: "cityId", headerName: "City ID" }
        ],
        defaultColDef: {
            filter: true,
            floatingFilter: true,
        },
        onRowClicked: function (event) {
            selectedDoctorId = event.data.id;
            window.location.href = `overview.html?id=${selectedDoctorId}`;
        },
        rowSelection: "multiple",
        suppressRowClickSelection: true,
        pagination: true,
        paginationPageSize: 10,
        paginationPageSizeSelector: [10, 25, 50],
    };


    myGridElement.innerHTML = "";
    agGrid.createGrid(myGridElement, gridOptions);
}

function filterAndDisplayDoctors() {
    let form_select = document.getElementById("form-select").value;
    let input_search = document.getElementById("input_search").value.toLowerCase();

    let filteredData = info.filter(doctor => {
        const matchesName = doctor.name.toLowerCase().includes(input_search);
        const matchesCreatedAt = doctor.createdAt.toLowerCase().includes(input_search);
        const matchesCategory = form_select === "Category" || doctor.category === form_select;
        const matchesCity = selectedCityId === null || selectedCityId === "all" || doctor.cityId === selectedCityId;
        return (matchesName || matchesCreatedAt) && matchesCategory && matchesCity;
    });

    displayDoctors(filteredData);
}

var btn_search = document.getElementById("btn_search");

btn_search.addEventListener("click", function (e) {
    e.preventDefault();
    filterAndDisplayDoctors();
});

var username = localStorage.getItem("username");
var user = document.getElementById("user");
if (username) {
    user.innerHTML = username;
}
