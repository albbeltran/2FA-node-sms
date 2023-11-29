export default class Verify {
    constructor(fetchFunction) {
        this.makeFetch = fetchFunction
        this.form = document.getElementById('verify-form')
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
            code: this.formData.get('code')
        }

        this.request()
    }

    async request() {
        const res = await this.makeFetch('verify', this.data)

        if (res.status === 200) alert('Success!')
        else if (res.status === 401) alert('Incorrect code')
    }
}