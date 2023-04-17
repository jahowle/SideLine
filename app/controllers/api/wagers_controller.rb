class Api::WagersController < ApplicationController

    skip_before_action :authorize, only: [:index, :create]

    def index
        wagers = Wager.all 
        render json: wagers, include: [:taker, :maker, :winner, :loser, :game]
    end

    def update
        wager = Wager.find(params[:id])
        wager.assign_attributes(wager_params)
        if wager.amount > current_user.balance
            render json: { errors: ["You don't have enough money to take this wager"] }, status: :unprocessable_entity
        else
            wager.save!
            current_user.update(balance: current_user.balance - wager.amount)
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
        wager = Wager.create!(
            maker_id: params[:maker_id],
            amount: params[:amount],
            pick: params[:pick],
            game_id: params[:game_id],
            status: 0
        )
        wager.maker.update(balance: wager.maker.balance - wager.amount)
        render json: wager, include: [:taker, :maker, :winner, :loser, :game]
    end

    def destroy
        wager = Wager.find(params[:id])
        wager.destroy
        head :no_content
    end

    def settle_wager
        wager = Wager.find(params[:id])
        wager.update!(
            status: 4,
            winner: params[:winner]
            )
        if wager.winner == wager.maker
            wager.maker.update(balance: wager.maker.balance + wager.amount * 2)
        elsif wager.winner == wager.taker
            wager.taker.update(balance: wager.taker.balance + wager.amount * 2)
        end
        render json: wager, include: [:taker, :maker, :winner, :loser, :game]
    end


    private

    def wager_params
        params.permit(:taker_id, :status, :maker_id, :amount, :pick, :game_id, :winner)
    end
end
