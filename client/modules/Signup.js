export default class Signup {
    constructor() {
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
        const res = await fetch('http://localhost:3500/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.data)
        })

        console.log(res.status)
    }
}