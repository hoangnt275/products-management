// button status
const buttonStatus = document.querySelectorAll("[btn-status]");
const url = new URL(window.location);
if (buttonStatus.length > 0) {
    buttonStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("btn-status");
            if (status) {
                url.searchParams.set("status", status);
            } else url.searchParams.delete("status");
            // console.log(url.href);
            window.location = url;
        });
    });
}
// end button status

// form search

const formSearch = document.querySelector("#form-search");
if (formSearch) {
    formSearch.addEventListener("submit", (e) => {
        const url = new URL(window.location);
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if (keyword) {
            url.searchParams.set("keyword", keyword);
        } else url.searchParams.delete("keyword");
        window.location = url;
    });
}
// end form search

// pagintion
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination.length > 0) {
    buttonPagination.forEach((button) => {
        button.addEventListener("click", () => {
            let page = button.getAttribute("button-pagination");
            if (page) {
                url.searchParams.set("page", page);
            }
            window.location = url;

            console.log(button.getAttribute("button-pagination"));
        });
    });
}

// end pagination

// checkbox multi
const checkboxMulti = document.querySelector("table[checkbox-multi]");
if (checkboxMulti) {
    const checkAll = checkboxMulti.querySelector("input[name='check-all']");
    const checkItems = checkboxMulti.querySelectorAll(
        "input[name='check-item']"
    );
    if (checkAll) {
        checkAll.addEventListener("change", (e) => {
            const check = e.target.checked;
            if (check) {
                checkItems.forEach((item) => {
                    item.checked = true;
                });
            } else {
                checkItems.forEach((item) => {
                    item.checked = false;
                });
            }
        });
    }
    if (checkItems) {
        checkItems.forEach((item) => {
            item.addEventListener("change", (e) => {
                const count = document.querySelectorAll(
                    "input[name='check-item']:checked"
                ).length;
                if (count == checkItems.length) {
                    checkAll.checked = true;
                } else checkAll.checked = false;
            });
        });
    }
}
// end checkbox multi

// form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        const typeChange = e.target.type.value;
        if (typeChange == "delete-all") {
            const isConfirm = confirm(
                "Ban co muon xoa nhung san pham nay khong?"
            );
            if (!confirm) return;
        }

        const checkboxMulti = document.querySelector("table[checkbox-multi]");
        const inputId = formChangeMulti.querySelector("input[name='ids']");
        const checkItems = checkboxMulti.querySelectorAll(
            "input[name='check-item']:checked"
        );
        let id = [];
        checkItems.forEach((item) => {
            if (typeChange == "change-position") {
                const position = item
                    .closest("tr")
                    .querySelector("input[name='position']").value;
                id.push(`${item.value}-${position}`);
            } else {
                id.push(item.value);
            }
        });
        inputId.value = id.join(", ");
        formChangeMulti.submit();
    });
}
// end form change multi
// alert
const alertChange = document.querySelector("[show-alert]");
const closeAlert = document.querySelector("[close-alert]");
if (alertChange) {
    setTimeout(() => {
        alertChange.classList.add("alert-hidden");
    }, alertChange.getAttribute("show-time"));
    closeAlert.addEventListener("click", () => {
        alertChange.classList.add("alert-hidden");
    });
}
// end alert
// upload img
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    // console.log(uploadImageInput);
    uploadImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    });
}
// end upload img
