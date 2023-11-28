export default class Verify {
    constructor(fetch) {
        this.fetch = fetch
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
        const res = fetch('verify', this.data)

        console.log(res.status)

        if(res.status === 200) alert('Success!')
    }
}