export default async function makeFetch(action, data) {
    console.log('ACTION', data)
    return await fetch(`http://localhost:3500/${action}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}