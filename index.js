        const bookmarks = [];

        const linkInput = document.getElementById('linkInput');
        const categorySelect = document.getElementById('categorySelect');
        const newCategoryInput = document.getElementById('newCategoryInput');
        const addCategoryBtn = document.getElementById('addCategoryBtn');
        const saveBtn = document.getElementById('saveBtn');
        const bookmarkList = document.getElementById('bookmarkList');
        const searchInput = document.getElementById('searchInput');
        const sortSelect = document.getElementById('sortSelect');

        // add new category
        addCategoryBtn.addEventListener('click', () => {
            const newCategory = newCategoryInput.value.trim();
            if (newCategory) {
                const option = document.createElement('option');
                option.value = newCategory;
                option.textContent = newCategory;
                categorySelect.appendChild(option);
                newCategoryInput.value = '';
            }
        });

        // save bookmark
        saveBtn.addEventListener('click', () => {
            const linkValue = linkInput.value.trim();
            const categoryValue = categorySelect.value;

            if (linkValue && (linkValue.startsWith('http://') || linkValue.startsWith('https://'))) {
                bookmarks.push({
                    link: linkValue,
                    category: categoryValue,
                    favorite: false
                });
                linkInput.value = ''; // clear input
                categorySelect.value = 'general'; // reset category
                renderBookmarks();
            } else {
                alert('please enter a valid link starting with http:// or https://');
            }
        });

        // render bookmarks
        function renderBookmarks(bookmarksToRender = bookmarks) {
            bookmarkList.innerHTML = '';
            bookmarksToRender.forEach((bookmark, index) => {
                const li = document.createElement('li');
                li.classList.add('p-2', 'border-b');
                li.innerHTML = `
                    <span class="${bookmark.favorite ? 'text-yellow-500' : ''}">${bookmark.link} (${bookmark.category})</span>
                    <button onclick="editBookmark(${index})" class="ml-2 bg-yellow-500 text-white p-1 rounded">edit</button>
                    <button onclick="removeBookmark(${index})" class="ml-2 bg-red-500 text-white p-1 rounded">remove</button>
                    <button onclick="toggleFavorite(${index})" class="ml-2 bg-pink-500 text-white p-1 rounded">❤</button>
                `;
                bookmarkList.appendChild(li);
            });
        }

        // edit bookmark
        function editBookmark(index) {
            const newLink = prompt('enter new link', bookmarks[index].link);
            if (newLink) {
                bookmarks[index].link = newLink;
                renderBookmarks();
            }
        }

        // remove bookmark
        function removeBookmark(index) {
            bookmarks.splice(index, 1);
            renderBookmarks();
        }


        searchInput.addEventListener('input', () => {
            const searchValue = searchInput.value.toLowerCase();
            const filteredBookmarks = bookmarks.filter(bookmark =>
                bookmark.link.toLowerCase().includes(searchValue)
            );
            renderBookmarks(filteredBookmarks);
        });
        function toggleFavorite(index) {
            bookmarks[index].favorite = !bookmarks[index].favorite;
            renderBookmarks();
}
        

            sortSelect.addEventListener('change', () => {
                const sortValue = sortSelect.value;
                if (sortValue === 'alphabetical') {
                    bookmarks.sort((a, b) => a.link.localeCompare(b.link));
                } else if (sortValue === 'category') {
                    bookmarks.sort((a, b) => a.category.localeCompare(b.category));
                }
                renderBookmarks();
            });