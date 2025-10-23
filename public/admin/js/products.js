const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
buttonChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
        const formChangeStatus = document.querySelector("#form-change-status");
        const id = button.getAttribute("id");
        const currentStatus = button.getAttribute("status");
        let statusChange = currentStatus == "active" ? "inactive" : "active";
        const path = formChangeStatus.getAttribute("path");
        console.log(id);
        console.log(currentStatus);
        const action = path + `/${statusChange}/${id}?_method=PATCH`;
        formChangeStatus.action = action;
        formChangeStatus.submit();
    });
});
// button delete
const buttonDelete = document.querySelectorAll("[button-delete]");
const formDeleteItem = document.querySelector("#form-delete-item");
buttonDelete.forEach((item) => {
    item.addEventListener("click", () => {
        const isConfirm = confirm("Ban co chac la xoa san pham nay khong");
        if (isConfirm) {
            const path = formDeleteItem.getAttribute("path");
            console.log(path);
            const id = item.getAttribute("button-data");
            const action = `${path}/${id}?_method=DELETE`;
            formDeleteItem.action = action;
            formDeleteItem.submit();
        }
    });
});
// end button delete
