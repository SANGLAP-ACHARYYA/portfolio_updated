let projectCount = 1;

// Add new project fields dynamically
document.getElementById('add-project').addEventListener('click', function() {
  const projectSection = document.getElementById('project-section');
  const newProject = `
    <label for="project-title-${projectCount}">Project Title:</label>
    <input type="text" id="project-title-${projectCount}" name="project-title-${projectCount}" placeholder="Project title" required>

    <label for="project-desc-${projectCount}">Project Description:</label>
    <textarea id="project-desc-${projectCount}" name="project-desc-${projectCount}" placeholder="Describe your project" required></textarea>
  `;
  projectSection.insertAdjacentHTML('beforeend', newProject);
  projectCount++;
});

// Generate portfolio dynamically
document.getElementById('portfolio-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const linkedin = document.getElementById('linkedin').value;
  const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());
  const experience = document.getElementById('experience').value;
  const bio = document.getElementById('bio').value;
  
  let portfolioContent = `
    <h3>${name}</h3>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank">${linkedin}</a></p>
    <p><strong>Skills:</strong> ${skills.join(', ')}</p>
    <p><strong>Professional Experience:</strong> ${experience}</p>
    <p>${bio}</p>
    <h4>Projects</h4>
  `;

  // Loop through all the projects
  for (let i = 0; i < projectCount; i++) {
    const projectTitle = document.getElementById(`project-title-${i}`).value;
    const projectDesc = document.getElementById(`project-desc-${i}`).value;
    portfolioContent += `<h5>${projectTitle}</h5><p>${projectDesc}</p>`;
  }

  document.getElementById('generated-portfolio').innerHTML = portfolioContent;
});

// Generate and download portfolio as HTML file
document.getElementById('download-portfolio').addEventListener('click', function() {
    const portfolioElement = document.getElementById('generated-portfolio').innerHTML;
    
    // HTML content for the downloaded file
    const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio</title>
    <style>
      /* Include the entire style.css content here */
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f4f4f4;
        color: #333;
      }
      h3, h4, h5 {
        margin-bottom: 10px;
      }
      p {
        margin-bottom: 15px;
      }
      textarea, input[type="text"], input[type="email"], input[type="url"], select {
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-sizing: border-box;
      }
      button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 15px;
        cursor: pointer;
        border-radius: 5px;
      }
      button:hover {
        background-color: #0056b3;
      }
      #generated-portfolio {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .default-style {
        background-color: white;
        color: black;
      }
      .modern-style {
        background-color: #282c34;
        color: white;
      }
      .classic-style {
        background-color: #f4f4f4;
        color: #333;
        border: 2px solid #333;
      }
      #project-section h5 {
        color: #0056b3;
      }
      a {
        color: #0077b5;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      .skills-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      .skill-item {
        background-color: #007bff;
        color: white;
        padding: 5px 10px;
        border-radius: 3px;
        font-size: 14px;
      }
      #experience-section {
        margin-top: 20px;
        font-size: 16px;
        font-weight: bold;
        color: #007bff;
      }
    </style>
  </head>
  <body>
    <h1>Portfolio</h1>
    <div id="generated-portfolio">
      ${portfolioElement}
    </div>
  </body>
  </html>
    `;
  
    // Create a Blob object containing the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });
  
    // Create a link element to download the Blob
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'portfolio.html';
  
    // Append the link to the document and trigger the download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
  });
  
