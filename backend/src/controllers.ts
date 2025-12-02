import { type Request, type Response } from "express";
import type { CollectionItem } from "./types.ts";
import { db } from "./db.ts";
import pgPromise from 'pg-promise';

const pgp = pgPromise();

export const getAllItems = async (req: Request, res: Response) => {
    try {
        const collection = await db.any('SELECT * FROM art_items');
        res.json(collection);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch items');
    }
}

export const getItemById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id!);
    console.log(`Trying to fetch item id ${id}`);
    if (isNaN(id)) {
        res.status(400).send('Invalid item ID');
        return;
    }
    try {
        const item = await db.oneOrNone('SELECT * FROM art_items WHERE id = $1', [id]);
        if (item) {
            res.json(item);
        } else {
            res.status(404).send(`Item with ID ${id} not found`)
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).send('An error occurred while retrieving the collection');
        return;
    }
}

export const deleteItemById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id!);
    if (isNaN(id)) {
        res.status(400).send('Invalid item ID');
        return;
    }
    try {

        const itemToDelete = await db.oneOrNone('DELETE FROM art_items WHERE id = $1 RETURNING *', [id]);
        if (!itemToDelete) {
            res.status(404).send(`Item with ID ${id} not found`);
        }
        res.status(202).send(`Item ${id} successfully deleted`);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error deleting file');
    }
}

export const addItem = async (req: Request, res: Response) => {
    try {
        const data: CollectionItem = req.body;
        const newItem = await db.one('INSERT INTO art_items(title, medium, image_url, price, status) VALUES(${title}, ${medium}, ${image_url}, ${price}, ${status}) RETURNING title', data);

        console.log('New item added')
        res.status(201).json(newItem);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error adding item to collection')
    }
}

export const updateItemById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id!);
    if (isNaN(id)) {
        res.status(400).send('Invalid item ID');
        return;
    }
    try {
        const updates: CollectionItem = req.body;
        const condition = pgp.as.format(' WHERE id = $1 RETURNING *', id);
        const query = pgp.helpers.update(updates, null, 'art_items') + condition;

        const updated = await db.oneOrNone(query);
        if (!updated) {
            res.status(404).send(`Item with ID ${id} not found`);
        }

        res.json({ message: `Item with ID ${id} has been updated`, updatedItem: updated });

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Error updating item' })
    }
}