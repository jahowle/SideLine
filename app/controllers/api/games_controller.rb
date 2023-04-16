class Api::GamesController < ApplicationController

    skip_before_action :authorize, only: [:index]

    def index
        games = Game.all
        render json: games, include: [:plays]
    end

end