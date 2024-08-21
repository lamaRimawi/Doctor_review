const nav_tabs = document.getElementById("nav_tabs");
let doctorData = [];
var info=[];
let selectedDoctorId = null;
    const myGridElement = document.querySelector('#myGrid');

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

    data.forEach(item => {

        let name = item.name;
        let li = document.createElement("li");
        li.className = "nav-item";
        let a = document.createElement("a");
        a.className = "nav-link text-muted";
        a.textContent = name;
        li.appendChild(a);
        nav_tabs.appendChild(li);
    });
});

getDoctors().then(data => {
    let formselect = document.getElementById("form-select");
    data.forEach(item => {
         info.push(item)
        let cat = item.category;
        let option = document.createElement("option");
        option.textContent = cat;
        formselect.appendChild(option);
    });
var gridOptions = {
        rowData: info,
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

var btn_search= document.getElementById("btn_search");

    agGrid.createGrid(myGridElement, gridOptions);


});
console.log(window.info);


btn_search.addEventListener("click",function (e){

e.preventDefault();
var form_select = document.getElementById("form-select").value;
var input_search = document.getElementById("input_search").value.toLowerCase();


        let filteredData = info.filter(doctor => {
            const matchesName = doctor.name.toLowerCase().includes(input_search);
            const matchesCreatedAt = doctor.createdAt.toLowerCase().includes(input_search);
            const matchesCategory = form_select === "Category" || doctor.category === form_select;
            return (matchesName || matchesCreatedAt) && matchesCategory;
        });

     gridOptions = {
        rowData: filteredData,
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
     console.log(filteredData);

myGridElement.innerHTML="";
agGrid.createGrid(myGridElement, gridOptions);




})
  var username = localStorage.getItem("username");
var user = document.getElementById("user");
if(username){
    user.innerHTML=username;
}






