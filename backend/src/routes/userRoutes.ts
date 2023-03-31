import { Router } from 'express';
import passportFacebook from 'passport-facebook';
import passport from 'passport';
import * as dotenv from 'dotenv';
import { getUsers } from '../controller/userController';
import express, { Express, NextFunction, Request, Response } from 'express';
dotenv.config();

export const router = Router();

router.route('/').get(getUsers);
