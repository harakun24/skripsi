AOS.init();

window.onload = () => {

    daftar = () => {
        Swal.fire({
            title: 'Custom animation with Animate.css',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })

    }

    masuk = () => {
        Swal.fire({
            title: 'Masuk',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            html: `
            <div class="col-12 d-flex justify-content-center">
            <form class="col-8" action="/user/auth" method="post">
                <div class="mb-3">
                    <label class=" d-flex justify-content-start form-label" for="name">Your Name</label>
                    <input class="form-control item" type="text" id="name" name="username"></div>
                <div class="mb-3">
                    <label class="form-label d-flex justify-content-start " for="password">Subject</label>
                    <input class="form-control item" type="password" id="password" name="password"></div>
                <div class="mb-3">
                    <button class="btn btn-primary btn-lg d-block w-100 mt-2" type="submit">masuk</button></div>
            </form>
            </div>
            `,
            showConfirmButton: false
        })
    }
}