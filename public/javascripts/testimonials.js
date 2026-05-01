document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;

    async function loadComments(page = 1) {
        try {
            const response = await fetch(`/comments?page=${page}`);
            const data = await response.json(); // Let's call it 'data' instead of 'comments'
            
            const container = document.getElementById('comments-container');
            if (!container) return;

            container.innerHTML = ''; 

            // CRITICAL CHECK: Make sure data is an array
            if (Array.isArray(data)) {
                data.forEach(c => {
                    const div = document.createElement('div');
                    div.className = 'review-item';
                    div.innerHTML = `
                        <strong>${c.name}</strong> 
                        <span style="color: #f7c64a;">${'★'.repeat(c.rating)}${'☆'.repeat(5-c.rating)}</span>
                        <p>${c.review}</p>
                    `;
                    container.appendChild(div);
                });
            } else {
                // If the server sent an error object instead of an array
                console.error("Server returned an error object:", data);
                container.innerHTML = `<p class="error">Error: ${data.error || 'Unknown error'}</p>`;
            }
            
            document.getElementById('page-info').innerText = `Page ${page}`;
        } catch (err) {
            console.error("Could not load comments:", err);
        }
    }

    const form = document.getElementById('comment-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // STOP THE REFRESH
            
            const msg = document.getElementById('form-message');
            const data = {
                name: document.getElementById('form-name').value,
                rating: document.getElementById('form-rating').value,
                review: document.getElementById('form-review').value
            };

            try {
                const response = await fetch('/submit-comment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    form.reset();
                    msg.style.display = 'block';
                    msg.innerText = "Review posted!";
                    msg.style.color = "green";
                    loadComments(1); // Reload to show newest
                } else {
                    const errData = await response.json();
                    alert(errData.error || "Submission failed");
                }
            } catch (err) {
                console.error("Submit error:", err);
            }
        });
    }

    document.getElementById('next-btn').onclick = () => { currentPage++; loadComments(currentPage); };
    document.getElementById('prev-btn').onclick = () => { if(currentPage > 1) { currentPage--; loadComments(currentPage); } };

    loadComments(1);
});