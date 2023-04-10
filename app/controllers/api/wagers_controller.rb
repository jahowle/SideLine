class Api::WagersController < ApplicationController

    skip_before_action :authorize, only: [:index]

    def index
        wagers = Wager.all 
        render json: wagers, include: [:taker, :maker, :winner, :loser, :game]
    end
end
