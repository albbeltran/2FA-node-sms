export default class Signin {
    constructor(fetchFunction) {
        this.makeFetch = fetchFunction
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
        console.log(this.data)
        const res = await this.makeFetch('signin', this.data)
        console.log(res)

        if(res.status === 200) this.verifyContainer.style.display = 'block'
        else if(res.status === 401) alert('Check your data')
    }
}