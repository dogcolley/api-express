import { Request, Response, NextFunction } from "express";

module.exports = {
	async show(req:Request, res:Response) {
		res.setHeader('Content-Type', 'application/json')
		return res.status(200).send(true)
	},

	async delete(req:Request, res:Response) {
		return res.status(204).send("delete")
	}
}