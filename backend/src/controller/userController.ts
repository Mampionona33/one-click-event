import express, { Express, NextFunction, Request, Response } from 'express';

export const getUsers = (req, res, next) => {
  const user = {
    name: 'Mampionona',
    lastName: 'Ramahazomananana',
    sex: 'Male',
  };

  res.status(200).json({
    status: 'succes',
    data: { user: user },
  });
  next();
};
