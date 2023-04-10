class Api::WagersController < ApplicationController

    skip_before_action :authorize, only: [:index]

    def index
        wagers = Wager.all 
        render json: wagers, include: [:taker, :maker, :winner, :loser, :game]
    end

    def update
        wager = Wager.find(params[:id])
        wager.update(wager_params)
        render json: wager, include: [:taker, :maker, :winner, :loser, :game]
    end

    private

    def wager_params
        params.permit(:taker_id, :status, :maker_id, :amount)
    end
end
