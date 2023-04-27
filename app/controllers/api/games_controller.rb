class Api::GamesController < ApplicationController

    wrap_parameters format: []

    skip_before_action :authorize, only: [:index]

    def index
        games = Game.all
        render json: games, include: [:plays]
    end

    def update
        game = Game.find(params[:id])
        game.update!(game_params)

        if game.is_over

            if game.home_score > game.away_score
                game_winner = game.home_team
                game_loser = game.away_team
            else
                game_winner = game.away_team
                game_loser = game.home_team
            end

            Wager.where(game_id: game.id).each do |wager|
                if wager.pick == game_winner
                    puts "Maker won"
                    wager.update(status: 4, winner: wager.maker.id, loser: wager.taker.id)
                    wager.maker.update(wins: wager.maker.wins + 1, balance: wager.maker.balance + wager.amount * 2)
                    wager.taker.update(losses: wager.taker.losses + 1)
                else
                    puts "Taker won"
                    wager.update(status: 4, winner: wager.taker.id, loser: wager.maker.id)
                    wager.taker.update(wins: wager.taker.wins + 1, balance: wager.taker.balance + wager.amount * 2)
                    wager.maker.update(losses: wager.maker.losses + 1)
                end
            end
        end


        render json: game
    end

    private

    def game_params
        params.permit(:home_team, :away_team, :home_score, :away_score, :is_over)
    end

end