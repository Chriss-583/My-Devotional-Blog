/* =================================
   AUTOMATIC SESSION LOADER
================================= */

async function loadSession() {
  const container = document.getElementById("sessionContent");
  const title = document.getElementById("sessionTitle");

  if (!container || !title) return;

  // Identify current HTML filename
  const currentPage = window.location.pathname;

  // Extract session number from T1.html, T2.html, etc.
  const match = currentPage.match(/T(\d+)\.html$/i);

  if (!match) {
    console.log("No session page detected.");
    return;
  }

  const sessionNumber = match[1];

  // Automatically generate JSON file path
  const jsonPath = `sessions/session${sessionNumber}.json`;

  console.log("Loading:", jsonPath);

  try {
    const response = await fetch(jsonPath);

    if (!response.ok) {
      throw new Error(`Session ${sessionNumber} not found.`);
    }

    const data = await response.json();

    // Display title
    title.textContent = data.title || "Untitled Session";

    // Clear previous content
    container.innerHTML = "";

    // Display paragraphs
    if (Array.isArray(data.paragraphs)) {
      data.paragraphs.forEach((text) => {
        const paragraph = document.createElement("p");

        paragraph.textContent = text;

        container.appendChild(paragraph);
      });
    }

    console.log(`Session ${sessionNumber} loaded successfully!`);
  } catch (error) {
    console.error("Session loading error:", error);

    title.textContent = "Content unavailable";

    container.textContent = error.message;
  }
}

/* =================================
   COMMENT FUNCTIONALITY
================================= */

function addComment() {
  const input = document.getElementById("commentInput");
  const commentList = document.getElementById("commentList");

  if (!input || !commentList) return;

  const comment = input.value.trim();

  if (comment !== "") {
    const newComment = document.createElement("p");

    newComment.textContent = comment;

    commentList.appendChild(newComment);

    input.value = "";
  }
}

/* =================================
   INITIALIZE WEBSITE
================================= */

document.addEventListener("DOMContentLoaded", () => {
  loadSession();
});
