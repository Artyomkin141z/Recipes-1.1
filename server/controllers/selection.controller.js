const SelectionService= require('../service/selection.service')
const tokenService = require('../service/token.service')

class SelectionController {
    async createSelection(req, res, next){
        try{
            const token = req.headers.authorization.split(' ')[1];
            const validToken = tokenService.validateAccessToken(token);
            const userId = validToken.id;

            const {selection} = req.body
            //console.log(selection);

            const result = await SelectionService.createSelection(userId, selection.title, selection.content)
            const selectionId = result.selection_id;
            
            selection.recipes.map(async (item) => {
                await SelectionService.addRecipe(selectionId, item.id, item.content)
            })

            const answer = await SelectionService.getSelection(selectionId)
            console.log(answer);

            return res.json({selection: answer[0][0], selectionsRecipes: answer[1]});
        }catch(e){
            next(e);
        }

    }  

    async getSelections(req, res, next){
        try{
            const result = await SelectionService.getSelections()
            //console.log(result);
            return res.json({selections: result});
        }catch(e){
            next(e);
        }
    }
    
    async getSelection(req, res, next){
        try{
            const token = req.headers.authorization.split(' ')[1];
            const validToken = tokenService.validateAccessToken(token);
            const userId = validToken.id;

            const {id} = req.body

            const selection = await SelectionService.getSelection(id);
            
            let isMy = false;
            if(userId == selection[0][0].user_id){
                isMy = true;
            }

            const result = await SelectionService.getSelection(id)
            result[0][0].isMy = isMy;
            //console.log(result);
            return res.json({selection: result[0][0], selectionsRecipes: result[1]});
        }catch(e){
            next(e);
        }
    } 

    async getLikes(req, res, next){
        try{
            const token = req.headers.authorization.split(' ')[1];
            const validToken = tokenService.validateAccessToken(token);
            const userId = validToken.id;

            const {id} = req.body

            const result = await SelectionService.getLikes(id, userId)
            console.log(result);
            return res.json({numberLikes: result[0][0].numberLikes, isLikes: result[1][0].isLikes});
        }catch(e){
            next(e);
        }
    } 

    async addLike(req, res, next){
        try{
            const token = req.headers.authorization.split(' ')[1];
            const validToken = tokenService.validateAccessToken(token);
            const userId = validToken.id;
            const {selectionId} = req.body;

            const result = await SelectionService.addLike(selectionId, userId);
            
            //console.log('numberLikes:', result[0][0].numberLikes, 'isLikes:', result[1][0].isLikes);
            //return res.json({numberLikes: result[0][0].numberLikes, isLikes: result[1][0].isLikes});
        }catch(e){
            next(e);
        }
    }

    async getUserSelections(req, res, next){
        try{
            const token = req.headers.authorization.split(' ')[1];
            const validToken = tokenService.validateAccessToken(token);
            const userId = validToken.id;

            const result = await SelectionService.getUserSelections(userId);
            return res.json({selections: result});
            //console.log('numberLikes:', result[0][0].numberLikes, 'isLikes:', result[1][0].isLikes);
            //return res.json({numberLikes: result[0][0].numberLikes, isLikes: result[1][0].isLikes});
        }catch(e){
            next(e);
        }
    }

    async getUserSelectionsBookmarks(req, res, next){
        try{
            const token = req.headers.authorization.split(' ')[1];
            const validToken = tokenService.validateAccessToken(token);
            const userId = validToken.id;

            const result = await SelectionService.getUserSelectionsBookmarks(userId);

            return res.json({selections: result});
        }catch(e){
            next(e);
        }
    }

    async deleteSelection(req, res, next){
        try{
            const {id} = req.body
            //console.log(comment)
            const result = await SelectionService.deleteSelection(id);
            //console.log(result)
            //return res.json({comments: result});
        }catch(e){
            next(e);
        }
    }
}

module.exports = new SelectionController();