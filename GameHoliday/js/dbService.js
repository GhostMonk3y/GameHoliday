const dotenv = require('dotenv');
const { response } = require('express');
const mysql = require('mysql');
let instance = null;
const connection = mysql.createConnection({
    user : "gameholiday",
    password : "root",
    database : "gameholiday",
    dbport : 3306,
    host : "localhost"
})
connection.connect((err) => {
    if (err){
        console.log(err.message);
    }
    // console.log('db ' + connection.state);
})

class dbService {
    static getDbServiceInstance(){
        return instance ? instance : new dbService();
    }

    async getAllData(condition){
        try {
            const reponse = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM question WHERE theme = (?);";

                connection.query(query, [condition], (err, results) => {
                    if (err) reject (new Error(err.message));
                    resolve(results);
                })
            });
            return reponse;
        } catch (error) {
            console.log(error);
        }
    }
    async insertNewQuestion(obj) {
        try {
            const insertQuestionSQL = await new Promise((resolve, reject) => {
                const query = "INSERT INTO question (theme, question, reponse1, reponse2, reponse3, reponse4, points, lien) VALUES (?,?,?,?,?,?,?,?);";

                connection.query(query, [obj.theme, obj.question, obj.reponse, obj.proposition, obj.proposition2, obj.proposition3, obj.point, obj.lien], (err, results) => { 
                    if (err) reject (new Error(err.message));
                    resolve(results.insertQuestion);
                })
            });
            return {
                theme : obj.theme,
                question : obj.question,
                reponse1 : obj.reponse,
                reponse2 : obj.proposition,
                reponse3 : obj.proposition2,
                reponse4 : obj.proposition3,
                points : obj.point,
                lien : obj.lien
            };
        } catch (error) {
            console.log(error);
        }
    }
    async getAll(){
        try {
            const reponse = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM question;";

                connection.query(query, (err, results) => {
                    if (err) reject (new Error(err.message));
                    resolve(results);
                })
            });
            return reponse;
        } catch (error) {
            console.log(error);
        }
    }
    async deleteRow(id) {
        try {
            id = parseInt(id, 10);
            const deleteId = await new Promise((resolve, reject) => {
                const query = "DELETE FROM question WHERE idQuestion = ?";
    
                connection.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return deleteId === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async reset() {
        try {
            const reset = await new Promise((resolve, reject) => {
                const query = "UPDATE points SET Equipe1 = '0', Equipe2 = '0', Equipe3 = '0' WHERE id =1";
    
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return reset === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async getPoints(){
        try {
            const reponse = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM points;";

                connection.query(query, (err, results) => {
                    if (err) reject (new Error(err.message));
                    resolve(results);
                })
            });
            return reponse;
        } catch (error) {
            console.log(error);
        }
    }
    async getQuestion(theme, point){
        try {
            point = parseInt(point, 10);
            const question = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM question WHERE theme = ? AND points = ?";
    
                connection.query(query, [theme, point], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return question;
        } catch (error) {
            console.log(error);
        }
    }
    async addPoints(equipe1, equipe2, equipe3) {
        try {
            const ajouterPoints = await new Promise((resolve, reject) => {
                const query = "UPDATE points SET Equipe1 = ?, Equipe2 = ?, Equipe3 = ? WHERE id =1";
    
                connection.query(query, [equipe1, equipe2, equipe3], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                    console.log(result.affectedRows);
                })
            });
            return ajouterPoints === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = dbService;