const query = require('../db_conect')
const bcrypt = require('bcrypt')
const UserDto = require('../dtos/user.dto')
const tokenService = require('./token.service')
const ApiError = require('../exceptions/api.error')
const selectionQueries = require('../queries/selection.db.queries')

class SelectionService {
    async createSelection(userId, title, content){
        const result = await query(selectionQueries.createSelection(userId, title, content))
        return result.recordset[0];
    }

    async addRecipe(selectionId, recipeId, content){
        await query(selectionQueries.addRecipe(selectionId, recipeId, content))
        //return result.recordset[0];
    }

    async getSelection(selectionId){
        const result = await query(selectionQueries.getSelection(selectionId))
        return result.recordsets;
    }

    async getSelections(){
        const result = await query(selectionQueries.getSelections())
        return result.recordsets[0];
    }

    async getLikes(id, userId){
        const result = await query(selectionQueries.getLikes(id, userId))
        return result.recordsets;
    }

    async addLike(id, userId){
        const result =  await query(selectionQueries.addLike(id, userId))
        //console.log(result.recordsets[0]);
        return result.recordsets[0];
    }

    async getUserSelections(userId){
        const result =  await query(selectionQueries.getUserSelections(userId))
        //console.log(result.recordsets[0]);
        return result.recordsets[0];
    }

    async getUserSelectionsBookmarks(userId){
        const result =  await query(selectionQueries.getUserSelectionsBookmarks(userId))
        //console.log(result.recordsets[0]);
        return result.recordsets[0];
    }

    async deleteSelection(id){
        const result =  await query(selectionQueries.deleteSelection(id))
        //console.log(result.recordsets[0]);
        return result.recordsets[0];
    }
}

module.exports = new SelectionService();