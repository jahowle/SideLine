# Phase 5 Final Project

# About

This is the repository for my Phase 5 Final Project for Flatiron School.

This repository if for an app called Sideline.

Sideline is a peer to peer sports betting app that allows a user to create wagers and another user to take the other side of those wagers. It also features a game simulator that allows the bets to be settled.

# Installation

- Fork and Clone this repository
- Open the project folder and run

```
bundle install
```

- Then launch the Rails server by running

```
rails s
```

- Then migrate and seed the database by running

```
rails db:migrate db:seed
```

- Then, in a new terminal, launch the front-end react client by running

```
npm start --prefix client
```

# Architecture

The database contains tables for users, games, teams, wagers, and plays.

# Use

First create an account.

Intial account creation gives a user $1000 to bet with.

A user can add funds to their account by using the Add Funds feature which can be found in the "My Profile" section of the app.

Create a bet or take the bet of another user.

If no other open bets exist, logout and create another user account and create a bet from that account. Then logout and log back into the first account and you will be able to take the bet.

Once you have created and taken the bets you want, click "Simulate Game". This will run through a virtual game and when it reaches the end of the simulation it will settle the bets that have been taken.

# Contributing

This project was for a coding course and as such will not be maintained or updated in the future.
