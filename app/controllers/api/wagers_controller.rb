class Api::WagersController < ApplicationController

    skip_before_action :authorize, only: [:index]

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


    private

    def wager_params
        params.permit(:taker_id, :status, :maker_id, :amount, :pick, :game_id)
    end
end
