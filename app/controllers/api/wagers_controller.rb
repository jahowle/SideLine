class Api::WagersController < ApplicationController

    skip_before_action :authorize, only: [:index]

    def index
        wagers = Wager.all 
        render json: wagers, include: [:taker, :maker, :winner, :loser, :game]
    end

    def update
        wager = Wager.find(params[:id])
        wager.update!(wager_params)
        wager.taker.update(balance: wager.taker.balance - wager.amount)
        render json: wager, include: [:taker, :maker, :winner, :loser, :game]
    end

    def cancel_take_wager
        wager = Wager.find(params[:id])
        wager.skip_check_taker_balance
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
        render json: wager, include: [:taker, :maker, :winner, :loser, :game]
    end


    private

    def wager_params
        params.permit(:taker_id, :status, :maker_id, :amount, :pick, :game_id)
    end
end
