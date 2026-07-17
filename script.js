//============================
// QUẢN LÝ TIẾN ĐỘ CÔNG VIỆC
//============================

let congViec = JSON.parse(localStorage.getItem("congViec")) || [

    {
        ten:"Xuất PDF",
        tienDo:100,
        nguoi:"Sang"
    },

    {
        ten:"Kiểm tra vật tư",
        tienDo:70,
        nguoi:"Hạnh"
    },

    {
        ten:"Báo giá khách hàng",
        tienDo:30,
        nguoi:"Long"
    }

];

let indexSua = -1;

let indexXoa = -1;


//============================
// KHỞI ĐỘNG
//============================

window.onload=function(){

    hienThi();

}



//============================
// HIỂN THỊ DỮ LIỆU
//============================

function hienThi(){

    let tbody=document.getElementById("tblBody");

    tbody.innerHTML="";

    let hoanThanh=0;
    let dangLam=0;
    let chuaLam=0;

    congViec.forEach(function(item,index){

        if(item.tienDo==100){

            hoanThanh++;

        }else if(item.tienDo>0){

            dangLam++;

        }else{

            chuaLam++;

        }

        let mau="bg-red";

        if(item.tienDo>=100){

            mau="bg-green";

        }else if(item.tienDo>=50){

            mau="bg-orange";

        }

        tbody.innerHTML+=`

      <tr>

    <td>${index+1}</td>

    <td>${item.ten}</td>

    <td class="status-cell">

        <label class="switch">

            <input
                type="checkbox"
                ${item.tienDo==100 ? "checked" : ""}
                onchange="doiTrangThai(${index},this.checked)">

            <span class="slider"></span>

        </label>

        <span class="status-text">
            ${item.tienDo==100 ? "✅ Đã hoàn thành" : "🟡 Đang thực hiện"}
        </span>

    </td>

    <td>${item.nguoi}</td>

    <td>
        ...
    </td>

        </tr>

        `;

    });

    document.getElementById("tongCongViec").innerHTML=congViec.length;

    document.getElementById("hoanThanh").innerHTML=hoanThanh;

    document.getElementById("dangLam").innerHTML=dangLam;

    document.getElementById("chuaLam").innerHTML=chuaLam;

    localStorage.setItem(

        "congViec",

        JSON.stringify(congViec)

    );

}
//============================
// MỞ POPUP THÊM
//============================

const modal = document.getElementById("modal");
const btnAdd = document.getElementById("btnAdd");
const btnCancel = document.getElementById("btnCancel");
const btnSave = document.getElementById("btnSave");

btnAdd.onclick = function () {

    indexSua = -1;

    document.getElementById("modalTitle").innerHTML = "Thêm công việc";

    document.getElementById("txtCongViec").value = "";
    document.getElementById("txtTienDo").value = "";
    document.getElementById("txtNguoi").value = "";

    modal.style.display = "flex";
};


//============================
// ĐÓNG POPUP
//============================

btnCancel.onclick = function () {

    modal.style.display = "none";

};


//============================
// SỬA CÔNG VIỆC
//============================

function moSua(index){

    indexSua = index;

    document.getElementById("modalTitle").innerHTML = "Sửa công việc";

    document.getElementById("txtCongViec").value =
    congViec[index].ten;

    document.getElementById("txtTienDo").value =
    congViec[index].tienDo;

    document.getElementById("txtNguoi").value =
    congViec[index].nguoi;

    modal.style.display = "flex";

}


//============================
// LƯU
//============================

btnSave.onclick = function(){

    let ten =
    document.getElementById("txtCongViec").value.trim();

    let tienDo =
    Number(document.getElementById("txtTienDo").value);

    let nguoi =
    document.getElementById("txtNguoi").value.trim();

    if(ten=="" || nguoi==""){

        alert("Vui lòng nhập đầy đủ thông tin.");

        return;

    }

    if(tienDo<0 || tienDo>100){

        alert("Tiến độ phải từ 0 đến 100%");

        return;

    }

    if(indexSua==-1){

        congViec.push({

            ten:ten,

            tienDo:tienDo,

            nguoi:nguoi

        });

    }else{

        congViec[indexSua]={

            ten:ten,

            tienDo:tienDo,

            nguoi:nguoi

        };

    }

    modal.style.display="none";

    hienThi();

}
//======================================
// XÓA CÔNG VIỆC
//======================================

const deleteModal=document.getElementById("deleteModal");

const btnDelete=document.getElementById("btnDelete");

const btnDeleteCancel=document.getElementById("btnDeleteCancel");

function moXoa(index){

    indexXoa=index;

    deleteModal.style.display="flex";

}

btnDeleteCancel.onclick=function(){

    deleteModal.style.display="none";

}

btnDelete.onclick=function(){

    congViec.splice(indexXoa,1);

    deleteModal.style.display="none";

    hienThi();

}



//======================================
// TÌM KIẾM
//======================================

document
.getElementById("txtSearch")
.addEventListener("keyup",timKiem);

function timKiem(){

    let tukhoa=document
    .getElementById("txtSearch")
    .value
    .toLowerCase();

    let rows=document.querySelectorAll("#tblBody tr");

    rows.forEach(function(row){

        let noidung=row.children[1]
        .innerText
        .toLowerCase();

        let nguoi=row.children[3]
        .innerText
        .toLowerCase();

        if(

            noidung.includes(tukhoa)

            ||

            nguoi.includes(tukhoa)

        ){

            row.style.display="";

        }else{

            row.style.display="none";

        }

    });

}



