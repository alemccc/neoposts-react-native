export const addNewPostToTop = (
	dispatch: any,
	updateQueryData: any,
	data: any,
) => {
	dispatch(
		updateQueryData('getPosts', { page: 1 }, (draft: any) => {
			draft.pages[0].posts.unshift(data);

			let totalPosts = 0;
			for (const page of draft.pages) {
				totalPosts += page.posts?.length || 0;

				if (totalPosts > 25) {
					break;
				}
			}

			if (totalPosts > 25) {
				const lastPage = draft.pages[draft.pages.length - 1];
				lastPage.posts.pop();
			}
		}),
	);
};
