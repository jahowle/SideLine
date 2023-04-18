class Api::WagersController < ApplicationController

    skip_before_action :authorize, only: [:index, :create]

    def index
        wagers = Wager.all 
        render json: wagers, include: [:taker, :maker, :game]
    end

    def update
        wager = Wager.find(params[:id])
        new_balance = current_user.balance - wager.amount
        wager.assign_attributes(wager_params)
        if wager.amount > current_user.balance
            render json: { errors: ["You don't have enough money to take this wager"] }, status: :unprocessable_entity
        else
            wager.save!
            current_user.update(balance: new_balance)
            render json: wager, include: [:taker, :maker, :winner, :loser, :game]
        end
    end

    def cancel_take_wager
        wager = Wager.find(params[:id])
        wager.update!(taker_id: nil, status: 0)
        current_user.update(balance: current_user.balance + wager.amount)
        render json: wager, include: [:taker, :maker, :winner, :loser, :game]
    end

    def create
        user = User.find(params[:maker_id])
        new_balance = user.balance - params[:amount].to_i
        user.update(balance: new_balance)
        wager = Wager.create!(
            maker_id: params[:maker_id],
            amount: params[:amount],
            pick: params[:pick],
            game_id: params[:game_id],
            status: 0
        )

        render json: wager, include: [:taker, :maker, :winner, :loser, :game]
    end

    def settle_wager
        byebug
        wager = Wager.find(params[:id])
        
        if wager.game.away_score > wager.game.home_score
            winning_team = wager.game.away_team
            losing_team = wager.game.home_team
        else
            winning_team = wager.game.home_team
            losing_team = wager.game.away_team
        end

        if wager.pick == winning_team
            puts "Maker won"
            wager.update(status: 4, winner: wager.maker.id, loser: wager.taker.id)
            wager.maker.update(wins: wager.maker.wins + 1)
            puts "Maker wins: #{wager.maker.wins}"
        else
            puts "Taker won"
            wager.update(status: 4, winner: wager.taker.id, loser: wager.maker.id)
            wager.taker.update(wins: wager.taker.wins + 1)
            puts "Taker wins: #{wager.taker.wins}"
        end
    end

    def destroy
        wager = Wager.find(params[:id])
        wager.destroy
        head :no_content
    end

    private

    def wager_params
        params.permit(:taker_id, :status, :maker_id, :amount, :pick, :game_id, :winner)
    end
end
