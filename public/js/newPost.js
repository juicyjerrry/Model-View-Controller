const newFormHandler = async (event) => {
    event.preventDefault();
  
//these select the text in the corresponding id in the dashboard.handlebars
    const name = document.querySelector('#post-name').value.trim();
    const body = document.querySelector('#post-body').value.trim();
  
    if (name && needed_funding && description) {
        //line 9, this is creating our post but how?
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ name, body }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create project');
      }
    }
  };

  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.project-list')
    .addEventListener('click', delButtonHandler);