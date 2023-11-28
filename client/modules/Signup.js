export default class Signup {
    constructor(fetchFunction) {
        this.makeFetch = fetchFunction
        this.form = document.getElementById('signup-form')
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
            number: this.formData.get('signup-number'),
            password: this.formData.get('signup-password')
        }

        this.request()
    }

    async request() {
        console.log(this.makeFetch)
        const res = await this.makeFetch('signup', this.data)

        console.log(res.status)
    }
}