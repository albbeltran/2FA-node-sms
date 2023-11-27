export default class Signin {
    constructor() {
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
        const res = await fetch('http://localhost:3500/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.data)
        })

        console.log(res.status)

        if(res.status === 200) this.verifyContainer.style.display = 'block'
    }
}