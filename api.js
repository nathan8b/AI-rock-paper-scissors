export function getAIMove() {
    return fetch("http://localhost:3000/api/rps")
        .then(response => response.json())
        .then(data => data.aiMove);
}