//======================================
// ĐÓNG POPUP KHI CLICK RA NGOÀI
//======================================

window.onclick=function(e){

    if(e.target==modal){

        modal.style.display="none";

    }

    if(e.target==deleteModal){

        deleteModal.style.display="none";

    }

}
//=====================================
// SẮP XẾP THEO TIẾN ĐỘ
//=====================================

function sapXepTienDo() {

    congViec.sort(function (a, b) {

        return b.tienDo - a.tienDo;

    });

    hienThi();

}


//=====================================
// CHỈ HIỂN THỊ HOÀN THÀNH
//=====================================

function locHoanThanh() {

    let rows = document.querySelectorAll("#tblBody tr");

    rows.forEach(function (row) {

        let value = parseInt(
            row.querySelector(".progress-bar").innerText
        );

        row.style.display = value == 100 ? "" : "none";

    });

}


//=====================================
// CHỈ HIỂN THỊ ĐANG LÀM
//=====================================

function locDangLam() {

    let rows = document.querySelectorAll("#tblBody tr");

    rows.forEach(function (row) {

        let value = parseInt(
            row.querySelector(".progress-bar").innerText
        );

        row.style.display =
            value > 0 && value < 100 ? "" : "none";

    });

}


//=====================================
// CHỈ HIỂN THỊ CHƯA LÀM
//=====================================

function locChuaLam() {

    let rows = document.querySelectorAll("#tblBody tr");

    rows.forEach(function (row) {

        let value = parseInt(
            row.querySelector(".progress-bar").innerText
        );

        row.style.display =
            value == 0 ? "" : "none";

    });

}


//=====================================
// HIỂN THỊ TẤT CẢ
//=====================================

function hienTatCa() {

    let rows = document.querySelectorAll("#tblBody tr");

    rows.forEach(function (row) {

        row.style.display = "";

    });

}


//=====================================
// TÍNH % TRUNG BÌNH
//=====================================

function tienDoTrungBinh() {

    if (congViec.length == 0) return 0;

    let tong = 0;

    congViec.forEach(function (item) {

        tong += item.tienDo;

    });

    return Math.round(tong / congViec.length);

}


//=====================================
// HIỂN THỊ DASHBOARD
//=====================================

function capNhatDashboard() {

    document.getElementById("tongCongViec").innerHTML =
        congViec.length;

    let xong = 0;
    let dang = 0;
    let chua = 0;

    congViec.forEach(function (item) {

        if (item.tienDo == 100) {

            xong++;

        } else if (item.tienDo == 0) {

            chua++;

        } else {

            dang++;

        }

    });

    document.getElementById("hoanThanh").innerHTML = xong;

    document.getElementById("dangLam").innerHTML = dang;

    document.getElementById("chuaLam").innerHTML = chua;

}
//======================================
// LƯU LOCAL STORAGE
//======================================

function luuDuLieu(){

    localStorage.setItem(
        "congViec",
        JSON.stringify(congViec)
    );

}


//======================================
// XÓA TOÀN BỘ
//======================================

function xoaTatCa(){

    if(confirm("Bạn có chắc muốn xóa toàn bộ công việc?")){

        congViec=[];

        luuDuLieu();

        hienThi();

    }

}


//======================================
// RESET FORM
//======================================

function resetForm(){

    document.getElementById("txtCongViec").value="";

    document.getElementById("txtTienDo").value=0;

    document.getElementById("txtNguoi").value="";

}


//======================================
// NHẤN ESC ĐỂ ĐÓNG POPUP
//======================================

document.addEventListener("keydown",function(e){

    if(e.key==="Escape"){

        modal.style.display="none";

        deleteModal.style.display="none";

    }

});


//======================================
// ENTER ĐỂ LƯU
//======================================

document.addEventListener("keydown",function(e){

    if(e.key==="Enter"){

        if(modal.style.display==="flex"){

            btnSave.click();

        }

    }

});


//======================================
// CLICK 2 LẦN ĐỂ SỬA
//======================================

document.addEventListener("dblclick",function(e){

    let row=e.target.closest("tr");

    if(!row) return;

    let index=row.rowIndex-1;

    if(index>=0){

        moSua(index);

    }

});


//======================================
// ĐỔI MÀU THANH TIẾN ĐỘ
//======================================

function mauTienDo(value){

    if(value>=100){

        return "bg-green";

    }

    if(value>=50){

        return "bg-orange";

    }

    return "bg-red";

}


//======================================
// THỐNG KÊ
//======================================

function thongKe(){

    let tong=congViec.length;

    let tongTienDo=0;

    congViec.forEach(function(item){

        tongTienDo+=item.tienDo;

    });

    let tb=0;

    if(tong>0){

        tb=Math.round(tongTienDo/tong);

    }

    console.log("Tổng:",tong);

    console.log("TB:",tb+"%");

}


//======================================
// KHỞI TẠO
//======================================

window.onload=function(){

    hienThi();

    thongKe();

}
function doiTrangThai(index, checked){

    congViec[index].tienDo = checked ? 100 : 0;

    luuDuLieu();

    hienThi();

}
