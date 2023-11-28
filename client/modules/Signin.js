export default class Signin {
    constructor(fetch) {
        this.fetch = fetch
        this.form = document.getElementById('signin-form')
        this.verifyContainer = document.getElementById('verify-container')
        this.events()
    }

    events() {
        this.form.addEventListener('submit', e => {
            e.preventDefault()

            this.submitHandler();
        })
    }

    submitHandler() {
        this.formData = new FormData(this.form)
        this.data = {
            number: this.formData.get('signin-number'),
            password: this.formData.get('signin-password')
        }

        this.request()
    }

    async request() {
        const res = fetch('signin', this.data)

        console.log(res.status)

        if(res.status === 200) this.verifyContainer.style.display = 'block'
    }
}