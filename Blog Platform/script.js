function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

document.getElementById('postForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const content = document.getElementById('content').value.trim();

    if (title && author && content) {
        const postList = document.getElementById('post-list');

        const newPost = document.createElement('div');
        newPost.classList.add('post-card');

        newPost.innerHTML = `
            <h3>${title}</h3>
            <p><strong>By:</strong> ${author}</p>
            <p>${content}</p>
            <div class="btn-group">
                <button>LIKE❤️</button>
                <button>COMMENT📝</button>
                <button>SHARE➦</button>
            </div>
        `;

        postList.prepend(newPost);

        document.getElementById('postForm').reset();
        showSection('home');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const homeSection = document.getElementById("home"); // 🔁 Fix here

    homeSection.addEventListener("click", function (e) {
        const btn = e.target;
        if (btn.tagName !== "BUTTON") return;

        const postCard = btn.closest(".post-card");
        if (!postCard) return;

        const titleEl = postCard.querySelector("h3");

        if (btn.textContent.startsWith("LIKE")) {
            if (btn.classList.contains("liked")) {
                btn.classList.remove("liked");
                btn.textContent = "LIKE❤️";
            } else {
                btn.classList.add("liked");
                btn.textContent = "LIKED👍";
            }
        } else if (btn.textContent.startsWith("COMMENT")) {
            let comment = prompt("Write your comment:");
            if (comment) {
                const commentEl = document.createElement("p");
                commentEl.textContent = `💬 ${comment}`;
                commentEl.style.marginLeft = "20px";
                commentEl.style.fontStyle = "italic";
                commentEl.style.color = "#555";

                const btnGroup = postCard.querySelector(".btn-group");
                postCard.insertBefore(commentEl, btnGroup);
            }
        } else if (btn.textContent.startsWith("SHARE")) {
            const shareText = titleEl?.textContent.slice(0, 50) + "...";
            navigator.clipboard.writeText(shareText).then(() => {
                showNotification("Post title copied to clipboard!");
            });
        }
    });

    function showNotification(msg) {
        let notification = document.createElement("div");
        notification.textContent = msg;
        notification.style.position = "fixed";
        notification.style.bottom = "20px";
        notification.style.left = "50%";
        notification.style.transform = "translateX(-50%)";
        notification.style.backgroundColor = "#333";
        notification.style.color = "white";
        notification.style.padding = "10px 20px";
        notification.style.borderRadius = "6px";
        notification.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
        notification.style.zIndex = "1000";
        notification.style.opacity = "0";
        notification.style.transition = "opacity 0.5s ease-in-out";

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = "1";
        }, 10);

        setTimeout(() => {
            notification.style.opacity = "0";
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 2000);
    }
});
