export default {
	/**
	 * Загрузка комментариев
	 * @param id
	 * @return {Function}
	 */
	loadComments: (articleId) => {
		return async (dispatch, getState, services) => {
			try {
				const res = await services.api.request({
					url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${articleId}`
				});
				dispatch({ type: 'comments/load-success', payload: { data: res.data.result.items } });
			} catch (e) {
				dispatch({ type: 'comments/load-error' });
			}
		}
	},
	addComment: (text, parentId, type) => {
		return async (dispatch, getState, services) => {
			try {
				const res = await services.api.request({
					url: `/api/v1/comments`,
					method: 'POST',
					body: JSON.stringify({
						text: text,
						parent: { 
							_id: parentId,
							_type: type
						 }
					}),
				});
				dispatch({ type: 'comments/add-success', payload: { data: res.data.result } });
			} catch (e) {
				dispatch({ type: 'comments/add-error' });
			}
		};
	},

};
