document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;

    async function updateStats() {
        try {
            const response = await fetch('/review-stats');
            const stats = await response.json();

            if (stats.total === 0) return;

            for (let i = 1; i <= 5; i++) {
                const count = stats[i] || 0;
                const percentage = (count / stats.total) * 100;
                
                const bar = document.getElementById(`bar-${i}`);
                if (bar) {
                    bar.style.width = percentage + "%";
                }
            }
        } catch (err) {
            console.error("Stats update failed:", err);
        }
    }

    async function loadComments(page = 1) {
        try {
            const response = await fetch(`/comments?page=${page}`);
            const data = await response.json();
            
            const container = document.getElementById('comments-container');
            if (!container) return;

            container.innerHTML = ''; 

            if (Array.isArray(data)) {
                data.forEach(c => {
                    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
                    const formattedDate = new Date(c.created_at).toLocaleDateString(undefined, dateOptions);

                    const div = document.createElement('div');
                    div.className = 'review-row'; 
                    
                    div.innerHTML = `
                        <div class="review-header">
                            <h3>${c.name}</h3>
                            <div class="stars">${'★'.repeat(c.rating)}${'☆'.repeat(5-c.rating)}</div>
                        </div>
                        <p>"${c.review}"</p>
                        <div class="review-meta">Posted on ${formattedDate}</div>
                    `;
                    container.appendChild(div);
                });

                const nextBtn = document.getElementById('next-btn');
                if (data.length < 5) {
                    nextBtn.style.visibility = 'hidden'; 
                } else {
                    nextBtn.style.visibility = 'visible';
                }

                const prevBtn = document.getElementById('prev-btn');
                if (page === 1) {
                    prevBtn.style.visibility = 'hidden';
                } else {
                    prevBtn.style.visibility = 'visible';
                }

            } else {
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
            e.preventDefault();
            
            const msg = document.getElementById('form-message');
            const submitBtn = form.querySelector('button[type="submit"]');

            // Edge Case 4: Prevent double-clicking
            submitBtn.disabled = true;
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Sending...";

            const data = {
                name: document.getElementById('form-name').value,
                rating: document.getElementById('form-rating').value,
                review: document.getElementById('form-review').value
            };

            // Edge Case 2 & 3: Whitespace and Length
            if (!data.name.trim() || !data.review.trim()) {
                alert("You can't leave the name or review blank!");
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
                return;
            }

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
                    
                    loadComments(1);
                    updateStats();
                } else {
                    const errData = await response.json();
                    alert(errData.error || "Submission failed");
                }
            } catch (err) {
                // Edge Case 1: Server unreachable
                console.error("Submit error:", err);
                alert("The comment service is unreachable right now. Please try again later!");
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            }
        });
    }

    document.getElementById('next-btn').onclick = () => { currentPage++; loadComments(currentPage); };
    document.getElementById('prev-btn').onclick = () => { if(currentPage > 1) { currentPage--; loadComments(currentPage); } };

    loadComments(1);
    updateStats();
});