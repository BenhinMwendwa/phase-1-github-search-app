document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const search= searchInput.value.trim();
  
      if (search) {
        try {
          // Search for users
          const usersResponse = await fetch(`https://api.github.com/search/users?q=${search}`, {
            headers: {
              'Accept': 'application/vnd.github.v3+json'
            }
          });
          const userData = await usersResponse.json();
  
          // Clear previous search results
          userList.innerHTML = '';
  
          // Display user information
          userData.items.forEach(user => {
            const userItem = document.createElement('li');
            const userLink = document.createElement('a');
            userLink.href = user.html_url;
            userLink.target = '_blank';
            userLink.textContent = user.login;
            userItem.appendChild(userLink);
            userList.appendChild(userItem);
  
            userLink.addEventListener('click', async (e) => {
              e.preventDefault();
              try {
                // Get repositories for the selected user
                const reposResponse = await fetch(`https://api.github.com/users/${user.login}/repos`, {
                  headers: {
                    'Accept': 'application/vnd.github.v3+json'
                  }
                });
                const reposData = await reposResponse.json();
  
                // Clear previous repo
                reposList.innerHTML = '';
  
                // Display repositories
                reposData.forEach(repo => {
                  const repoItem = document.createElement('li');
                  const repoLink = document.createElement('a');
                  repoLink.href = repo.html_url;
                  repoLink.target = '_blank';
                  repoLink.textContent = repo.name;
                  repoItem.appendChild(repoLink);
                  reposList.appendChild(repoItem);
                });
              } catch (error) {
                console.error('Error fetching repositories:', error);
              }
            });
          });
  
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
    });
  });
  