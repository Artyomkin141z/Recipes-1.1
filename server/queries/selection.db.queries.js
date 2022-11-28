class SelectionRequests {
    createSelection(userId, title, content){
        return `EXEC createSelection ${userId}, '${title}', '${content}'`
    }

    addRecipe(selectionId, recipeId, content){
        return `exec createSelectionsRecipe ${selectionId}, ${recipeId}, '${content}'`
    }

    getSelection(selectionId){
        return `exec getSelection ${selectionId}`
    }

    getSelections(){
        return `exec getSelections`
    }

    getLikes(id, userId){
        //console.log(`exec getLikesRecipe '${recipeId}', '${userId}'`)
        if(userId) return `exec getLikesSelection '${id}', '${userId}'`;
        else return `exec getLikesSelection '${id}'`;
    }

    addLike(id, userId){
        return `exec addLikeSelection '${id}', '${userId}'`;
    }

    getUserSelections(userId){
        return `exec getUserSelectionsProc ${userId}`
    }

    getUserSelectionsBookmarks(userId = 0){
        return `exec getUserSelectionBookmarks ${userId}`;
    }

    deleteSelection(id){
        return `exec deleteSelection ${id}`;
    }
}

module.exports = new SelectionRequests();